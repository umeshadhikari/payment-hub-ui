import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts'; // No longer needed
import { NlqApiService, ApiResponse } from './nlq-api.service'; // ViewType removed
import { finalize } from 'rxjs/operators';

// Helper type for dynamic keys
type DataItem = { [key: string]: any };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // NgxChartsModule // No longer needed
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // Properties for the form and state
  currentQuery: string = 'Show me the total value of payments by currency';
  isLoading: boolean = false;
  errorMessage: string | null = null;
  
  // Properties for the response data
  apiResponse: ApiResponse | null = null;
  tableHeaders: string[] = [];

  // --- All chart and switcher properties have been removed ---

  constructor(private nlqService: NlqApiService) {}

  onSubmit() {
    if (!this.currentQuery.trim()) return;

    this.isLoading = true;
    this.errorMessage = null;
    this.apiResponse = null;
    this.tableHeaders = [];

    this.nlqService.askQuery(this.currentQuery).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (response) => {
        this.apiResponse = response;
        this.processVisualization(response);
      },
      error: (err) => {
        this.errorMessage = err.message || 'An unknown error occurred.';
      }
    });
  }

  // setViewType method removed

  autoGrowTextarea(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset height to recalculate
    textarea.style.height = (textarea.scrollHeight) + 'px'; // Set to new scroll height
  }

  /**
   * @param response The API response
   * FIX: This logic is now simplified to only process table headers.
   */
  private processVisualization(response: ApiResponse) {
    if (!response.data || response.data.length === 0) {
      return;
    }
    
    // Always set table headers
    this.tableHeaders = Object.keys(response.data[0]);
  }
}