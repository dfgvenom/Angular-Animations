import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-extended-transition',
  templateUrl: './extended-transition.component.html',
  styleUrls: ['./extended-transition.component.css'],
  animations: [
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
    ]),
    trigger('childAnimation', [
      state('open', style({
        height: '100px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '30px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open <=> closed', [
        animate('1s')
      ]),
    ]),
    trigger('throbberAnimation', [
      state('noThrobber', style({
        height: '100px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('showThrobber', style({
        height: '30px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('noThrobber => showThrobber', [
        animate('5s')
      ]),
      transition('showThrobber => noThrobber', [
        animate('0.2s')
      ]),
    ]),
    trigger('shrinkOut', [
      state('in', style({ height: '*' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
      ]),
      transition('void => *', [
        style({ height: '0' }),
        animate(250, style({ height: '*' }))
      ])
    ])
  ]
})
export class ExtendedTransitionComponent {

  counter = 0;
  enabled = false;
  isOpen = false;
  showThrobber = false;
  isShown = false;

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }

  toggleEnabled() {
    this.enabled = !this.enabled;
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  startThrobber() {
    this.showThrobber = true;
  }

  onAnimationStart(event: AnimationEvent) {
    console.warn('Animation Start Event received');
  }

  onAnimationEnd(event: AnimationEvent) {
    console.warn('Animation End Event received');
    this.showThrobber = false;
  }

  toggleShrink() {
    this.isShown = !this.isShown;
  }

}
