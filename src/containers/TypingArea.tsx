import { Textarea } from "@nextui-org/react";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";

export default observer(function TypingArea()
{
  const {typingStore} = useStore();
  const {typedText, paragraph} = typingStore;

  return(
    <div className="flex inline items-center justify-center h-screen">
      <div className="input"/>
      <motion.div animate={{opacity: [0, 1, 0], x: 0, y: 0}} transition={{duration: 1, repeat: Infinity, repeatDelay: 0.1}} className="carret"/>
      {
        paragraph.split(" ").map((word, index) => {
          return (
            <div key={index} className="word m-0.5">
              {word.split("").map((letter, index) => {
                return (
                  <span key={index} className="letter">
                    {letter}
                  </span>
                )
              })}
              </div>
          )
        })
      }
    </div>
  )
})