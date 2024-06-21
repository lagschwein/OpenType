import { makeAutoObservable, runInAction } from "mobx";
import StopWatch from "../util/Timer";

export default class TypingStore {
  typedText: string = "";
  paragraph: string = "GitHub Copilot, an AI programming assistant, helps developers by providing suggestions for code completion, generating unit tests, proposing fixes for code issues, explaining how selected code works, creating new Jupyter Notebooks, finding relevant code, and answering general programming questions, thereby enhancing productivity and code quality.";
  key: string = "";
  currentWordIndex: number = 0;
  currentLetterIndex: number = 0;
  startTest: boolean = false;
  timer: StopWatch = new StopWatch();

  constructor() {
    makeAutoObservable(this);
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