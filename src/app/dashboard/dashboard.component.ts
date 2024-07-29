import { Component, HostListener, OnInit, Output, EventEmitter, Input, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MyChartComponent } from '../my-chart/my-chart.component';
import { AssetData } from '../model/AssetData';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent,MyChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {

  storeData: { response: AssetData[] } = { response: [] };
  myData: AssetData | undefined;

  selection: { id: string; name: string }[] = [];

  info = {
    employees: 0,
    companies: 0,
    revenue: 0,
    waterConsumption: 0,
    hazardousWaste: 0,
    directGHG: 0,
    liquidity: 0
  };

  chartData: { name: string; value: number }[] = [];
  data: AssetData[] = [];

  @Output() openSide = new EventEmitter<boolean>();
  @Input() side = false;

  constructor(private dataService:ApiServiceService) {}

  // Fetch data and initialize chart data on component initialization
  ngOnInit(): void {

    this.fetchData();

  }

// Toggle sidebar visibility and emit event
  sendBtn() {
    this.side = !this.side;
    this.openSide.emit(this.side);
  }

// Fetch data from the API and update the component state
  // fetchData() {
  //   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwicGVybWlzc2lvbnMiOlsiZ2V0OmFzc2V0cy9kZXYiLCJnZXQ6ZXNnLWRhdGEvZGV0YWlscyJdLCJleHAiOjE3MjM5NzE1NTh9.MQjfAk-nc4p3tqNOeb9bscCadR1CLJO2Df1nriIFw7g"; // Replace with your actual token or a method to retrieve it

  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   this.http.get<{ response: AssetData[] }>(`/api/assets/dev`, { headers })
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  //     .subscribe(
  //       data => {
  //         this.storeData = data;

  //         this.myData = this.storeData.response[11];
  //         this.info.employees = this.myData.metrics.number_of_employees;
  //         this.info.revenue = this.myData.metrics.annual_revenue;
  //         this.info.companies = this.storeData.response.length;
  //         this.info.directGHG = this.myData.proxy_indicators.GHG_Scope_One.Raw_Value;
  //         this.info.waterConsumption = this.myData.proxy_indicators.Water_Consumption.Raw_Value;
  //         this.info.hazardousWaste = this.myData.proxy_indicators.Acute_Risks.Raw_Value;
  //         this.info.liquidity = this.myData.proxy_indicators.Liquidity_and_Solvency.Raw_Value;
  //         this.data = this.storeData.response;

  //         this.selection = this.data.map((record: AssetData) => {
  //           return { id: record._id, name: record.asset_id };
  //         });


  //       },
  //       error => {
  //         console.error('There was an error!', error);
  //       }
  //     );
  // }
  fetchData(){

    this.dataService.getData().subscribe(
      data => {
        this.storeData = data;
        this.myData = this.storeData.response[11];
        this.info.employees = this.myData.metrics.number_of_employees;
        this.info.revenue = this.myData.metrics.annual_revenue;
        this.info.companies = this.storeData.response.length;
        this.info.directGHG = this.myData.proxy_indicators.GHG_Scope_One.Raw_Value;
        this.info.waterConsumption = this.myData.proxy_indicators.Water_Consumption.Raw_Value;
        this.info.hazardousWaste = this.myData.proxy_indicators.Acute_Risks.Raw_Value;
        this.info.liquidity = this.myData.proxy_indicators.Liquidity_and_Solvency.Raw_Value;
        this.data = this.storeData.response;

        this.selection = this.data.map((record: AssetData) => {
          return { id: record._id, name: record.asset_id };
        });
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

// Handle selection change event
  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    if (selectedValue) {
      this.fetchDataSelect(selectedValue);
    }
  }

// Fetch data for a specific selection from the API and update the component state
fetchDataSelect(id: string) {
    this.dataService.getData().subscribe(
      data => {
        this.storeData = data;

        const selectedElement = this.storeData.response.find(element => element._id === id);

        if (selectedElement) {
          this.myData = selectedElement;
          this.info.employees = this.myData.metrics.number_of_employees;
          this.info.revenue = this.myData.metrics.annual_revenue;
          this.info.companies = this.storeData.response.length;
          this.info.directGHG = this.myData.proxy_indicators.GHG_Scope_One.Raw_Value;
          this.info.waterConsumption = this.myData.proxy_indicators.Water_Consumption.Raw_Value;
          this.info.hazardousWaste = this.myData.proxy_indicators.Acute_Risks.Raw_Value;
          this.info.liquidity = this.myData.proxy_indicators.Liquidity_and_Solvency.Raw_Value;
        }

        this.selection = this.storeData.response.map(record => {
          return { id: record._id, name: record.asset_id };
        });
      },
      error => {
        console.error('There was an error!', error);
      }
    );
}

}
