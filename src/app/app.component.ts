import { Component } from '@angular/core';
import { NlqApiService } from './nlq-api.service';
import { finalize } from 'rxjs/operators';

// --- Imports for Standalone Component ---
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http'; // <-- 1. IMPORT THIS

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  standalone: true,
  
  // --- 2. ADD THE PROVIDER AND MODULE HERE ---
  providers: [NlqApiService],
  imports: [
    CommonModule,
    FormsModule,
    NgxChartsModule,
    HttpClientModule // <-- Add this module
  ]
})
export class AppComponent {
  
  // Properties for the form
  query: string = 'Show me the payment breakdown by currency';
  isLoading: boolean = false;
  errorMessage: string | null = null;
  
  // Properties for the data response
  responseData: { [key: string]: any }[] | null = null;
  visualizationType: 'bar' | 'line' | 'table' | null = null;
  tableHeaders: string[] = []; 

  // Properties for ngx-charts
  view: [number, number] = [700, 300];
  xAxisLabel: string = '';
  yAxisLabel: string = '';

  constructor(private nlqApi: NlqApiService) {}

  // Method for the form submission
  onSubmit() {
    if (!this.query.trim()) return;

    this.isLoading = true;
    this.errorMessage = null;
    this.responseData = null;
    this.visualizationType = null;
    this.tableHeaders = []; 

    this.nlqApi.askQuery(this.query)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.responseData = data as { [key: string]: any }[];
          this.determineVisualization(this.responseData);
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
  }

  // Method to determine visualization
  private determineVisualization(data: { [key: string]: any }[]) {
    this.tableHeaders = (data && data.length > 0) ? Object.keys(data[0]) : [];

    if (!data || data.length === 0) {
      this.visualizationType = 'table';
      return;
    }

    const keys = this.tableHeaders;

    if (keys.includes('date') || keys.includes('day') || keys.includes('month')) {
      this.visualizationType = 'line';
      this.xAxisLabel = 'Date';
      this.yAxisLabel = 'Amount / Count';
    }
    else if (keys.includes('name') && keys.includes('value')) {
      this.visualizationType = 'bar';
      this.xAxisLabel = 'Category';
      this.yAxisLabel = 'Total Value';
    }
    else {
      this.visualizationType = 'table';
    }
  }
}
