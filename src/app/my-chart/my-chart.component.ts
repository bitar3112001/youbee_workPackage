import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetData} from '../model/AssetData';
import { ApiServiceService } from '../api-service.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-my-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css'],

})
export class MyChartComponent implements OnInit {

  data: AssetData[] = [];

  storeData: { response: any[] } = { response: [] };
  chartData: any[] = [];

  constructor(private dataService:ApiServiceService,private elRef: ElementRef) {

  }

// Fetch data on component initialization
  ngOnInit(): void {
    this.fetchData();
  }

 // Fetch data from the API and update the component state
  fetchData() {
      this.dataService.getData().subscribe(
        data => {
          this.storeData = data;
          this.data = this.transformData(this.storeData.response);
          this.createSunburstChart();
        },
        error => {
          console.error('There was an error!', error);
        }
      );
  }

// Transform raw data into a hierarchical structure for the sunburst chart
  private transformData(data: any[]): any {
    const root: any = { name: 'root', children: [] };

    data.forEach(item => {
      const category = item.profile.WZ_2008_ID.split('')[0];
      let categoryNode = root.children.find((d: any) => d.name === category);
      if (!categoryNode) {
        categoryNode = { name: category, children: [] };
        root.children.push(categoryNode);
      }
      categoryNode.children.push({
        name: item.profile.WZ_2008_ID,
        value: item.Summary.E_agg.Raw_Value
      });
    });

    return root;
  }
  // Create a sunburst chart using D3.js
  private createSunburstChart() {
    d3.select(this.elRef.nativeElement.querySelector('.sunburst-chart')).selectAll('*').remove();

    const data = this.transformData(this.storeData.response);
    const width = 450;
    const radius = width / 2;

    const svg = d3.select(this.elRef.nativeElement.querySelector('.sunburst-chart')).append('svg')
      .attr('width', width - 110)
      .attr('height', width - 20)
      .attr('viewBox', `0 0 ${width} ${width}`)
      .style('font', '5px sans-serif');

    const g = svg.append('g')
      .attr('transform', `translate(${radius},${radius})`);


    const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

    const partition = d3.partition()
      .size([2 * Math.PI, radius]);

    const root = d3.hierarchy(data)
      .sum(d => d.value);

    partition(root);


    root.descendants().forEach((d: any) => {
      if (d.depth === 1) {
        d.data.color = color(d.data.name);
      } else if (d.parent) {
        d.data.color = d.parent.data.color;
      }
    });

    const arc = d3.arc<d3.HierarchyRectangularNode<any>>()
      .startAngle(d => d.x0!)
      .endAngle(d => d.x1!)
      .innerRadius(d => d.y0!)
      .outerRadius(d => d.y1!);

    g.selectAll('path')
      .data(root.descendants().filter(d => d.depth))
      .enter().append('path')
      .attr('d', arc as any)
      .style('fill', d => d.data.color)
      .append('title')
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join('/')}\n${d.value}`);

    g.selectAll('text')
      .data(root.descendants().filter(d => d.depth))
      .enter().append('text')
      .attr('transform', function (d: any) {
        const x = (d.x0! + d.x1!) / 2 * 180 / Math.PI;
        const y = (d.y0! + d.y1!) / 2;
        return `rotate(${x - 90})translate(${y},0)rotate(${x < 180 ? 0 : 180})`;
      })
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .text(d => d.data.name);
  }

}
