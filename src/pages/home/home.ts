import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Sunday } from '../../models/sunday.model';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { DataStoreService } from '../../services/data-store.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  nextSunday = new Sunday();
  inPortraitMode: any;
  connectionError = false;
  loading = true;

  constructor(public navCtrl: NavController, private orientation: ScreenOrientation,
    public platform: Platform, private dataStore: DataStoreService) {

    this.nextSunday.date = this.getNextSundayDate(new Date());

    this.platform.ready().then(() => {
      this.setOrientation()
      this.orientation.onChange().subscribe(this.setOrientation.bind(this));
    });
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.loading = true;
    this.connectionError = false;
    this.dataStore.getByDate(this.nextSunday.date)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        (data: Sunday) => {
          if (data) {
            this.nextSunday.isOpen = data.isOpen;
          } else {
            this.connectionError = true;
          }
        },
        error => this.connectionError = true
      );
  }

  private setOrientation() {
    this.inPortraitMode = this.orientation.type.indexOf('portrait') > -1;
  }

  private getNextSundayDate(date: Date) {
    const currentDay = date.getDay() !== 0 ? date.getDay() : 7;
    const daysToSunday = 7 - currentDay;
    if (daysToSunday > 0) {
      date.setDate(date.getDate() + daysToSunday);
    }

    return date;
  }
}
