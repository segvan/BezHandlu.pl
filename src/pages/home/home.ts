import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Sunday } from '../../models/sunday.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  nextSunday = new Sunday();

  constructor(public navCtrl: NavController) {
    this.nextSunday.date = this.getNextSundayDate(new Date());
  }

  ngOnInit(): void {
    this.nextSunday.shopsOpened = true;
  }

  iconClicked() {
    this.nextSunday.shopsOpened = !this.nextSunday.shopsOpened;
  }

  private getNextSundayDate(date: Date) {
    const daysToSunday = 7 - date.getDay();
    if (daysToSunday > 0) {
      date.setDate(date.getDate() + daysToSunday);
    }

    return date;
  }
}
