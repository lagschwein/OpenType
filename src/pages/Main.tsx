import "./Main.css"
import TypingArea from '../containers/TypingArea'
import Footer from "../containers/Footer"

export default function Main() {

  return (
    <>
      <div className="flex flex-col h-screen">
        <TypingArea />
        <Footer />
      </div>
    </>
  )
}