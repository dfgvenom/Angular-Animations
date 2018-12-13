import { animate, style, state, group, query, stagger, transition, trigger, sequence } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sequences',
  templateUrl: './sequences.component.html',
  styleUrls: ['./sequences.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.item', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
          stagger(-300, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
    trigger('flyInOut', [
      state('in', style({
        width: 120,
        transform: 'translateX(0)', opacity: 1
      })),
      transition('void => *', [
        style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
        group([
          animate('0.3s 0.1s ease', style({
            transform: 'translateX(0)',
            width: 120
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.3s ease', style({
            transform: 'translateX(50px)',
            width: 10
          })),
          animate('0.3s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ]),
    trigger('sequenceTrigger', [
      transition('off => on', [
        style({
          color: 'red'
        }),
        sequence([
          animate('1s', style({
            transform: 'translateX(50px)',
          })),
          animate('1s', style({
            transform: 'translateY(50px) translateX(50px)',
          })),
          animate('1s', style({
            transform: 'translateY(50px) translateX(0)',
          })),
          animate('1s', style({
            transform: 'translateY(0)',
          })),
        ])
      ])
    ])
  ]
})
export class SequencesComponent {

  elements = ['itemA', 'ABC', 'CDE'];

  flyShown = false;
  sequenceRunning = false;

  toggleFly() {
    this.flyShown = !this.flyShown;
  }

  startAnimation() {
    this.sequenceRunning = true;
  }

  stopAnimation() {
    this.sequenceRunning = false;
  }

}
