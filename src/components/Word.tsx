import { observer } from "mobx-react-lite"
import { memo, useCallback, useEffect , useState } from "react"
import { useStore } from "../stores/store"

interface LetterProps {
  l: string
  id: string 
  correct: string 
}

const Letter = memo(observer(({l, id, correct}: LetterProps)  => {
  const [style, setStyle] = useState("")
  // const { typingStore } = useStore()
  // const { typedText, currentLetterIndex, currentWordIndex} = typingStore

  useEffect(() => {setStyle(correct)}, [correct])
  // useEffect(() => {
  //   const [wordIndex, letterIndex] = id.split("-").map((i) => parseInt(i))
  //   console.log(`I am letter ${letterIndex} in word ${wordIndex}`)
  //   var actualWord = typingStore.paragraph.split(" ")[wordIndex]
  //   var typedWord = typedText.split(" ")[wordIndex]
  //   var currentLetter = currentLetterIndex -1
    

  //   if(!typedWord || typedWord === "") 
  //   {
  //     setCorrect("")
  //     return
  //   }

  //   if(currentLetter < 0) currentLetter = 0 
  //   if(wordIndex === currentWordIndex) {
  //     if(letterIndex > currentLetter)
  //     {
  //       setCorrect("")
  //     }
  //     else
  //     {
  //       if(actualWord[letterIndex] === typedWord[letterIndex]) {
  //         setCorrect("text-primary")
  //       } else {
  //         setCorrect("text-error")
  //       }
  //     }
  //   }
  //   else if (wordIndex > currentWordIndex)
  //   {
  //     setCorrect("")
  //   }
  // }, [typedText])

  return (
    <div id={id} className={"bg-transparent letter " + style}>{l}</div>
  )
}))

interface WordProps {
  letters: string
  id: string | undefined
  typedWord: string | null
  active: boolean
}

export default memo(observer(function Word(props: WordProps) 
{
  const [error, setError] = useState(false)
  const { typingStore } = useStore()
  const {updateWpmCorrected, updateWpms } = typingStore

  // useEffect(() => {
    
  //   if (props.id === undefined) return
  //   if(props.id === `${currentWordIndex}`) {
  //     setActive(true)
  //     setError(false)
  //   } else {
  //     if(active)
  //     {
  //       checkErrors()
  //     }
  //     setActive(false)
  //   }

  //   if(props.id > `${currentWordIndex}`) {
  //     setActive(false)
  //     setError(false)
  //   }


  // }, [currentWordIndex])
  useEffect(() => {
    if(!props.typedWord && props.typedWord === ""){
      setErrorCallback(false)
      return
    }
    checkErrors()
  },[props.active])

  const checkErrors = () => {
    // check typed word against paragraph
    updateWpms(typingStore.currentWordIndex)
    updateWpmCorrected(typingStore.currentWordIndex)
    if (props.typedWord !== props.letters){
      // updateErrors()
      setErrorCallback(true)
    }
    else
    {
      setErrorCallback(false)
    }
  }

  const setErrorCallback = (b: boolean) => {
    setError(b)
  }

  const getClassName = () => {
    var classname = "word border-b-2 border-transparent"
    if(props.active) {classname += " active"}
    if(error) {classname += " !border-red-500 error"}

    return classname
  }

  const isLetterCorrect = (letter: string, typedLetter: string) => {
    if(!typedLetter) return ""
    if(letter === typedLetter) {
      return "text-primary"
    } else {
      return "text-error"
    }
  }

    
  return (
    <div id={props.id} className={getClassName()}>
      {props.letters.split("").map((l, index) => {
        const correct = props.typedWord ? isLetterCorrect(l, props.typedWord[index]) : ""
        return <Letter key={`${props.id}-${index}`} id={`${props.id}-${index}`} l={l} correct={correct}/>
      })}
    </div>
  )
}))