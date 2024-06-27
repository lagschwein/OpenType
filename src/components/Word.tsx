import { observer } from "mobx-react-lite"
import { memo, useEffect , useState } from "react"
import { useStore } from "../stores/store"

interface LetterProps {
  l: string
  id: string 
  correct: string 
}

const Letter = memo(observer(({l, id, correct}: LetterProps)  => {
  const [style, setStyle] = useState("")

  useEffect(() => {
    setStyle(correct)
  }, [correct])

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

  useEffect(() => {
    if(!props.typedWord && props.typedWord === ""){
      setError(false)
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
      setError(true)
    }
    else
    {
      setError(false)
    }
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