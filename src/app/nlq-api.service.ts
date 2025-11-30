import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Defines the shape of the data we expect
export type DataItem = { [key: string]: any };

// Defines the shape of the JSON response we expect from the backend
export interface ApiResponse {
  data: DataItem[];
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NlqApiService {

  private backendUrl = 'http://localhost:8080/api/nlq';

  constructor(private http: HttpClient) { }

  askQuery(query: string): Observable<ApiResponse> {
    return this.http.post(this.backendUrl, { query }, { responseType: 'text' }) // 1. Expect raw text
      .pipe(
        map(responseText => {
          // 2. Try to parse the text as JSON
          try {
            const jsonData = JSON.parse(responseText);
            // 3. Wrap the raw data in our ApiResponse object
            return { data: jsonData }; 
          } catch (e) {
            // 4. If parsing fails, it's a non-JSON response
            console.error('Failed to parse JSON response:', responseText);
            throw new Error('Server returned non-JSON data or was malformed.');
          }
        }),
        catchError((err: HttpErrorResponse) => {
          // 5. Handle HTTP errors (like 500)
          console.error('API Error:', err);
          const errorMsg = err.error ? (err.error.error || err.error.message || 'Unknown server error') : `Server error: ${err.status}`;
          return throwError(() => new Error(errorMsg));
        })
      );
  }
}