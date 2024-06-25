import "./Test.css"
import TypingArea from '../containers/TypingArea'
import Footer from "../containers/Footer"
import { InitProgressReport } from "@mlc-ai/web-llm"
import { useEffect, useState } from "react"
import { useStore } from "../stores/store"
import LoadingComponent from "../components/LoadingComponent"
import { observer } from "mobx-react-lite"

export default observer(function Test() {
  const {typingStore} = useStore()
  const {loadEngine, selectedModel, engine} = typingStore


  const initProgressCallback = (initProgress: InitProgressReport) => {
    console.log(initProgress)
  }

  useEffect(() => {
    if(!engine) loadEngine(selectedModel, initProgressCallback)
  }, [engine, loadEngine])

  if(typingStore.loadingEngine) { return <LoadingComponent />}

  return (
    <div className="flex flex-col h-screen">
      <TypingArea />
      <Footer />
    </div>
  )
})