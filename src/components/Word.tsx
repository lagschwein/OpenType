import { observer } from "mobx-react-lite"
import { useEffect, useRef, useState } from "react"
import { useStore } from "../stores/store"
import { set } from "mobx"

interface LetterProps {
  l: string
  id: string 
}

const Letter = observer(({l, id, ...props}: LetterProps)  => {
  const [correct, setCorrect] = useState("")
  const { typingStore } = useStore()
  const { typedText, currentLetterIndex, currentWordIndex, key} = typingStore

  useEffect(() => {
    var letterIndex = parseInt(id.split("-")[1])
    var wordIndex = parseInt(id.split("-")[0])
    var typedWord = typedText.split(" ")[wordIndex]
    var currentLetter = currentLetterIndex -1
    if(typedWord === "") 
    {
      setCorrect("")
      return
    }

    if(currentLetter < 0) currentLetter = 0 
    if(wordIndex === currentWordIndex) {
      if(letterIndex > currentLetter)
      {
        setCorrect("")
      }
      else
      {
        if(l === typedWord[letterIndex]) {
          setCorrect("correct")
        } else {
          setCorrect("incorrect")
        }
      }
    }
    else if (wordIndex > currentWordIndex)
    {
      setCorrect("")
    }
  }, [currentLetterIndex, currentWordIndex, key])

  return (
    <div id={id} className={"bg-transparent text-primary-800 letter " + correct}>{l}</div>
  )
})

interface WordProps {
  letters: string[]
  id: string | undefined
}

export default observer(function Word(props: WordProps) 
{
  const [active, setActive] = useState(false)
  const [error, setError] = useState(false)
  const { typingStore } = useStore()
  const { currentWordIndex, typedText, accuracy, paragraph, updateErrors, updateWpmCorrected, updateWpms, ElapsedTime, errors } = typingStore

  useEffect(() => {
    updateWpms(calculateCurrentWpm(), currentWordIndex)
    updateWpmCorrected(calculateCurrentWpm()*(accuracy/100), currentWordIndex)

    if (props.id === undefined) return
    if(props.id === `${currentWordIndex}`) {
      setActive(true)
      setError(false)
    } else {
      if(active)
      {
        checkErrors()
      }
      setActive(false)
    }

    if(props.id > `${currentWordIndex}`) {
      setActive(false)
      setError(false)
    }

  }, [currentWordIndex])

  const checkErrors = () => {
    // check typed word against paragraph
    var word = typedText.split(" ")[currentWordIndex-1]
    var correctWord = paragraph.split(" ")[currentWordIndex-1]
    if (word !== correctWord) {
      updateErrors()
      setErrorCallback(true)
    }
    else
    {
      setErrorCallback(false)
    }
  }

  const calculateCurrentWpm = () => {
    const totalChars = typedText.replace(/\s/g, "").length;
    const totalWords = totalChars / 5;
    return Math.round(totalWords / ((ElapsedTime() / 1000)/60))
  }

  const setErrorCallback = (b: boolean) => {
    setError(b)
  }

  const setActiveCallback = (b: boolean) => {
    setActive(b)
  }

  const getClassName = () => {
    var classname = "word border-b-2 border-transparent"
    if(active) {classname += " active"}
    if(error) {classname += " !border-red-500 error"}

    return classname
  }

  return (
    <div id={props.id} className={getClassName()}>
      {props.letters.map((l, index) => <Letter key={`${props.id}-${index}`} id={`${props.id}-${index}`} l={l}/>)}
    </div>
  )
})