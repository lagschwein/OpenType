import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { animate, motion, useAnimate } from "framer-motion";
import { Input, Textarea } from "@nextui-org/react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { set } from "mobx";
import Word from "../components/Word";

export default observer(function TypingArea() {
  const { typingStore } = useStore();
  var { typedText, updateTypedText, paragraph } = typingStore;
  const inputRef = useRef<HTMLInputElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);
  const [errorCount, setErrorCount] = useState(0)
  const [wrongLetters, setWrongLetters] = useState(0)
  const [activeWord, setActiveWord] = useState<Element | null>(null)
  const [shiftPressed, setShiftPressed] = useState(false)
  const [ctrlPressed, setCtrlPressed] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(0)
  var keyPressed: string | null = null

  // Caret animation
  const [caretX, setCaretX] = useState(0)
  const [caretY, setCaretY] = useState(0)

  useEffect(() => {
    if (activeWord) {
      if(activeWord.classList.contains("word"))
      {
        setActiveWord(activeWord.firstElementChild instanceof HTMLSpanElement ? activeWord.firstElementChild : null)
      }
      activeWord.classList.remove("correct", "incorrect") 
      updateCaretPosition(activeWord.getBoundingClientRect().left-2)
    }
    else {
      setActiveWord(document.getElementById("0"))
    }
  })

  const updateCaretPosition = (offset: number) => {
    var caretElement: HTMLDivElement | null = caretRef.current
    if(caretElement)
    {
      setCaretX(offset - caretElement.offsetLeft)
    }
  }

  const nextLetter = () => {
    if (activeWord?.classList.contains("word"))
    {
      var newElement = document.createElement("span")
      newElement.innerHTML = keyPressed || "" 
      newElement.classList.add("letter", "incorrect")
      activeWord?.lastChild?.appendChild(newElement)
    }
    else
    {
      var element = activeWord?.nextElementSibling 
      if(element === null) element = activeWord?.parentElement
      if(element === undefined) return
      setActiveWord(element)
    }
  }

  const nextWord = () => {
    // check active letter is the last letter of the word
    if (activeWord?.nextElementSibling === null) {
      var element = activeWord?.parentElement?.nextElementSibling?.firstElementChild
      if(element instanceof HTMLSpanElement)
      {
        setActiveWord(element)
      }
    }
  }

  const prevLetter = () => {
    var element = activeWord?.previousElementSibling
    if(element)
    {
      setActiveWord(element instanceof HTMLSpanElement ? element : null)
    }
  }

  const prevWord = () => {
    // check active letter is the first letter of the word
    if (activeWord?.id.split("-")[1] === "0") {
      var element = activeWord?.parentElement?.previousElementSibling?.firstElementChild
      if(element instanceof HTMLSpanElement)
      {
        setActiveWord(element)
      }
    }
  }
  
  const reset = () => {
    var element = document.getElementById("0")
    if(element instanceof HTMLSpanElement)
    {
      setActiveWord(element)
      setErrorCount(0)
      setWrongLetters(0)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    keyPressed = e.key
    // Check for ctrl or shift keys
    if (CheckFunctionKeys(e.key))
      return 

    updateTypedText(typedText + e.key)
    evaluateText(e.key)
    console.log(`typedText: ${typedText}, currentChar: ${e.key}, activeLetter: ${activeWord}, wrongLetters: ${wrongLetters}, errorCount: ${errorCount}`)
  }

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {

  }
  const CheckFunctionKeys = (key: string) => {
    if (key === "Backspace") {
      prevLetter();
      return true;
    }
    if (key === " ") {
      nextWord();
      return true;
    }
    if (key === "Enter") {
      return true;
    }
    if (key === "Shift") {
      setShiftPressed(shiftPressed ? false : true)
      return true;
    }
    if (key === "Control") {
      setCtrlPressed(ctrlPressed ? false : true)
      return true;
    }
    return false;
  }

  const evaluateText = (letter: string) => {
    // Evaluate the input letter with the currently active letter
    // If the letters match, set the add correct to the className and move to the next letter
    // If the letters do not match, set the add wrong to the className and increase the wrong letter count
    // If the letter is a space, do not evaluate

    if (letter === activeWord?.innerText) {
      // letters match
      activeWord.classList.add("correct");
      nextLetter();
    } else {
      // letters do not match
      activeWord?.classList.add("incorrect");
      setErrorCount(errorCount + 1);
      setWrongLetters(wrongLetters + 1);
      nextLetter();
    }
    console.log(activeWord?.offsetLeft)
  }

  const RenderParagrph = () => {
    return paragraph.split(" ").map((word) => <Word letters={word.split("")}/>)
  }


  return (
    <>
      <div id="InputWrapper" className="flex items-center justify-center h-dvh">
        <div onClick={() => { inputRef.current?.focus();  }} className="flex items-center justify-center w-1/2 h-1/2">
          <input ref={inputRef} className="input absolute opacity-0" type="text" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}/>
          <motion.div ref={caretRef} initial={{opacity: 1}} animate={{ opacity: [0, 1, 0], x: caretX, y: caretY, transition: {duration: 1, opacity: {repeat: Infinity}, repeatDelay: 0.1, x: {duration: 0.1}}}} className="caret" />
          <div className="flex">
            {
              RenderParagrph() 
            }
          </div>
        </div>
      </div>
    </>
  )
})