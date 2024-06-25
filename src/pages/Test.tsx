import "./Test.css"
import TypingArea from '../containers/TypingArea'
import Footer from "../containers/Footer"
import { Spinner } from "@nextui-org/react"
import { CreateMLCEngine, InitProgressReport } from "@mlc-ai/web-llm"
import { useEffect, useState } from "react"
import { useStore } from "../stores/store"
import { router } from "../router/Routes"

export default function Test() {
  const {typingStore} = useStore()
  const {setEngine, engine} = typingStore
  const [loading, setLoading] = useState(true)

  const selectedModel = "Qwen2-1.5B-Instruct-q4f16_1-MLC"

  const initProgressCallback = (initProgress: InitProgressReport) => {
    console.log(initProgress)
  }

  const loadEngine = async () => {
    try {
      setLoading(true)
      if(engine) {
        setLoading(false)
        return
      }
      const loadedEngine = await CreateMLCEngine(
        selectedModel,
        { initProgressCallback: initProgressCallback },
      )
      setEngine(loadedEngine)
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setLoading(false)
        router.navigate("not-supported")
      }
    }
  }

  useEffect(() => {

    loadEngine()
  })

  return (
    <>
    {loading ? 
      <div className="flex item-center justify-center h-screen">
        <Spinner></Spinner>
      </div> : 
      <div className="flex flex-col h-screen">
        <TypingArea />
        <Footer />
      </div>
    }
    </>
  )
}