import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { isoStringToDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-keyframes',
  templateUrl: './keyframes.component.html',
  styleUrls: ['./keyframes.component.css'],
  animations: [
    trigger('keyFrame', [
      transition('nonActive => active', [
        animate('2s', keyframes([
          style({ backgroundColor: 'blue' }),
          style({ backgroundColor: 'red' }),
          style({ backgroundColor: 'orange' })
        ]))
      ]),
      transition('active => nonActive', [
        animate('2s', keyframes([
          style({ backgroundColor: 'orange' }),
          style({ backgroundColor: 'red' }),
          style({ backgroundColor: 'blue' })
        ]))
      ]),
    ]),
    trigger('keyFrameWithOffset', [
      transition('nonActive => active', [
        animate('2s', keyframes([
          style({ backgroundColor: 'blue', offset: 0 }),
          style({ backgroundColor: 'red', offset: 0.8 }),
          style({ backgroundColor: 'orange', offset: 1 })
        ]))
      ]),
      transition('active => nonActive', [
        animate('2s', keyframes([
          style({ backgroundColor: 'orange', offset: 0 }),
          style({ backgroundColor: 'red', offset: 0.2 }),
          style({ backgroundColor: 'blue', offset: 1 })
        ]))
      ]),
    ]),
    trigger('pulsating', [
      state('open', style({
        height: '100px',
        opacity: 1,
        backgroundColor: 'green'
      })),
      state('close', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open <=> close', [
        animate('3s', keyframes([
          style({ opacity: 0.5, offset: 0.2 }),
          style({ opacity: 0.1, offset: 0.4 }),
          style({ opacity: 0.5, offset: 0.5 }),
          style({ opacity: 0.1, offset: 0.6 }),
          style({ opacity: 0.5, offset: 0.8 })
        ]))
      ]),
    ])
  ]
})
export class KeyframesComponent {
  keyFrameStatus = 'nonActive';
  isOpen = false;

  toggleKeyFrameStatus() {
    if (this.keyFrameStatus === 'active') {
      this.keyFrameStatus = 'nonActive';
    } else {
      this.keyFrameStatus = 'active';
    }
  }

  togglePulse() {
    this.isOpen = !this.isOpen;
  }
}
