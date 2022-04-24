// Based Off Documation and Examples from https://canvasjs.com/react-charts/
import React, { Component } from 'react';
import CanvasJSReact from '../../canvas_assets/canvasjs.react';

import classes from './CarbonDataGraph.module.css'
import GetTime from '../time/TimeParser'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints = []

class CarbonAverage extends Component {
 
	render() {	
		const options = {
			theme: "light2",
			title: {
				text: "Hourly Average of 24H Results"
			},
			axisY: {
				title: "Parts Per Million (PPM)",
			},
            axisX:{
                interval:1,
                intervalType: "hour",
                valueFormatString: "DD-MM hh TT"
            },
			data: [{
				type: "line",
				dataPoints: dataPoints
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
	
	componentDidMount(){
        dataPoints = []
		var results = this.props.data
		var numberOfResults = results.length
		var chart = this.chart;
		for (var i = 0; i < numberOfResults; i++) {
            var date = GetTime(results[i].TimeStamp, "UTC-Date")
			dataPoints.push({
				x: new Date(date.Year, date.Month, date.Day, date.Hours, date.Minutes, date.Seconds),
				y: results[i].CarbonDioxide
			});
		}
		chart.render();
	}
}

export default CarbonAverage;                              
