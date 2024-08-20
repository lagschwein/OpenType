import { makeAutoObservable } from "mobx";
import StopWatch from "../util/Timer";
import {
  ChatCompletionMessageParam,
  CreateWebWorkerMLCEngine,
  WebWorkerMLCEngine,
} from "@mlc-ai/web-llm";
import { router } from "../router/Routes";
import paragraphGen from "../util/paragraphGen";
import { systemPrompt } from "../util/systemPrompt";

export default class TypingStore {
  typedText: string = "";
  paragraph: string = "This is a typing test.";
  currentWordIndex: number = 0;
  currentLetterIndex: number = 0;
  startTest: boolean = false;
  timer: StopWatch = new StopWatch();
  loadingPrompt: boolean = false;
  caretX: number = 0
  caretY: number = 0

  constructor() {
    makeAutoObservable(this);
  }

  // Stats
  errors: number = 0;
  incorrectChars: number[] = [];
  wpms: number[] = [];
  wpmCorrected: number[] = [];
  correctChars: number = 0;
  extraChars: number = 0;
  wrongChars: number = 0;
  missingChars: number = 0;

  setExtraChars = (i: number) => {
    this.extraChars = i;
  }

  setCorrectChars = (i: number) => {
    this.correctChars = i;
  }

  setWrongChars = (i: number) => {
    this.wrongChars = i;
  }

  setMissingChars = (i: number) => {
    this.missingChars = i;
  }

  calculateErrors = () => {
    // Iterate through each word of the typed text and compare it to the paragraph
    const typedWords = this.typedText.trim().split(" ");
    const correctWords = this.paragraph.split(" ");
    console.log(typedWords)
    console.log(correctWords)
    let errors = 0;

    for (let i = 0; i < typedWords.length; i++) {
      const typedWord = typedWords[i];
      const correctWord = correctWords[i];
      // Loop through each letter of the word and compare it to the correct word 
      for (let j = 0; j < typedWord.length; j++) {
        if (j > correctWord.length) {
          this.extraChars++; 
        }
        else{
          if (typedWord[j] !== correctWord[j]) {
            this.wrongChars++;
          }
          else{
            this.correctChars++;
          }
        }
      }

      this.missingChars += Math.max(0, correctWord.length - typedWord.length)
    }

    return errors;
  }

  get accuracy(): number {
    return Math.round((this.correctChars /(this.correctChars + this.errors)) * 100);
  }

  get currentWpm() {
    const totalChars = this.typedText.replace(/\s/g, "").length;
    const totalWords = totalChars / 5;
    return Math.round(totalWords / ((this.ElapsedTime() / 1000) / 60));
  }

  get currentWpmCorrected() {
    return this.currentWpm * (this.accuracy / 100);
  }

  reset = () => {
    this.updateTypedText("");
    this.updateCurrentLetterIndex(0);
    this.updateCurrentWordIndex(0);
    this.setError(0);
    this.resetWpms();
    this.resetWpmCorrected();
    // Reset errors
    this.setExtraChars(0);
    this.setCorrectChars(0);
    this.setWrongChars(0);
    this.setMissingChars(0);
  };

  setError = (i: number) => {
    this.errors = i;
  };

  updateWpms = (index: number) => {
    this.wpms[index] = this.currentWpm;
  };

  resetWpms = () => {
    this.wpms = [];
  };

  updateWpmCorrected = (index: number) => {
    this.wpmCorrected[index] = this.currentWpmCorrected;
  };

  resetWpmCorrected = () => {
    this.wpmCorrected = [];
  };




  // Caret

  // caret flashing animation
  flashing: boolean = true;

  setCaretX = (x: number) => {
    this.caretX = x;
  }

  setCaretY = (y: number) => {
    console.log("Setting Y: ", y)
    this.caretY = y;
  }


  // AI
  ai: boolean = false;
  loadingEngine: boolean = false;
  engine: WebWorkerMLCEngine | null = null;
  selectedModel: string = "Qwen2-0.5B-Instruct-q0f16-MLC";
  // selectedModel: string = "Llama-3-8B-Instruct-q4f32_1-MLC"
  userPrompt: string = ""

  loadEngine = async (
    selectedModel: string = this.selectedModel,
    initProgressCallback: any | null = (initProgress: any) => console.log(initProgress)
  ) => {
    // this.setLoadingEngine(true);
    try {
      const loadedEngine = await CreateWebWorkerMLCEngine(
        new Worker(
          new URL("../util/worker.ts", import.meta.url),
          {type: "module"}
        ),
        selectedModel, {
        initProgressCallback: initProgressCallback,
      });
      this.setEngine(loadedEngine);
      this.setLoadingEngine(false);
    } catch (error) {
      console.error("Couldn't load engine", error)
      this.setLoadingEngine(false);
      router.navigate("/not-supported");
    }
  };


  setAI = (ai: boolean) => {
    this.ai = ai;
  }

  setFlashing = (flashing: boolean) => {
    this.flashing = flashing;
  }

  generateParagraph = async () => {
    let paragraph = "";
    if(this.ai) {
      try {
        if(this.engine)
        {
          const messages: ChatCompletionMessageParam[] = [
            { role: "system", content: systemPrompt },
            { role: "user", content: this.userPrompt },
          ];
          paragraph = await this.generateParagraphFromPrompt(messages) 
        }
        else
        {
          await this.loadEngine()
          this.generateParagraph()
        }
      } catch (e) {
        console.log(e);
        await this.loadEngine()
        this.generateParagraph()
        return
      }
    }
    else{
        paragraph = this.generateRandomParagraph()
    }
    this.setParagraph(paragraph);
  };

  private generateRandomParagraph = () => {
    return paragraphGen();
  }

  private generateParagraphFromPrompt = async (prompt: ChatCompletionMessageParam[]) => {
    this.loadingPrompt = true;
    try {
      const reply = await this.engine?.chat.completions.create({
        messages: prompt,
      });
      console.log(reply?.choices[0].message.content);
      this.loadingPrompt = false;
      return reply?.choices[0].message.content ?? this.generateRandomParagraph();
    } catch (error) {
      this.loadingPrompt = false;
      console.error(error);
      return this.generateRandomParagraph();
    }
  }

  setLoadingEngine = (loading: boolean) => {
    this.loadingEngine = loading;
  };

  setUserPrompt = (prompt: string) => {
    this.userPrompt = this.userPrompt + prompt;
  };

  setEngine = (engine: WebWorkerMLCEngine) => {
    this.engine = engine;
  };
  updateTypedText = (text: string) => {
    this.typedText = text;
  };

  updateCurrentWordIndex = (i: number) => {
    this.currentWordIndex = i;
  };

  updateCurrentLetterIndex = (i: number) => {
    this.currentLetterIndex = i;
  };

  setParagraph = (text: string) => {
    this.paragraph = text;
  };

  StartTest = () => {
    this.timer.start();
    this.startTest = true;
  };

  StopTest = () => {
    this.timer.stop();
    this.calculateErrors();
    this.startTest = false;
  };


  public ElapsedTime = () => {
    return this.timer.getElapsedTime();
  };
}
