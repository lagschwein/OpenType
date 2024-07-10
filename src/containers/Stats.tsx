import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import daisyuiColors from 'daisyui/src/theming/themes';


export default observer(function Stats() {

  const { typingStore } = useStore();
  const { ElapsedTime, paragraph, accuracy, errors, wpms, wpmCorrected} = typingStore;
  const [strokeColor, setStrokeColor] = useState(`hsl(${getComputedStyle(document.documentElement).getPropertyValue('--secondary')})`)
  const [strokeColorRaw, setStrokeColorRaw] = useState(`hsl(${getComputedStyle(document.documentElement).getPropertyValue('--secondary/200')})`)
  const [inlineAccuracy, setInlineAccuracy] = useState(100)

  useEffect(() => {
    setInlineAccuracy(accuracy) 
    setStrokeColor(daisyuiColors['dark'].secondary)
    setStrokeColorRaw(daisyuiColors['dark'].primary)
  }, [])

  const calculateWPM = () => {
    const totalChars = paragraph.replace(/\s/g, "").length;
    const totalWords = totalChars / 5;
    return Math.round(totalWords / ((ElapsedTime() / 1000)/60))
  }

  const getGraphData = () => {
    let data = []
    for (let i = 1; i < wpms.length; i++) {
      data.push({wpm: wpms[i], raw: wpmCorrected[i]})
    }
    return data
  }
  
  return (
    <>
    <div className="flex flex-col">
      <div className="stats flex relative items-center justify-center w-5/6 h-5/6 m-10">
        <div className="max-w-[300px] mr-5">
          <div>
            <div className="text-secondary">
              WPM
            </div>
            <div className="text-6xl text-primary">
              {calculateWPM()}
            </div>
            <div className="text-secondary">
              Accuracy
            </div>
            <div className="text-6xl text-primary">
              {inlineAccuracy}%
            </div>
          </div>
        </div>
        <LineChart
          width={800}
          height={250}
          data={getGraphData()}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis tickLine={false}/>
          <YAxis tickLine={false}/>
          <Line type="monotone" dataKey="wpm" stroke={strokeColor}/>
          <Line type="monotone" dataKey="raw" stroke={strokeColorRaw}/>
        </LineChart>
      </div>
      <div className="flex flex-row items-center justify-center">
        <div className="text-primary text-3xl">
        </div>
        <div className="text-secondary mr-10">
          Raw 
        </div> 
        <div>
          correctChars/IncorrectChars/Errors
        </div>
      </div>
    </div>
    </>
  )
})