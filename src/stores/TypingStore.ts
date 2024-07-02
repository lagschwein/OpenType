import { makeAutoObservable } from "mobx";
import StopWatch from "../util/Timer";
import {
  ChatCompletionMessageParam,
  CreateMLCEngine,
  MLCEngine,
} from "@mlc-ai/web-llm";
import { router } from "../router/Routes";
import paragraphGen from "../util/paragraphGen";

export default class TypingStore {
  typedText: string = "";
  paragraph: string = "This is a typing test.";
  currentWordIndex: number = 0;
  currentLetterIndex: number = 0;
  startTest: boolean = false;
  timer: StopWatch = new StopWatch();
  errors: number = 0;
  wpms: number[] = [];
  wpmCorrected: number[] = [];
  loadingEngine: boolean = false;
  loadingPrompt: boolean = false;
  ai: boolean = false;
  engine: MLCEngine | null = null;
  selectedModel: string = "Qwen2-0.5B-Instruct-q0f16-MLC";
  userPrompt: string =
    "A 20-50 word sentence that is in the form of a famous quote";
  systemPrompt: string =
    "You are a generative ai thats role is to generate text for a typing test. Do not preface your answer with anything. The only output returned should be the generated sentence for the typing test. The sentence should be coherent and make sense. If asked for a quote do not surround the quote with quotation marks only give the text of the quote itself.";

  // caret flashing animation
  flashing: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  get accuracy(): number {
    const totalChars = this.typedText.split(" ").length;
    let numErrors = this.errors;
    const correctChars = totalChars - numErrors;
    console.log("Correct Chars: ", correctChars, "Total Chars: ", totalChars);
    return Math.round((correctChars / totalChars) * 100);
  }

  loadEngine = async (
    selectedModel: string = this.selectedModel,
    initProgressCallback: any | null = (initProgress: any) => console.log(initProgress)
  ) => {
    this.setLoadingEngine(true);
    try {
      const loadedEngine = await CreateMLCEngine(selectedModel, {
        initProgressCallback: initProgressCallback,
      });
      this.setEngine(loadedEngine);
      this.setLoadingEngine(false);
    } catch (error) {
      console.error(error)
      this.setLoadingEngine(false);
      router.navigate("/not-supported");
    }
  };

  reset = () => {
    this.updateTypedText("");
    this.updateCurrentLetterIndex(0);
    this.updateCurrentWordIndex(0);
    this.setError(0);
    this.resetWpms();
    this.resetWpmCorrected();
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
            { role: "system", content: this.systemPrompt },
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

  get currentWpm() {
    const totalChars = this.typedText.replace(/\s/g, "").length;
    const totalWords = totalChars / 5;
    return Math.round(totalWords / ((this.ElapsedTime() / 1000) / 60));
  }

  get currentWpmCorrected() {
    return this.currentWpm * (this.accuracy / 100);
  }

  setLoadingEngine = (loading: boolean) => {
    this.loadingEngine = loading;
  };

  setUserPrompt = (prompt: string) => {
    this.userPrompt = this.userPrompt + prompt;
  };

  setEngine = (engine: MLCEngine) => {
    this.engine = engine;
  };

  updateErrors = () => {
    this.errors = this.errors + 1;
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
    this.startTest = false;
  };

  public ElapsedTime = () => {
    return this.timer.getElapsedTime();
  };
}
