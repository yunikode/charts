import { Component, Input, OnInit, ViewChild } from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { UIChart } from 'primeng-lts/chart';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  @ViewChild('chart') chart: UIChart;

  stackedData: any;

  stackedOptions: any;

  plugin = ChartDataLabels;

  type: string;

  resizeTimer: any;
  @Input()
  units: string;

  constructor() {}

  onResize() {
    const chart = this.chart;

    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(function () {
      window.innerWidth > 800
        ? (this.type = 'bar')
        : (this.type = 'horizontalBar');
      chart.type = this.type;
      chart.reinit();
    }, 250);
  }

  ngOnInit(): void {
    window.innerWidth > 800
      ? (this.type = 'bar')
      : (this.type = 'horizontalBar');

    this.stackedData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'HT',
          unit: this.units,
          backgroundColor: '#42A5F5',
          data: [50, 25, 12, 48, 90, 76, 42],
          datalabels: {
            align: 'center',
            anchor: 'center',
          },
        },
        {
          label: 'NT',
          unit: this.units,
          backgroundColor: '#66BB6A',
          data: [21, 84, 24, 75, 37, 65, 34],
          datalabels: {
            align: 'center',
            anchor: 'center',
          },
        },
      ],
    };

    this.stackedOptions = {
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (item) {
            if (this._chart.config.type === 'bar') {
              return `${item.yLabel} ${
                this._data.datasets[item.datasetIndex].unit === 'm3'
                  ? 'm' + String.fromCharCode(179)
                  : this._data.datasets[item.datasetIndex].unit
              }`;
            } else {
              return `${item.xLabel} ${
                this._data.datasets[item.datasetIndex].unit === 'm3'
                  ? 'm' + String.fromCharCode(179)
                  : this._data.datasets[item.datasetIndex].unit
              }`;
            }
          },
          footer: function (items) {
            let _sum = 0;
            if (this._chart.config.type === 'bar') {
              _sum = items.reduce((a, b) => a + b.yLabel, 0);
            } else {
              _sum = items.reduce((a, b) => a + b.xLabel, 0);
            }
            return `Gesamt: ${_sum} ${
              this._data.datasets[0].unit === 'm3'
                ? 'm' + String.fromCharCode(179)
                : this._data.datasets[0].unit
            }`;
          },
        },
      },
      plugins: {
        datalabels: {
          formatter: function (value, context) {
            return `${value} ${
              context.dataset.unit === 'm3'
                ? 'm' + String.fromCharCode(179)
                : context.dataset.unit
            }`;
          },
          color: 'white',
          font: {
            weight: 'bold',
          },
        },
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    };
  }
}
