import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import daisyuiColors from 'daisyui/src/theming/themes';

interface StatsGraphProps {
  className?: string,
  data?: any
}

export default observer(function StatsGraph(props: StatsGraphProps) {
  const [strokeColor, setStrokeColor] = useState(`hsl(${getComputedStyle(document.documentElement).getPropertyValue('--secondary')})`)
  const [strokeColorRaw, setStrokeColorRaw] = useState(`hsl(${getComputedStyle(document.documentElement).getPropertyValue('--secondary/200')})`)

  useEffect(() => {
    setStrokeColor(daisyuiColors['dark'].secondary)
    setStrokeColorRaw(daisyuiColors['dark'].primary)
  }, [])

  const dummyData = [{ wpm: 0, raw: 0 }, { wpm: 10, raw: 10 }, { wpm: 20, raw: 20 }, { wpm: 30, raw: 30 }, { wpm: 40, raw: 40 }, { wpm: 50, raw: 50 }, { wpm: 60, raw: 60 }, { wpm: 70, raw: 70 }, { wpm: 80, raw: 80 }, { wpm: 90, raw: 90 }, { wpm: 100, raw: 100 }]

  return (
    <ResponsiveContainer
      width="100%"
      height={200}
      className={props.className}
    >
      <LineChart
        // data={props.data}
        data={dummyData}
      >
        <CartesianGrid  />
        <XAxis tickLine={true} />
        <YAxis tickLine={true} label={{ value: "Wpm", angle: -90, position: 'insideLeft' }} />
        <Line type="monotone" dataKey="wpm" stroke={strokeColor} />
        <Line type="monotone" dataKey="raw" stroke={strokeColorRaw} />
      </LineChart>
    </ResponsiveContainer>
  )
})