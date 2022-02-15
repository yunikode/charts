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

  @Input()
  units: string;

  constructor() {}

  onResize(event) {
    event.target.innerWidth > 800
      ? (this.type = 'bar')
      : (this.type = 'horizontalBar');

    this.chart.reinit();
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
          backgroundColor: '#42A5F5',
          data: [50, 25, 12, 48, 90, 76, 42],
          datalabels: {
            align: 'center',
            anchor: 'center',
          },
        },
        {
          label: 'NT',
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
              return `${item.yLabel} Test`;
            } else {
              return `${item.xLabel} Test`;
            }
          },
          footer: function (items) {
            let _sum = 0;
            if (this._chart.config.type === 'bar') {
              _sum = items.reduce((a, b) => a + b.yLabel, 0);
            } else {
              _sum = items.reduce((a, b) => a + b.xLabel, 0);
            }
            return 'Total: ' + _sum;
          },
        },
      },
      plugins: {
        datalabels: {
          formatter: function (value) {
            return `${value}`;
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
