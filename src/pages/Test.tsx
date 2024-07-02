import "./Test.css"
import TypingArea from '../containers/TypingArea'
import Footer from "../containers/Footer"
import { useEffect } from "react"
import { useStore } from "../stores/store"
import LoadingComponent from "../components/LoadingComponent"
import { observer } from "mobx-react-lite"
import NavBar from "../components/NavBar"

export default observer(function Test() {
  const { typingStore } = useStore()

  useEffect(() => {
    typingStore.generateParagraph()
  }, [])

  if (typingStore.loadingEngine) { return <div className="flex items-center justify-center h-screen"><LoadingComponent /></div> }

  return (
    <div className="flex flex-col h-screen">
      {typingStore.startTest ? <></> :
        <>
          <NavBar />
          <Footer />
        </>
      }
      <TypingArea />
    </div>
  )
})