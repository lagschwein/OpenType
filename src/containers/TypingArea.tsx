import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { animate, motion, useAnimate } from "framer-motion";
import { Input, Textarea } from "@nextui-org/react";
import { ChangeEvent, useRef, useState } from "react";

export default observer(function TypingArea() {
  const { typingStore } = useStore();
  var { typedText, updateTypedText, paragraph } = typingStore;
  const inputRef = useRef<HTMLInputElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);
  const [errorCount, setErrorCount] = useState(0)
  const [wrongLetters, setWrongLetters] = useState(0)
  const [activeLetter, setActiveLetter] = useState('0-0')

  // Caret animation
  const [caretX, setCaretX] = useState(0)
  const [caretY, setCaretY] = useState(0)

  const updateCaretPosition = (offset: number) => {
    var caretElement: HTMLDivElement | null = caretRef.current
    if(caretElement)
    {
      setCaretX(offset - caretElement.offsetLeft)
    }
  }

  const nextLetter = () => {
    setActiveLetter(`${activeLetter.split("-")[0]}-${parseInt(activeLetter.split("-")[1])+1}`)
  }

  const nextWord = () => {
    setActiveLetter(`${parseInt(activeLetter.split("-")[0])+1}-0`)
  }

  const prevLetter = () => {
    setActiveLetter(`${activeLetter.split("-")[0]}-${parseInt(activeLetter.split("-")[1])-1}`)
  }

  const prevWord = () => {
    setActiveLetter(`${parseInt(activeLetter.split("-")[0])-1}-0`)
  }
  
  const reset = () => {
    setActiveLetter('0-0')
    setErrorCount(0)
    setWrongLetters(0)
  }

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateTypedText(e.target.value)
    evaluateText(e.target.value.charAt(e.target.value.length - 1))
    console.log(`typedValue: ${e.target.value}, currentChar: ${e.target.value.charAt(e.target.value.length - 1)}, activeLetter: ${activeLetter}, wrongLetters: ${wrongLetters}, errorCount: ${errorCount}`)
  }

  const evaluateText = (letter: string) => {
    // Evaluate the input letter with the currently active letter
    // If the letters match, set the add correct to the className and move to the next letter
    // If the letters do not match, set the add wrong to the className and increase the wrong letter count
    // If the letter is a space, do not evaluate
    var element: HTMLSpanElement | null = document.getElementById(activeLetter)
    if (letter === " ") {
      nextWord();
      return;
    }

    if (letter === element?.innerText) {
      // letters match
      element.classList.add("correct");
      nextLetter();
    } else {
      // letters do not match
      element?.classList.add("incorrect");
      setErrorCount(errorCount + 1);
      setWrongLetters(wrongLetters + 1);
      nextLetter();
    }
    console.log(element?.offsetLeft)
    updateCaretPosition(element?.getBoundingClientRect().right || 0)

  }


  return (
    <>
      <div id="InputWrapper" className="flex items-center justify-center h-dvh">
        <div onClick={() => { inputRef.current?.focus();  }} className="flex items-center justify-center w-1/2 h-1/2">
          <input ref={inputRef} className="input absolute opacity-0" type="text" onChange={handleValueChange} />
          <motion.div ref={caretRef} initial={{opacity: 1}} animate={{ opacity: [0, 1, 0], x: caretX, y: caretY, transition: {duration: 1, opacity: {repeat: Infinity}, repeatDelay: 0.1, x: {duration: 0.1}}}} className="caret" />
          <div className="flex">
            {
              paragraph.split(" ").map((word, index) => {
                return (
                  <div key={index} id={`${index}`} className="word m-0.5">
                    {word.split("").map((letter, letterIndex) => {
                      const id = `${index}-${letterIndex}`;
                      return (
                        <span key={id} id={id} className="letter">
                          {letter}
                        </span>
                      );
                    })}
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </>
  )
})