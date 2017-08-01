import React from 'react';
import {withParentSize} from '@vx/responsive'
import {scaleTime, scaleLinear} from '@vx/scale'
import {LinePath, AreaClosed, Bar, Line} from '@vx/shape'
import {AxisBottom} from '@vx/axis'
import {withTooltip, Tooltip} from "@vx/tooltip"
import {LinearGradient} from '@vx/gradient'
import {localPoint} from '@vx/event'
import {bisector} from 'd3-array'

import MaxPrice from './maxprice';
import MinPrice from './minprice';
import formaPrice from "../utils/formaPrice";
import formatDate from "../utils/formatDate";

class Chart extends React.Component {
  render() {
    const {
      data,
      parentWidth,
      parentHeight,
      tooltipLeft,
      tooltipTop,
      tooltipData,
      showTooltip,
      hideTooltip
    } = this.props;

    const margin = {
      top: 15,
      bottom: 40,
      left: 0,
      right: 0
    };
    const width = parentWidth - margin.left - margin.right;
    const height = parentHeight - margin.top - margin.bottom;

    const x = d => new Date(d.time);
    const y = d => d.price;

    const bisectDate = bisector(d => x(d)).left;

    const firstPoint = data[0];
    const currentPoint = data[data.length - 1];
    const minPrice = Math.min(...data.map(y));
    const maxPrice = Math.max(...data.map(y));
    const maxPriceData = [{time: x(firstPoint), price: maxPrice}, {time: x(currentPoint), price: maxPrice}];
    const minPriceData = [{time: x(firstPoint), price: minPrice}, {time: x(currentPoint), price: minPrice}];

    const xScale = scaleTime({
      range: [0, width],
      domain: [Math.min(...data.map(x)), Math.max(...data.map(x))]
    });
    const yScale = scaleLinear({
      range: [height, 0],
      domain: [minPrice, maxPrice]
    });
    return (
      <div>
        <svg ref={s => (this.svg = s)} height={parentHeight} width={width}>
          <AxisBottom
            top={yScale(minPrice)}
            data={data}
            scale={xScale}
            x={x}
            hideAxisLine
            hideTicks
            numTicks={3}
            tickLabelComponent={<text fill="#ffffff" fontSize={11}/>}
          />
          <LinearGradient
            id="area-fill"
            from="#4682b4"
            to="#4682b4"
            fromOpacity={.31}
            toOpacity={0}/>
          <MaxPrice
            data={maxPriceData}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={y}
            label={formaPrice(maxPrice)}
            yText={yScale(maxPrice)}
          />
          <MinPrice
            data={minPriceData}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={y}
            label={formaPrice(minPrice)}
            yText={yScale(minPrice)}
          />
          <AreaClosed
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={y}
            fill="url(#area-fill)"
            stroke="transparent"/>
          <LinePath data={data} xScale={xScale} yScale={yScale} x={x} y={y}/>
          <Bar
            data={data}
            height={height}
            width={width} fill="transparent"
            onMouseMove={data => event => {
              const {x: xPoint} = localPoint(this.svg, event);
              const x0 = xScale.invert(xPoint);
              const index = bisectDate(data, x0, 1);
              const d0 = data[index -1];
              const d1 = data[index];
              const d = x0 - xScale(x(d0)) > xScale(x(d1)) - x0 ? d1 : d0;
              showTooltip({
                tooltipData: d,
                tooltipLeft: xScale(x(d)),
                tooltipTop: yScale(y(d)),
              })
            }}
            onMouseLeave={data => event => hideTooltip()}
          />
          {tooltipData && <g>
            <Line
              from={{ x: tooltipLeft, y: yScale(y(maxPriceData[0])) }}
              to={{ x: tooltipLeft, y: yScale(y(minPriceData[0])) }}
              strokeDasharray="2,2"
              stroke="#ffffff"
            />
            <circle r="8" cx={tooltipLeft} cy={tooltipTop} fill="#00f1a1" fillOpacity={0.4} style={{pointerEvents: 'none'}}/>
            <circle r="4" cx={tooltipLeft} cy={tooltipTop} fill="#00f1a1" style={{pointerEvents: 'none'}}/>
          </g>}
        </svg>
        {tooltipData &&
        <div>
          <Tooltip
            top={tooltipTop - 12}
            left={tooltipLeft + 12}
            style={{
              backgroundColor: '#6086d6',
              color: '#ffffff'
            }}>
            {formaPrice(y(tooltipData))}
          </Tooltip>
          <Tooltip left={tooltipLeft}
                   top={yScale(minPrice)}
                   style={{ transform: 'translateX(-50%)' }}>
            {formatDate(x(tooltipData))}
          </Tooltip>
        </div>
        }
      </div>
    )
  }
}

export default withParentSize(withTooltip(Chart));