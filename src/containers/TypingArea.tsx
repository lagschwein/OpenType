import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import Word from "../components/Word";
import Stats from "./Stats";
import standardKeys from "../util/keys";
import Caret from "../components/Caret";
import LoadingComponent from "../components/LoadingComponent";

interface TypingAreaProps {
  className?: string;
}

export default observer(function TypingArea(props: TypingAreaProps) {
  const { typingStore } = useStore();
  var { typedText, updateTypedText, paragraph, currentLetterIndex, updateCurrentLetterIndex, currentWordIndex, updateCurrentWordIndex, StartTest, StopTest, startTest, setFlashing } = typingStore;
  const inputRef = useRef<HTMLInputElement>(null);
  const [showStats, setShowStats] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [ctrlPress, setCtrlPress] = useState(false)

  useEffect(() => {
    inputRef.current?.focus()

    //Check if we are at the end of the paragraph
    if (currentWordIndex > (paragraph.split(" ").length - 1)) {
      finishTest();
    }
  }, [typedText, paragraph])

  useEffect(() => {
    if (startTest) {
      setFlashing(false)
    }
    else {
      setFlashing(true);
    }

  }, [startTest])
  
  useEffect(() => {
    if (typingStore.caretY > -2) {
      const element = document.getElementById(`${currentWordIndex-1}`)?? document.getElementById(`${currentWordIndex}`)
      if(!element) return
      element.scrollIntoView() 
      // scrollRef.current?.scrollBy({top: element.offsetHeight+8})
    }
  }, [typingStore.caretY])

  const finishTest = () => {
    StopTest()
    setShowStats(true)
  }

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Control")
    {
      setCtrlPress(false)
    }
  }

  // Main Keyboard event handling
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (currentLetterIndex > 0) {
        if(ctrlPress)
        {
          updateCurrentLetterIndex(0)
          updateTypedText(typedText.slice(0, -currentLetterIndex))
        }
        else
        {
          updateCurrentLetterIndex(currentLetterIndex - 1)
          updateTypedText(typedText.slice(0, -1))
        }
      }
      else if(currentWordIndex > 0) {
        if(ctrlPress)
        {
          // Check if the previous word has an error
          if (!document.getElementById(`${currentWordIndex - 1}`)?.classList.contains("error")) return;
          updateCurrentWordIndex(currentWordIndex - 1)
          let previousWord = typedText.split(" ")[currentWordIndex-1]
          updateCurrentLetterIndex(0)
          updateTypedText(typedText.slice(0, -previousWord.length-1))
        }
        else
        {
          // Check if the previous word has an error
          if (!document.getElementById(`${currentWordIndex - 1}`)?.classList.contains("error")) return;
          updateCurrentWordIndex(currentWordIndex - 1)
          updateCurrentLetterIndex(typedText.split(" ")[currentWordIndex - 1].length)
          updateTypedText(typedText.slice(0, -1))
        }
      }
    }
    else if (e.key === " ") {
      if (currentLetterIndex === 0) return;
      updateCurrentWordIndex(currentWordIndex + 1)
      updateCurrentLetterIndex(0)
      updateTypedText(typedText + " ")
    }
    else if (e.key === "Enter") {
      // reset()
    }
    else if (e.key === "Shift") {
    }
    else if (e.key === "Control") {
      setCtrlPress(true)
    }
    else if (standardKeys.includes(e.key)) {
      if (!startTest) {
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
    if (typingStore.loadingPrompt) 
      return <></> 
    return paragraph.split(" ").map((word, index) => {
      const typedWord = typedText.split(" ")[index] ?? ""
      return <Word key={`${index}`} id={`${index}`} letters={word} typedWord={typedWord} active={currentWordIndex === index} />
    }
    )
  }


  return (
    <div id="InputWrapper" className={props.className + " flex flex-col items-center justify-center h-full p-6"}>
      {showStats ?
        <Stats /> :
        <div onClick={() => { inputRef.current?.focus(); }} className="flex items-center justify-center h-1/2">
          <input ref={inputRef} className="input absolute opacity-0" type="text" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}/>
          <div ref={scrollRef} className="flex flex-wrap max-h-[100px]  w-full text-2xl overflow-scroll no-scrollbar">
          {!typingStore.loadingPrompt && <Caret/>}
            { !typingStore.loadingPrompt ? RenderParagraph() : <LoadingComponent/>}
          </div>
        </div>
      }
      <button onClick={handleNewTest} className="btn btn-ghost btn-circle btn-xs sm:btn-sm md:btn-md lg:btn-lg bottom-32 mt-4">
        <svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />  <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" /></svg>
      </button>
    </div>
  )
})