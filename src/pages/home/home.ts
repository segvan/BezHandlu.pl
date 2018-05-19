import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Sunday } from '../../models/sunday.model';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  nextSunday = new Sunday();
  inPortraitMode: any;

  constructor(public navCtrl: NavController, private orientation: ScreenOrientation,
    public platform: Platform) {
    this.nextSunday.date = this.getNextSundayDate(new Date());

    this.platform.ready().then(() => {
      this.setOrientation()
      this.orientation.onChange().subscribe(this.setOrientation.bind(this));
    });
  }

  ngOnInit(): void {
    this.nextSunday.shopsOpened = true;
  }

  iconClicked() {
    this.nextSunday.shopsOpened = !this.nextSunday.shopsOpened;
  }

  private setOrientation() {
    this.inPortraitMode = this.orientation.type.indexOf('portrait') > -1;
  }

  private getNextSundayDate(date: Date) {
    const daysToSunday = 7 - date.getDay();
    if (daysToSunday > 0) {
      date.setDate(date.getDate() + daysToSunday);
    }

    return date;
  }
}
