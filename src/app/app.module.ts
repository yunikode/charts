import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'primeng-lts/chart';
import { AppComponent } from './app.component';
import { ChartsComponent } from './charts/charts.component';

@NgModule({
  declarations: [AppComponent, ChartsComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, ChartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
