import { animate, group, query, style, transition, trigger, animateChild } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* => *', [
        query(':enter',
          style({ opacity: 0, transform: 'translateX(100%)' }),
          { optional: true }),
        query(':leave',
          style({ opacity: 1, transform: 'translateX(0%)' }),
          { optional: true }),
        group([
          query(':enter', [
            animate('1s',
              style({ opacity: 1, transform: 'none' }))
          ], { optional: true }),
          query(':leave', [
            animate('1s',
              style({ opacity: 0, transform: 'translateX(-100%)' }))
          ], { optional: true }),
          query('@*', animateChild())
        ]),
      ]),
    ])
  ]
})
export class AppComponent {
  title = 'Animations';
  appRoutes = routes;

  prepRouteAnimation(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'] || '';
  }

}
