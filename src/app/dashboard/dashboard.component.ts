import { Component, HostListener, OnInit,Output,EventEmitter, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { DataService } from '../data.service';
import {NgxChartsModule} from '@swimlane/ngx-charts'
import { LegendPosition } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent,NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  data = [
    {
      "name": "dataSet 1",
      "value": 100,
      "children": [
        {
          "name": "C21",
          "value": 20
        },
        {
          "name": "C10",
          "value": 20
        },
        {
          "name": "C14",
          "value": 20
        },
        {
          "name": "C24",
          "value": 20
        },
        {
          "name": "C29",
          "value": 20
        },
        {
          "name": "C26",
          "value": 20
        },
        {
          "name": "C28",
          "value": 20
        }
      ]
    },
    {
      "name": "dataSet 3",
      "value": 100,
      "children": [
        {
          "name": "H49",
          "value": 33
        },
        {
          "name": "H51",
          "value": 33
        },
        {
          "name": "J",
          "value": 34,
          "children": [
            {
              "name": "J58",
              "value": 11
            },
            {
              "name": "J61",
              "value": 11
            },
            {
              "name": "J62",
              "value": 12
            }
          ]
        }
      ]
    },
    {
      "name": "dataSet 2",
      "value": 100,
      "children": [
        {
          "name": "L68",
          "value": 25
        },
        {
          "name": "M",
          "value": 25,
          "children": [
            {
              "name": "M70",
              "value": 12
            }
          ]
        },
        {
          "name": "dataSet 3",
          "value": 25,
          "children": [
            {
              "name": "N79",
              "value": 12
            }
          ]
        },
        {
          "name": "dataSet 3",
          "value": 25,
          "children": [
            {
              "name": "F41",
              "value": 12
            }
          ]
        }
      ]
    }
  ];
  chartView: [number,number] = [400, 300];

  gradient: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  showLegend = true;
  dynamicLegendPosition: LegendPosition = LegendPosition.Below;

@Output() openSide= new EventEmitter();
@Input() side= false;


  constructor() {

  }
  ngOnInit(): void {

  }

  sendBtn(){
    console.log("pst")
this.side= !this.side
this.openSide.emit(this.side)
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setChartView();
  }


  setChartView() {
    const screenWidth = window.innerWidth;
    console.log(screenWidth)
    if (screenWidth < 600) {
      this.chartView = [screenWidth * 0.7, 300];
    } else {
      this.chartView = [400, 300];
    }
  }
}
