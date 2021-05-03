import React, {Component} from 'react';
import '../../App.css';
import * as d3 from 'd3';

/**
 * 	Bar chart visualization used to present data for ours and
 * 	providers
 * 	Used code from D3.js 
 */
class BarChart extends Component {
    constructor(props){
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
    }
    componentDidMount(){
        this.createBarChart();
    }
    componentDidUpdate(){
        this.createBarChart();
    }
    createBarChart(){
		//format the margin and size 
        const margin = { top: 100, right: 20, bottom: 150, left: 110};
        const height = 600 - margin.top - margin.bottom;
        const width = 1200 - margin.left - margin.right;
        const padding = -110;

        const svg = d3
            .select(this.refs.barChart)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .style('color', 'black')
            .attr('transform', 'translate(' 
								+ margin.left + ',' + margin.top + ')');
		//getting the data from input file 
        const x = d3
            .scaleBand()
            .range([0, width])
            .domain(this.props.data.map(d => d[this.props.xAttr]))
            .padding(0.2);
            svg
            .append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'translate(-10,0)rotate(-45)')
            .style('text-anchor', 'end')
            .style('fill', 'black');

        const maxValue = 
				Math.max(...this.props.data.map(d => d[this.props.yAttr]));
        const y = d3
            .scaleLinear()
            .domain([0, Math.ceil(maxValue / 10) * 10])
            .range([height, 0]);
            svg.append('g').call(d3.axisLeft(y))
            .selectAll('text')
            .style('fill', 'black');

        svg
            .selectAll('mybar')
            .data(this.props.data)
            .enter()
            .append('rect')
            .attr('x', d => x(d[this.props.xAttr]))
            .attr('y', d => y(d[this.props.yAttr]))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d[this.props.yAttr]))
            .attr("fill", 'orange')

        // Now add titles to the axes
        svg.append("text")
        .attr("text-anchor", "middle") 
		// This makes it easy to centre the text
        .attr("transform", "translate(" + (padding / 1.5) + "," 
						+ (height / 2) + ")rotate(-90)") 
		// Text is drawn off the screen top left
        .text(this.props.yLabel)
        .attr('fill', 'black');

        svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (width / 2) + "," 
						+ (height + 100) + ")")
        .text(this.props.xLabel)
        .attr('fill', 'black');
    }

    render(){
        return <div ref="barChart"></div>;
    }

}
export default BarChart;
