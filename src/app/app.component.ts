import { Component } from '@angular/core';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  chartJs = Chart;
  chartLabelPlugin = ChartDataLabels;

  ngOnInit(): void {
    this.chartJs.plugins.unregister(this.chartLabelPlugin);
  }
}
