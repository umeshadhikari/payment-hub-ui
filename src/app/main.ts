import { bootstrapApplication } from '@angular/platform-browser';
// FIX: Changed paths to be relative to the src/app/ folder
import { appConfig } from './app.config'; 
import { AppComponent } from './app.component'; 

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));