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


  return (
    <ResponsiveContainer
      width="100%"
      height={200}
      className={props.className}
    >
      <LineChart
        // data={props.data}
        data={props.data}
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