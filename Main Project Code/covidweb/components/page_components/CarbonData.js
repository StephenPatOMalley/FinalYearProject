// Based Off Documation and Examples from https://canvasjs.com/react-charts/
import React, { Component } from 'react';
import CanvasJSReact from '../../canvas_assets/canvasjs.react';

import classes from './CarbonDataGraph.module.css'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints  = []

class CarbonData extends Component{
	render() {	
		const options = {
			theme: "light2",
			zoomEnabled: true,
			animationEnabled: true,
			title: {
				text: "24 Hour Results"
			},
			axisY: {
				title: "Parts Per Million (PPM)",
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
			</div>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
	
	componentDidMount(){
        dataPoints = []
		var results = this.props.data
		var numberOfResults = results.length
		var chart = this.chart;
		for (var i = 0; i < numberOfResults; i++) {
			dataPoints.push({
				// x is not the date in the 24 hour graph as it has cause some
				// bugs that can stop the graph from loading correctly
				x: x,
				y: results[i].CarbonDioxide
			});
		}
		chart.render();
	}	
}
 
export default CarbonData                            
