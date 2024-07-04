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
    // typingStore.loadEngine()
  }, [])

  if (typingStore.loadingEngine) { return <div className="flex items-center justify-center h-screen"><LoadingComponent /></div> }

  return (
    <div className="grid grid-row-3 h-screen justify-items-center">
      {typingStore.startTest ? <></> :
        <>
          <NavBar />
        </>
      }
      <TypingArea />
      {typingStore.startTest ? <></> :
      <Footer />
      }
    </div>
  )
})