import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { set } from "mobx";


export default observer(function Stats() {

  const { typingStore } = useStore();
  const { ElapsedTime, paragraph, accuracy, errors, wpms, wpmCorrected} = typingStore;
  const [strokeColor, setStrokeColor] = useState('#000')
  const [strokeColorRaw, setStrokeColorRaw] = useState('#000')
  const [inlineAccuracy, setInlineAccuracy] = useState(100)

  useEffect(() => {
    console.log("is this running")
    setInlineAccuracy(accuracy) 
    const color = getComputedStyle(document.documentElement).getPropertyValue('--nextui-secondary-500') 
    const hsl: string[] = color.split(" ")
    const hslNum: number[] = hsl.map((val) => parseInt(val))
    setStrokeColor(HSLToHex({h: hslNum[0], s: hslNum[1], l: hslNum[2]}))

    const colorRaw = getComputedStyle(document.documentElement).getPropertyValue('--nextui-primary-300')
    const hslRaw: string[] = colorRaw.split(" ")
    const hslNumRaw: number[] = hslRaw.map((val) => parseInt(val))
    setStrokeColorRaw(HSLToHex({h: hslNumRaw[0], s: hslNumRaw[1], l: hslNumRaw[2]}))
  })

  const calculateWPM = () => {
    const totalChars = paragraph.replace(/\s/g, "").length;
    const totalWords = totalChars / 5;
    return Math.round(totalWords / ((ElapsedTime() / 1000)/60))
  }

  const getGraphData = () => {
    let data = []
    for (let i = 0; i < wpms.length; i++) {
      data.push({wpm: wpms[i], raw: wpmCorrected[i]})
    }
    return data
  }
  
  /* Repurposed from https://www.jameslmilner.com/posts/converting-rgb-hex-hsl-colors/*/ 
  function HSLToHex(hsl: { h: number; s: number; l: number }): string {
    const { h, s, l } = hsl;
  
    const hDecimal = l / 100;
    const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  
      // Convert to Hex and prefix with "0" if required
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  return (
    <>
      <div className="stats flex relative items-center justify-center w-5/6 h-5/6 m-10">
        <div className="max-w-[300px]">
          <div>
            <div className=" text-primary-300">
              WPM
            </div>
            <div className="text-6xl text-secondary-500">
              {calculateWPM()}
            </div>
            <div className="text-primary-300">
              Accuracy
            </div>
            <div className="text-6xl text-secondary-500">
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