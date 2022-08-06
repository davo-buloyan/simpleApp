import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartDataset, ChartOptions } from 'chart.js';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, NgChartsModule, MatButtonModule],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})


export class ChartsComponent implements OnInit {

  myData: number[] = [1551, 1688, 1800, 1895, 2124, 2124, 3000];

  chartData: ChartDataset[] = [
    {
      label: '$ in millions',
      data: this.myData,
      pointHitRadius: 15,
      pointHoverRadius: 8,
    }
  ];

  chartLabels: string[] = ['2016 Revenue', '2017 Revenue', '2018 Revenue', '2019 Revenue', '2020 Revenue', '2021 Revenue', '2022 Revenue'];
  
  chartOptions: ChartOptions = {


    plugins: {
      legend: {
        display: false
      },

      tooltip: {
        backgroundColor: 'white',
        displayColors: false,
        padding: 10,

        titleColor: '#2D2F33',
        titleFont: {
          size: 18
        },

        bodyColor: '#2D2F33',
        bodyFont: {
          size: 13
        }
      }
    }
  };

  constructor() { }

  ngOnInit() {}

  onLoadData() {
    this.myData = Array.from({length: 7}, () => Math.floor(Math.random() * 6000));
    
    this.chartData = [
      {
        label: '$ in millions',
        data: this.myData,
        pointHitRadius: 15,
        pointHoverRadius: 8,
      }
    ];
  }

 }