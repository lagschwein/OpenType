import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { animate, motion, useAnimate } from "framer-motion";
import { Input, Textarea } from "@nextui-org/react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import Word from "../components/Word";
import Stats from "./Stats";

export default observer(function TypingArea() {
  const { typingStore } = useStore();
  var { typedText, updateTypedText, paragraph, currentLetterIndex, updateCurrentLetterIndex, currentWordIndex, updateCurrentWordIndex, setKey, StartTest, StopTest, startTest} = typingStore;
  const inputRef = useRef<HTMLInputElement>(null);
  const [showStats, setShowStats] = useState(false)

  // Caret animation
  const [caretX, setCaretX] = useState(0)
  const [caretY, setCaretY] = useState(0)
  const [caretRef, animate] = useAnimate();
  const [flashing, setFlashing] = useState(true)

  useEffect(() => {
    console.log("next letter")
    inputRef.current?.focus()

    flashing ? animate(caretRef.current,  {opacity: [0, 1, 0]}, {duration: 1, repeat: Infinity}) : animate(caretRef.current, {opacity: 1})

    //Check if we are at the end of the paragraph
    if(currentWordIndex > (paragraph.split(" ").length - 1)) 
    {
      reset();
    }

    var element = document.getElementById(`${currentWordIndex}-${currentLetterIndex}`)
    if(element == null)
    {
      // Next word
      console.log("Next word")
      element = document.getElementById(`${currentWordIndex}`)
      element ? updateCaretPosition(element.offsetLeft+element.offsetWidth, element.offsetTop-2) : element
    } 
    else
    {
      // Next letter
      element ? updateCaretPosition(element.offsetLeft, element.offsetTop-2) : element
    }
  }, [typedText, startTest])

  const updateCaretPosition = (offsetX: number, offsetY: number) => {
    var caretElement: HTMLDivElement | null = caretRef.current
    if(caretElement)
    {
      setCaretX(offsetX - caretElement.offsetLeft)
      setCaretY(offsetY - caretElement.offsetTop)
    }
  }

  const reset = () => {
    updateCurrentLetterIndex(0)
    updateCurrentWordIndex(0)
    StopTest()
    setShowStats(true)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {

    setKey(e.key)
    if(e.key === "Backspace")
    {
      if(currentLetterIndex > 0)
      {
        updateCurrentLetterIndex(currentLetterIndex - 1)
        updateTypedText(typedText.slice(0, -1))
      }
      else
      {
        if(currentWordIndex > 0)
        {
          // Check if the previous word has an error
          if(!document.getElementById(`${currentWordIndex - 1}`)?.classList.contains("error")) return;
          updateCurrentWordIndex(currentWordIndex - 1)
          updateCurrentLetterIndex(typedText.split(" ")[currentWordIndex - 1].length)
          updateTypedText(typedText.slice(0, -1))
        }
      }
    }
    else if(e.key === " ")
    {
      if(currentLetterIndex === 0) return;
      updateCurrentWordIndex(currentWordIndex + 1)
      updateCurrentLetterIndex(0)
      updateTypedText(typedText + " ")
    }
    else if(e.key === "Enter")
    {
      // reset()
    }
    else if(e.key === "Shift")
    {
    }
    else if(e.key === "Control")
    { 
    }
    else
    {
      if(!startTest)
      {
        setFlashing(false)
        StartTest()
      }
      updateTypedText(typedText + e.key)
      updateCurrentLetterIndex(currentLetterIndex + 1)
    }
  }

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {

  }

  const RenderParagraph = () => {
    return paragraph.split(" ").map((word, index) => <Word key={`${index}`} id={`${index}`} letters={word.split("")}/>)
  }

  return (
    <>
      <div id="InputWrapper" className="flex flex-col items-center justify-center h-full">
        { showStats ?
        <Stats/> : 
        <div onClick={() => { inputRef.current?.focus();  }} className="flex relative items-center justify-center w-1/2 h-1/2">
          <input ref={inputRef} className="input absolute opacity-0" type="text" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}/>
          <motion.div className="caret absolute z-40" ref={caretRef} animate={{ x: caretX, y: caretY, transition: {x: {duration: 0.15}, y: {duration: 0.1}}}}  />
          <div className="flex flex-wrap items-center w-full">
            {
              RenderParagraph() 
            }
          </div>
        </div>
        }
      </div>
    </>
  )
})