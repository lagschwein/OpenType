import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import daisyuiColors from 'daisyui/src/theming/themes';


export default observer(function Stats() {

  const { typingStore } = useStore();
  const { ElapsedTime, paragraph, accuracy, errors, wpms, wpmCorrected} = typingStore;
  const [strokeColor, setStrokeColor] = useState(`hsl(${getComputedStyle(document.documentElement).getPropertyValue('--s')})`)
  const [strokeColorRaw, setStrokeColorRaw] = useState(`hsl(${getComputedStyle(document.documentElement).getPropertyValue('--s')})`)
  const [inlineAccuracy, setInlineAccuracy] = useState(100)

  useEffect(() => {
    setInlineAccuracy(accuracy) 
    setStrokeColor(daisyuiColors['dark'].secondary)
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
      <div className="stats flex relative items-center justify-center w-5/6 h-5/6 m-10">
        <div className="max-w-[300px]">
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
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis tickLine={false}/>
          <YAxis tickLine={false}/>
          <Line type="monotone" dataKey="wpm" stroke={strokeColor}/>
          <Line type="monotone" dataKey="raw" stroke={strokeColor}/>
        </LineChart>
      </div>
    </>
  )
})