import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// If you have routing (ng new --routing), keep this:
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideRouter(routes), // Uncomment if you have routing
    
    // --- Add these providers ---
    provideHttpClient(),      // Replaces HttpClientModule
    provideAnimations(),      // Replaces BrowserAnimationsModule
    
    // For modules without `provide` functions, use importProvidersFrom
    importProvidersFrom(
      FormsModule,      // For [(ngModel)]
      NgxChartsModule   // For <ngx-charts-*>
    )
  ]
};
