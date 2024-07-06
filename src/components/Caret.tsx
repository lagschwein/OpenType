import { motion, useAnimate } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../stores/store";

export default observer(function Caret() {
  const typingStore = useStore().typingStore
  const { currentWordIndex, currentLetterIndex, flashing, caretX, caretY, setCaretY, setCaretX } = typingStore

  const [caretRef, animate] = useAnimate()

  useEffect(() => {
    flashing ? animate(caretRef.current, { opacity: [0, 1, 0] }, { duration: 1, repeat: Infinity }) : animate(caretRef.current, { opacity: 1 })
    var element = document.getElementById(`${currentWordIndex}-${currentLetterIndex}`)
    if (!element) element = document.getElementById(`${currentWordIndex}`)
    if(!element) return 
    // let elementY = element.getBoundingClientRect().top
    // let elementX = element.getBoundingClientRect().left
    let {left, top} = getOffset(element)
    updateCaretPosition(left, top)

  }, [typingStore.typedText, typingStore.paragraph])

  const updateCaretPosition = (offsetX: number, offsetY: number) => {
    var caretElement: HTMLDivElement | null = caretRef.current
    if (caretElement) {
      setCaretX(offsetX)
      setCaretY(offsetY)
    }
  }

  const getOffset = (element: HTMLElement) => {
    const rect = element;
    const scrollElement = document.getElementById(`${currentWordIndex}`)?.parentElement  
    if(!scrollElement) return 
    console.log("Scroll Element: ", scrollElement.scrollTop)
    let carretOffset: HTMLDivElement = caretRef.current;
    return {
      left: rect.classList.contains("word") ? rect.offsetLeft + rect.offsetWidth - carretOffset.offsetLeft : rect.offsetLeft - carretOffset.offsetLeft,
      top: rect.offsetTop - scrollElement.scrollTop - carretOffset.offsetTop+2,
    }
  }

  return (
    <motion.div className="caret bg-black absolute z-40" ref={caretRef} animate={{ x: caretX, y: caretY, transition: { x: { duration: 0.15 }, y: { duration: 0.1 } } }} />
  )
})