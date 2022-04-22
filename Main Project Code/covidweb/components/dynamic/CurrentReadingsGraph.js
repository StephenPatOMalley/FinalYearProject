//This Dynamic Graph was not used as I could not get it to work using NextJS
import React, { Component } from 'react';
import CanvasJSReact from '../../canvas_assets/canvasjs.react';

import classes from './CurrentReadingsGraph.module.css'
import GetTime from '../time/TimeParser'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints = []
var updateInterval = 800
var graphLenght = 16

class DynamicLineChart extends Component {
	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);
	}
	
	componentDidMount() {
		console.log(this.props, "--")
		if(this.props.TimeStamp !== null){
			setInterval(this.updateChart, updateInterval);
		}
	}

	updateChart() {
        var results = this.props.data
        console.log(results.TimeStamp )
        if(results.TimeStamp != ""){
            var date = GetTime(results.TimeStamp, "UTC-Date")
            var yVal = results.Temperature
            var xVal = new Date(date.Year, date.Month, date.Day, date.Hours, date.Minutes, date.Seconds)

            dataPoints.push({x: xVal,y: yVal});
            if (dataPoints.length >  graphLenght ) {
                dataPoints.shift();
            }
        }
		try{
			this.chart.render();
		}catch(err){
			console.log(err)
			dataPoints = []
		}
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
                interval:2,
                intervalType: "second",
                valueFormatString: "HH:mm:ss"
            },
			data: [{
				type: "line",
                indexLabel: "{y}°C",
                toolTipContent: "</br> {y} °C",
				dataPoints : dataPoints
			}]
		}
		
		return (
		<div className={classes.container}>
            <div className={classes.graph}>
                <CanvasJSChart options = {options} 
                    onRef={ref => this.chart = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        </div>
		);
	}
}

export default DynamicLineChart;