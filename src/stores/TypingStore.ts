import { makeAutoObservable, runInAction } from "mobx";

export default class TypingStore {
  typedText: string = "";
  paragraph: string = "This is a paragraph.";

  constructor() {
    makeAutoObservable(this);
  }

  public updateTypedText = (text: string) => {
    runInAction(() => {
      this.typedText = text;
    })
  }
}