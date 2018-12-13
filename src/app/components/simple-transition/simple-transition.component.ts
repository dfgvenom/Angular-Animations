import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-simple-transition',
  templateUrl: './simple-transition.component.html',
  styleUrls: ['./simple-transition.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-50%)' }),
        animate('0.5s')
      ]),
      transition('* => void', [
        animate('1s', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('3s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('3s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SimpleTransitionComponent {
  isOpen = true;
  isShownFly = false;
  isShownFade = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  toggleFly() {
    this.isShownFly = !this.isShownFly;
  }

  toggleFade() {
    this.isShownFade = !this.isShownFade;
  }

}
