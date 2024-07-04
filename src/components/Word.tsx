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
  const [wordError, setWordError] = useState(false)
  const { typingStore } = useStore()
  const {updateWpmCorrected, updateWpms, setError} = typingStore

  useEffect(() => {
    if(!props.typedWord && props.typedWord === ""){
      setWordError(false)
      return
    }
    checkErrors()
  },[props.active])

  useEffect(() => {
    props.letters.split("").map((l, index) => {
      if(!props.typedWord) return
      const typedLetter = props.typedWord[index]
      if (typedLetter && !isLetterCorrect(l, typedLetter)) setError(typingStore.errors + 1)   
    })
  }, [props.typedWord])

  const checkErrors = () => {
    // check typed word against paragraph
    updateWpms(typingStore.currentWordIndex)
    updateWpmCorrected(typingStore.currentWordIndex)
    if (props.typedWord !== props.letters){
      setError(typingStore.errors + 1)
      setWordError(true)
    }
    else
    {
      setWordError(false)
    }
  }

  const getClassName = () => {
    var classname = "word border-b-2 border-transparent"
    if(props.active) {classname += " active"}
    if(wordError) {classname += " !border-red-500 error"}

    return classname
  }

  const isLetterCorrect = (letter: string, typedLetter: string) => {
    if(letter === typedLetter) {
      return true 
    } else {
      return false 
    }
  }

  return (
    <div id={props.id} className={getClassName()}>
      {props.letters.split("").map((l, index) => {
        let correct = ""
        if(props.typedWord && props.typedWord[index] && props.typedWord[index] !== "") 
          correct = isLetterCorrect(l, props.typedWord[index]) ? "text-primary": "text-error"
        return <Letter key={`${props.id}-${index}`} id={`${props.id}-${index}`} l={l} correct={correct}/>
      })}
    </div>
  )
}))