import { useStore } from "../stores/store";

export default function NavBar() {
  const { typingStore } = useStore();

  return (
    
    <div className="navbar absolute bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">OpenType</a>
      </div>

      <div className="form-control">
        <label className="label cursor-pointer space-x-2">
          <span className="label-text">AI</span>
          <input type="checkbox" className="toggle" defaultChecked={typingStore.ai} onChange={() => {typingStore.setAI(!typingStore.ai)}}/>
        </label>
      </div>

      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}