import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NlqApiService {
  
  private apiUrl = 'http://localhost:8080/api/nlq';

  constructor(private http: HttpClient) { }

  askQuery(query: string): Observable<any> {
    return this.http.post(this.apiUrl, { query }, { responseType: 'text' }) // Expect text (as it's a raw JSON string)
      .pipe(
        map(responseString => {
          try {
            // The backend now sends a valid JSON string
            return JSON.parse(responseString);
          } catch (e) {
            console.error("Failed to parse JSON response:", responseString, e);
            throw new Error('Backend returned malformed JSON.');
          }
        }),
        catchError(err => {
          console.error('API Error:', err);
          return throwError(() => new Error(err.message || 'Error connecting to the API.'));
        })
      );
  }
}
