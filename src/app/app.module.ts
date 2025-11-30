import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// AppComponent is now imported because it's standalone
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // AppComponent has been removed from here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,       // For making API calls
    BrowserAnimationsModule, // For ngx-charts
    
    AppComponent            // Import AppComponent here
  ],
  providers: [],
  bootstrap: [AppComponent] // The root component is still AppComponent
})
export class AppModule { }