import { createContext, useContext } from "react";
import TypingStore from "./TypingStore";

interface Store {
  typingStore: TypingStore;
}

export const store: Store = {
  typingStore: new TypingStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}