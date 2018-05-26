import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Sunday } from '../../models/sunday.model';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage implements OnInit {

  date: Date;
  daysInThisMonth: number[];
  daysInLastMonth: number[];
  daysInNextMonth: number[];
  monthNames: string[];
  weekDays: string[];
  currentMonth: string;
  currentYear: number;
  currentDate: number;
  isSelected: boolean;
  sundaysList: Sunday[];

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    this.date = new Date();
    this.monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    this.weekDays = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];
    this.getDaysOfMonth();
    this.loadSundaysThisMonth();
  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();

    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = -1;
    }

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    firstDayThisMonth = firstDayThisMonth === 0 ? 7 : firstDayThisMonth;
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for (var i = 1; i < firstDayThisMonth; i++) {
      this.daysInLastMonth.push(prevNumOfDays - firstDayThisMonth + i + 1);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    for (var j = 0; j < thisNumOfDays; j++) {
      this.daysInThisMonth.push(j + 1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
    let k = 1;
    while (lastDayThisMonth + k < 8) {
      this.daysInNextMonth.push(k);
      k++;
    }

    var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length - k;
    while (k + totalDays < 42) {
      this.daysInNextMonth.push(k);
      k++;
    }
  }

  loadSundaysThisMonth() {
    this.sundaysList = new Array();
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    this.getDaysOfMonth();
  }
}
