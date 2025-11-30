import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Defines the expected JSON structure from your Spring Boot API.
 * The 'data' is flexible (any[]), and visualization_type
 * will tell the frontend which chart to render.
 */
export interface NlqResponse {
  data: any[];
  visualization_type: 'line' | 'bar' | 'table';
  error?: string; // For business/logic errors
}

/**
 * Defines the request body to be sent to the backend.
 */
export interface QueryRequest {
  query: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageQueryService {

  // This is the URL of your Spring Boot backend
  // The 'proxy.conf.json' file will handle routing this.
  private backendApiUrl = '/api/nlq';

  constructor(private http: HttpClient) { }

  /**
   * Sends the user's natural language query to the backend.
   * @param query The user's text query.
   * @returns An Observable of the NlqResponse.
   */
  askQuery(query: string): Observable<NlqResponse> {
    const requestBody: QueryRequest = { query };

    return this.http.post<NlqResponse>(this.backendApiUrl, requestBody)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handles HTTP errors from the backend.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error && error.error.error) {
      // Use the clean JSON error from our Spring @RestControllerAdvice
      errorMessage = error.error.error;
    } else if (error.message) {
      errorMessage = error.message;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}