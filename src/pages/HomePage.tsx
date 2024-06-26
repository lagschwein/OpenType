import { useStore } from "../stores/store";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const { typingStore } = useStore()
  const navigate = useNavigate()

  const handleKeyDown = (e: any) => {
    if(e.key === "Enter") {
      typingStore.setUserPrompt(e.target.value)
      navigate("/test")
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <input type="text" className="input input-bordered w-1/2" placeholder="What would you like to type..." onKeyDown={handleKeyDown} />
      </div>
    </>
  )
}