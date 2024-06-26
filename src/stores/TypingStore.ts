import { makeAutoObservable } from "mobx";
import StopWatch from "../util/Timer";
import {
  ChatCompletionMessageParam,
  CreateMLCEngine,
  MLCEngine,
} from "@mlc-ai/web-llm";
import { router } from "../router/Routes";

export default class TypingStore {
  typedText: string = "";
  // paragraph: string = "GitHub Copilot, an AI programming assistant, helps developers by providing suggestions for code completion, generating unit tests, proposing fixes for code issues, explaining how selected code works, creating new Jupyter Notebooks, finding relevant code, and answering general programming questions, thereby enhancing productivity and code quality.";
  paragraph: string = "This is a typing test.";
  currentWordIndex: number = 0;
  currentLetterIndex: number = 0;
  startTest: boolean = false;
  timer: StopWatch = new StopWatch();
  errors: number = 0;
  wpms: number[] = [];
  wpmCorrected: number[] = [];
  loadingEngine: boolean = false;
  ai: boolean = false;
  engine: MLCEngine | null = null;
  selectedModel: string = "Qwen2-1.5B-Instruct-q4f16_1-MLC";
  userPrompt: string =
    "A 20-50 word sentence that is in the form of a famous quote";
  systemPrompt: string =
    "You are a generative ai thats role is to generate text for a typing test. Do not preface your answer with anything. The only output returned should be the generated sentence for the typing test. The sentence should be coherent and make sense.";

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
    initProgressCallback: any | null = null
  ) => {
    this.setLoadingEngine(true);
    try {
      const loadedEngine = await CreateMLCEngine(selectedModel, {
        initProgressCallback: initProgressCallback,
      });
      this.setEngine(loadedEngine);
      this.setLoadingEngine(false);
    } catch (error) {
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

  generateParagraph = async () => {
    if (this.engine) {
      console.log("Generating paragraph");
      try {
        const messages: ChatCompletionMessageParam[] = [
          { role: "system", content: this.systemPrompt },
          { role: "user", content: this.userPrompt },
        ];
        const reply = await this.engine.chat.completions.create({
          messages,
        });
        this.setParagraph(
          reply.choices[0].message.content
            ? reply.choices[0].message.content
            : "Error"
        );
        console.log(reply.choices[0].message.content);
      } catch (e) {
        console.log(e);
        this.loadEngine();
      }
    }
  };

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

  updateWpms = (i: number, index: number) => {
    this.wpms[index] = i;
  };

  resetWpms = () => {
    this.wpms = [];
  };

  updateWpmCorrected = (i: number, index: number) => {
    this.wpmCorrected[index] = i;
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
