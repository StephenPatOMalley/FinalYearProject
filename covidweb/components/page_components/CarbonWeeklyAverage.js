import React, { Component } from 'react';
import CanvasJSReact from '../../canvas_assets/canvasjs.react';

import classes from './CarbonDataGraph.module.css'
import GetTime from '../time/TimeParser'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints  = []

class CarbonWeeklyData extends Component {
 
	render() {	
		const options = {
			theme: "light2",
			title: {
				text: "Weekly Results"
			},
			axisY: {
				title: "Parts Per Million (PPM)",
			},
            axisX:{
                interval:1,
                intervalType: "day",
                valueFormatString: "MM-DD"
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
        var dailyCO2 = 0
        var count = 0
        var dayLoop = null
		var results = this.props.data
		var numberOfResults = results.length
		var chart = this.chart;
		for (var i = 0; i < numberOfResults; i++) {
            var date = GetTime(results[i].TimeStamp, "UTC-Date")
            if(dayLoop == null){
                dayLoop = date.Day
            }
            if(date.Day == dayLoop){
                dailyCO2 += results[i].CarbonDioxide
                count++
            }
            if(date.Day != dayLoop || i == numberOfResults - 1){
                dataPoints.push({
                    x: new Date(date.Year, date.Month, date.Day),
                    y: (dailyCO2/count)
                });
                dayLoop = null
            }
		}
		chart.render();
	}
}
 
export default CarbonWeeklyData    