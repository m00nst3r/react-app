import React from 'react'
import {LinePath} from '@vx/shape'

export default ({data, label, yText, yScale, xScale, x, y}) => {
  return (
    <g>
      <LinePath data={data} xScale={xScale} yScale={yScale} x={x} y={y} strokeDasharray="4,4" strokeOpacity="0.4"/>
      <text fill="#6086d6" dy="-.5em" dx="1em" y={yText} fontSize="12">
        {label}
      </text>
    </g>
  )
}