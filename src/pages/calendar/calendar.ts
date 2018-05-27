import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataStoreService } from '../../services/data-store.service';
import { finalize } from 'rxjs/operators';

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
  sundaysList: any;
  sundaysThisMonth: any;
  connectionError = false;
  loading = true;

  constructor(public navCtrl: NavController, private dataStore: DataStoreService) { }

  ngOnInit() {
    this.date = new Date();
    this.monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    this.weekDays = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];
    this.loadSundays();
    this.getDaysOfMonth();
  }

  private refreshData() {
    this.loadSundays();
  }

  loadSundays() {
    this.loading = true;
    this.connectionError = false;
    this.dataStore.getAll()
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        (data) => {
          if (data) {
            this.sundaysList = data;
            this.loadSundaysThisMonth();
          } else {
            this.connectionError = true;
          }
        },
        error => this.connectionError = true
      );
  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();

    const now = new Date();
    this.currentYear = this.date.getFullYear();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    if (this.date.getMonth() === now.getMonth()
      && this.date.getFullYear() == now.getFullYear()) {
      this.currentDate = now.getDate();
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
    if (this.sundaysList) {
      const year = this.sundaysList[this.currentYear]
      if (year && year.monthes) {
        const month = year.monthes[this.date.getMonth() + 1];
        this.sundaysThisMonth = month || { days: {} };
      }
    }
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
    this.loadSundaysThisMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    this.getDaysOfMonth();
    this.loadSundaysThisMonth();
  }

  getDayClasses(day: number): string | string[] {
    let result: any;
    if (day === this.currentDate) {
      result = 'currentDate';
    } else {
      result = 'otherDate';
    }

    if (this.sundaysThisMonth.days[day]) {
      result = [result];
      if (this.sundaysThisMonth.days[day].isOpen) {
        result.push('openDate');
      } else {
        result.push('closedDate');
      }
    }

    return result;
  }
}
