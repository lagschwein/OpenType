import './App.css'
import { RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar';
import { router } from './router/Routes';
import { CreateMLCEngine, InitProgressReport } from '@mlc-ai/web-llm';
import { useEffect, useState } from 'react';
import { useStore } from './stores/store';

function App() {

  const {typingStore} = useStore()
  const {setEngine, engine} = typingStore
  const [loading, setLoading] = useState(true)

  const selectedModel = "Qwen2-1.5B-Instruct-q4f16_1-MLC"

  const initProgressCallback = (initProgress: InitProgressReport) => {
    console.log(initProgress)
  }

  const loadEngine = async () => {
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
  }

  useEffect(() => {

    loadEngine()
  })

  return (
    <>
    {loading ? 
      <div className="flex item-center justify-center h-screen">Loading...</div> : 
      <>
        <NavBar />
        <RouterProvider router={router} />
      </>
    }
    </>
  )
}

export default App
