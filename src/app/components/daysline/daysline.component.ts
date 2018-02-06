import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-daysline',
  templateUrl: './daysline.component.html',
  styleUrls: ['./daysline.component.css']
})
export class DayslineComponent implements OnInit {

  daysList = [];
  DAYS_FROM = -4;
  DAYS_TO = 4;

  constructor() {
  }

  ngOnInit() {
    this.generateDaysLine();
  }

  generateDaysLine(date = moment.now()) {
    const list = [];
    for (let i = this.DAYS_FROM; i <= this.DAYS_TO; i++) {
      const dateObj = this.getDateFormat(moment(date).add(i, 'd'));
      list.push({...dateObj, active: i === 0});
    }
    this.daysList = list;
  }

  getDateFormat(date) {
    return {
      fullDate: moment(date).format('MMM Do, YYYY'),
      day: moment(date).format('DD'),
      dayOfWeek: moment(date).format('dddd'),
      shortDayOfWeek: moment(date).format('ddd')
    };
  }

  selectDay(i) {
    this.daysList.map((item, index) => {
      if (index === i) {
        this.loadTaskListByDate(item);
      }
      return item.active = index === i;
    });
  }

  loadTaskListByDate(item) {
    // todo
  }

}
