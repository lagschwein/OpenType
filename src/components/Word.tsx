import { useState } from "react"

interface LetterProps {
  l: string
}

const Letter = ({l}: LetterProps)  => {
  const [correct, setCorrect] = useState("")

  return (
    <div className={"letter " + correct}>{l}</div>
  )
}

interface WordProps {
  letters: string[]
}

export default function Word({letters}: WordProps) 
{
  const [active, setActive] = useState(false)
  const [error, setError] = useState(false)

  const getClassName = () => {
    var classname = "word"
    if(active) {classname += " active"}
    if(error) {classname += " border-red-500 border-b-2"}

    return classname
  }

  return (
    <div className={getClassName()}>
   {letters.map((l) => <Letter l={l}/>)}
    </div>
  )
}