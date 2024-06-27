import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { motion, useAnimate } from "framer-motion";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import Word from "../components/Word";
import Stats from "./Stats";
import standardKeys from "../util/keys";
import paragraphGen from "../util/paragraphGen";

export default observer(function TypingArea() {
  const { typingStore } = useStore();
  var { typedText, updateTypedText, paragraph, currentLetterIndex, updateCurrentLetterIndex, currentWordIndex, updateCurrentWordIndex, StartTest, StopTest, startTest  } = typingStore;
  const inputRef = useRef<HTMLInputElement>(null);
  const [showStats, setShowStats] = useState(false)

  // Caret animation
  const [caretX, setCaretX] = useState(0)
  const [caretY, setCaretY] = useState(0)
  const [caretRef, animate] = useAnimate();
  const [flashing, setFlashing] = useState(true)

  useEffect(() => {
    inputRef.current?.focus()

    flashing ? animate(caretRef.current,  {opacity: [0, 1, 0]}, {duration: 1, repeat: Infinity}) : animate(caretRef.current, {opacity: 1})

    //Check if we are at the end of the paragraph
    if(currentWordIndex > (paragraph.split(" ").length - 1)) 
    {
      finishTest();
    }

    var element = document.getElementById(`${currentWordIndex}-${currentLetterIndex}`)
    if(element == null)
    {
      // Next word
      element = document.getElementById(`${currentWordIndex}`)
      element ? updateCaretPosition(element.offsetLeft+element.offsetWidth, element.offsetTop-2) : element
    } 
    else
    {
      // Next letter
      element ? updateCaretPosition(element.offsetLeft, element.offsetTop-2) : element
    }
  }, [typedText, paragraph])

  useEffect(() => {
    if(startTest)
    {
      setFlashing(false)
    }
    else{
      setFlashing(true);
    }

  }, [startTest])

  const updateCaretPosition = (offsetX: number, offsetY: number) => {
    var caretElement: HTMLDivElement | null = caretRef.current
    if(caretElement)
    {
      setCaretX(offsetX - caretElement.offsetLeft)
      setCaretY(offsetY - caretElement.offsetTop)
    }
  }

  
  const finishTest = () => {
    StopTest()
    setShowStats(true)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {

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
    else if(standardKeys.includes(e.key))
    {
      if(!startTest)
      {
        StartTest()
      }
      updateTypedText(typedText + e.key)
      updateCurrentLetterIndex(currentLetterIndex + 1)
    }
  }

  const handleNewTest = () => {
    StopTest()
    typingStore.generateParagraph()
    setShowStats(false)
    typingStore.reset()
  }

  const RenderParagraph = () => {
    return paragraph.split(" ").map((word, index) => {
      const typedWord = typedText.split(" ")[index] ?? ""
      return <Word key={`${index}`} id={`${index}`} letters={word} typedWord={typedWord} active={currentWordIndex === index}/>
    }
    )
  }


  return (
    <>
      <div id="InputWrapper" className="flex flex-col items-center justify-center h-full">
        { showStats ?
        <Stats/> : 
        <>
          <div onClick={() => { inputRef.current?.focus();  }} className="flex relative items-center justify-center w-1/2 h-1/2">
            <input ref={inputRef} className="input absolute opacity-0" type="text" onKeyDown={handleKeyDown} />
            <motion.div className="caret bg-white absolute z-40" ref={caretRef} animate={{ x: caretX, y: caretY, transition: {x: {duration: 0.15}, y: {duration: 0.1}}}}  />
            <div className="flex flex-wrap items-center w-full">
              {
                RenderParagraph() 
              }
            </div>
          </div>
        </>
        }
        <button onClick={handleNewTest} className="btn btn-ghost btn-circle btn-xs sm:btn-sm md:btn-md lg:btn-lg bottom-32 mt-4">
          <svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />  <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" /></svg>
        </button>
      </div>
    </>
  )
})