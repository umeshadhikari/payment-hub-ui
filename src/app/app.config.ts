import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router'; // No longer needed
// import { routes } from './app.routes'; // No longer needed
// import { provideAnimations } from '@angular/platform-browser/animations'; // No longer needed
import { provideHttpClient } from '@angular/common/http'; 

export const appConfig: ApplicationConfig = {
  providers: [
    // provideRouter(routes), // No longer needed
    // provideAnimations(), // No longer needed
    provideHttpClient() 
  ]
};
