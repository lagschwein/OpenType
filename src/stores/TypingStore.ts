import { makeAutoObservable, runInAction } from "mobx";
import StopWatch from "../util/Timer";
import { CreateMLCEngine, MLCEngine } from "@mlc-ai/web-llm";
import { router } from "../router/Routes";

export default class TypingStore {
  typedText: string = "";
  // paragraph: string = "GitHub Copilot, an AI programming assistant, helps developers by providing suggestions for code completion, generating unit tests, proposing fixes for code issues, explaining how selected code works, creating new Jupyter Notebooks, finding relevant code, and answering general programming questions, thereby enhancing productivity and code quality.";
  paragraph: string = "This is a typing test.";
  key: string = "";
  currentWordIndex: number = 0;
  currentLetterIndex: number = 0;
  startTest: boolean = false;
  timer: StopWatch = new StopWatch();
  errors: number = 0;
  wpms: number[] = [];
  wpmCorrected: number[] = [];
  loadingEngine: boolean = false;
  engine: MLCEngine | null = null;
  selectedModel: string = "Qwen2-1.5B-Instruct-q4f16_1-MLC";
  userPrompt: string = "Generate a 5 word sentence. Do not preface your answer with anything the only text returned should be the generated sentence. The sentence should be coherent and make sense. Use the following text as context to generate the sentence: " 

  constructor() {
    makeAutoObservable(this);
  }

  get accuracy (): number {
    const totalChars = this.typedText.split(" ").length;
    let numErrors = this.errors;
    const correctChars = totalChars - numErrors;
    console.log("Correct Chars: ", correctChars, "Total Chars: ", totalChars)
    return Math.round((correctChars / totalChars) * 100);
  }

  loadEngine = async (selectedModel: string = this.selectedModel, initProgressCallback: any | null = null) => {
    this.setLoadingEngine(true)
    try {
      const loadedEngine = await CreateMLCEngine(
        selectedModel,
        { initProgressCallback: initProgressCallback },
      )
      this.setEngine(loadedEngine)
      this.setLoadingEngine(false)
    } catch (error) {
      this.setLoadingEngine(false)
      router.navigate("/not-supported")
    }
  }
  
  setLoadingEngine = (loading: boolean) => {
    this.loadingEngine = loading;
  }

  setUserPrompt = (prompt: string) => {
      this.userPrompt = this.userPrompt + prompt; 
  }

  public setEngine = (engine: MLCEngine) => {
    runInAction(() => {
      this.engine = engine;
    })
  }

  public updateErrors = () => {
    runInAction(() => {
      this.errors = this.errors +1
    })
  }
  
  public setError = (i: number) => {
    runInAction(() => {
      this.errors = i;
    })
  }

  public updateWpms = (i: number, index: number) => {
    runInAction(() => {
      this.wpms[index] = i;
    })
  }

  public resetWpms = () => {
    runInAction(() => {
      this.wpms = [];
    })
  }

  public updateWpmCorrected = (i: number, index: number) => {
    runInAction(() => {
      this.wpmCorrected[index] = i;
    })
  }

  public resetWpmCorrected = () => {
    runInAction(() => {
      this.wpmCorrected = [];
    })
  }

  public updateTypedText = (text: string) => {
    runInAction(() => {
      this.typedText = text;
    })
  }

  public updateCurrentWordIndex = (i: number) => {
    runInAction(() => {
      this.currentWordIndex = i;
    })
  }

  public updateCurrentLetterIndex = (i: number) => {
    runInAction(() => {
      this.currentLetterIndex = i;
    })
  }

  public setKey = (key: string) => {
    runInAction(() => {
      this.key = key;
    })
  }

  public setParagraph = (text: string) => {
    runInAction(() => {
      this.paragraph = text;
    })
  }
  
  public StartTest = () => {
    runInAction(() => {
      this.timer.start();
      this.startTest = true;
    })
  }

  public StopTest = () => {
    runInAction(() => {
      this.timer.stop();
      this.startTest = false;
    })
  }

  public ElapsedTime = () => {
    return this.timer.getElapsedTime();
  }
}