import "./Test.css"
import TypingArea from '../containers/TypingArea'
import Footer from "../containers/Footer"
import { InitProgressReport } from "@mlc-ai/web-llm"
import { useEffect } from "react"
import { useStore } from "../stores/store"
import LoadingComponent from "../components/LoadingComponent"
import { observer } from "mobx-react-lite"
import NavBar from "../components/NavBar"

export default observer(function Test() {
  const {typingStore} = useStore()
  const {loadEngine, selectedModel, engine} = typingStore


  const initProgressCallback = (initProgress: InitProgressReport) => {
    console.log(initProgress)
  }

  useEffect(() => {
    if(!typingStore.ai) return
    console.log("Test.tsx: useEffect")
    if(!engine) loadEngine(selectedModel, initProgressCallback)
    typingStore.generateParagraph() 
  }, [engine])

  if(typingStore.loadingEngine) { return <LoadingComponent />}

  return (
    <div className="flex flex-col h-screen">
      {typingStore.startTest ? <></>:
      <>
        <NavBar />
        <Footer />
      </>
      }
      <TypingArea />
    </div>
  )
})