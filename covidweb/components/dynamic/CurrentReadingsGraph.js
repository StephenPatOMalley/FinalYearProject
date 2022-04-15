import React, { Component } from 'react';
import CanvasJSReact from '../../canvas_assets/canvasjs.react';

import classes from './CurrentReadingsGraph.module.css'
import GetTime from '../time/TimeParser'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dps = []
var updateInterval = 1000;

class DynamicLineChart extends Component {
	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);
	}
	componentDidMount() {
		setInterval(this.updateChart, updateInterval);
	}
	updateChart() {
        var results = this.props.data
        console.log(results.TimeStamp )
        if(results.TimeStamp != ""){
            var date = GetTime(results.TimeStamp, "UTC-Date")
            var yVal = results.Temperature
            var xVal = new Date(date.Year, date.Month, date.Day, date.Hours, date.Minutes, date.Seconds)

            dps.push({x: xVal,y: yVal});
            xVal++;
            if (dps.length >  12 ) {
                dps.shift();
            }
        }
        this.chart.render();
	}
	render() {
		const options = {
            theme: "light2",
			title :{
				text: "Dynamic Line Chart"
			},
            axisY: {
				title: "Tempature (°C)",
                suffix: " °C"
			},
            axisX:{
                title: "Time ",
                interval:1,
                intervalType: "second",
                valueFormatString: "HH:mm:ss"
            },
			data: [{
				type: "line",
                indexLabel: "{y}°",
                toolTipContent: "</br> {y} °C",
				dataPoints : dps
			}]
		}
		
		return (
		<div>
			<h1>React Dynamic Line Chart</h1>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default DynamicLineChart;