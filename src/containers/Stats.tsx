import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import StatsGraph from "../components/StatsGraph";


export default observer(function Stats() {

  const { typingStore } = useStore();
  const { ElapsedTime, paragraph, accuracy, errors, wpms, wpmCorrected } = typingStore;


  const calculateWPM = () => {
    const totalChars = paragraph.replace(/\s/g, "").length;
    const totalWords = totalChars / 5;
    return Math.round(totalWords / ((ElapsedTime() / 1000) / 60))
  }
  
  const getGraphData = () => {
    let data = []
    for (let i = 1; i < wpms.length; i++) {
      data.push({ wpm: wpms[i], raw: wpmCorrected[i] })
    }
    return data
  }

  interface MainStatsProps {
    className?: string
  }

  function MainStats(props: MainStatsProps) {
    return (
      <div className={"flex md:flex-col mr-10 "+ props.className}>
        <div className="sm:m-5">
          <div className="font-semibold">
            WPM
          </div>
          <div className="text-4xl text-primary">
            {Math.floor(typingStore.currentWpmCorrected)}
          </div>
        </div>
        <div className="sm:m-5">
          <div className="font-semibold">
            Accuracy
          </div>
          <div className="text-4xl text-primary">
            {accuracy}%
          </div>
        </div>
      </div>
    )
  }

  interface MoreStatsProps {
    className?: string
  }

  function MoreStats(props: MoreStatsProps) {
    return (
      <>
      <div className={"grid grid-cols-2 grid-flow-row items-center" + props.className}>
          <div className="text-2xl col-span-2 m-5">
            {Math.floor(ElapsedTime()/1000/60).toString().padStart(2, '0')}:{Math.floor(ElapsedTime()/1000%60).toString().padStart(2, '0')}
          </div>
          <div className="text-3xl m-5">
            <p className="font-semibold text-sm text-neutral">Raw</p>
            {typingStore.currentWpm}
          </div>
          <div className="text-2xl m-5">
            <p className="font-semibold text-sm text-neutral">c/w/e/m</p>
            {typingStore.correctChars}/{typingStore.wrongChars}/{typingStore.extraChars}/{typingStore.missingChars}
          </div>
      </div>
      </>
    )
  }

  return (
    <div className="grid grid-cols-5 min-h-[418px]">
      <MainStats className="col-span-1"/>
      <StatsGraph className="col-span-4" data={getGraphData()} />
      <MoreStats className="col-span-5"/>
    </div>
  )
})