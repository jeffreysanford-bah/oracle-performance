
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-chart',
  template: `<div id="chart"></div>`,
})
export class D3ChartComponent implements OnInit {
  ngOnInit() {
    this.createChart();
  }

  private createChart() {
    const data = [10, 20, 30, 40, 50];

    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', 500)
      .attr('height', 500);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 30)
      .attr('y', d => 500 - d * 10)
      .attr('width', 20)
      .attr('height', d => d * 10)
      .attr('fill', 'blue');
  }
}
