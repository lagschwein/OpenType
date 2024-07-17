import { AnimatePresence, motion } from "framer-motion"
import { useStore } from "../stores/store"
import { observer } from "mobx-react-lite"

export default observer(function Footer() {
  const { typingStore } = useStore()

  return (
    <>
      <footer className="footer footer-center bottom-0 text-base-content p-4">
        <AnimatePresence>
        {!typingStore.startTest &&
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
        >
          <aside>
            <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
          </aside>
        </motion.div>
        }
        </AnimatePresence>
      </footer>

    </>
  )
})