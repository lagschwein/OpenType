import { makeAutoObservable } from "mobx";

export default class TypingStore {
  private _typedText: string = "";
  private _paragraph: string = "This is a paragraph.";

  constructor() {
    makeAutoObservable(this);
  }

  public get typedText(): string {
    return this._typedText;
  }
  public set typedText(value: string) {
    this._typedText = value;
  }
  public get paragraph(): string {
    return this._paragraph;
  }
  public set paragraph(value: string) {
    this._paragraph = value;
  }
}