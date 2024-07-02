import { motion, useAnimate } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../stores/store";

export default observer(function Caret() {
  const typingStore = useStore().typingStore
  const { currentWordIndex, currentLetterIndex, flashing } = typingStore

  const [caretX, setCaretX] = useState(0)
  const [caretY, setCaretY] = useState(0)
  const [caretRef, animate] = useAnimate()

  useEffect(() => {
    flashing ? animate(caretRef.current, { opacity: [0, 1, 0] }, { duration: 1, repeat: Infinity }) : animate(caretRef.current, { opacity: 1 })
    var element = document.getElementById(`${currentWordIndex}-${currentLetterIndex}`)
    if (element == null) {
      // Next word
      element = document.getElementById(`${currentWordIndex}`)
      element ? updateCaretPosition(element.offsetLeft + element.offsetWidth, element.offsetTop - 2) : element
    }
    else {
      // Next letter
      element ? updateCaretPosition(element.offsetLeft, element.offsetTop - 2) : element
    }

  }, [typingStore.typedText, typingStore.paragraph])

  const updateCaretPosition = (offsetX: number, offsetY: number) => {
    var caretElement: HTMLDivElement | null = caretRef.current
    if (caretElement) {
      setCaretX(offsetX - caretElement.offsetLeft)
      setCaretY(offsetY - caretElement.offsetTop)
    }
  }

  return (
    <motion.div className="caret bg-white absolute z-40" ref={caretRef} animate={{ x: caretX, y: caretY, transition: { x: { duration: 0.15 }, y: { duration: 0.1 } } }} />
  )
})