import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { AnimatePresence, motion } from "framer-motion";

interface NavBarProps {
  className?: string;
}

export default observer(function NavBar(props: NavBarProps) {
  const { typingStore } = useStore();

  return (
    <div className={props.className + " flex justify-between items-start p-6"}>
      <div>
        <a className="btn btn-ghost text-xl ">OpenType</a>
      </div>

      <AnimatePresence>
      {!typingStore.startTest &&
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex bg-base-100 ">
          <div className="">
            <label className="label cursor-pointer space-x-2">
              <span className="label-text">AI</span>
              <input type="checkbox" className="toggle" defaultChecked={typingStore.ai} onChange={() => { typingStore.setAI(!typingStore.ai) }} />
            </label>
          </div>

          <div className="">
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
      </motion.div>}

      </AnimatePresence>

    </div>


  )
})