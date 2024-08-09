import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { CartesianGrid, Label, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
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
          <div className="">
            WPM
          </div>
          <div className="text-4xl text-primary">
            {/* {typingStore.currentWpmCorrected} */}
            70
          </div>
        </div>
        <div className="sm:m-5">
          <div className="">
            Accuracy
          </div>
          <div className="text-4xl text-primary">
            {/* {inlineAccuracy}% */}
            100%
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
      <div className={"flex flex-row items-center " + props.className}>
        <div className="text-primary text-3xl m-5">
          {/* {typingStore.currentWpm} */}
          70
        </div>
        <div className="text-2xl m-5">
          {typingStore.typedText.length}/{typingStore.paragraph.length}/{typingStore.errors}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-5">
      <MainStats className="col-span-1"/>
      <StatsGraph className="col-span-4" /*data={getGraphData()}*/ />
      <MoreStats className="col-span-5"/>
    </div>
  )
})