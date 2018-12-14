import { query, transition, trigger, style, animate, group, animateChild } from '@angular/animations';
import { Component } from '@angular/core';
import { routes } from './app-routing.module';
import { RouterOutlet } from '@angular/router';

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
        group([
          query(':leave', [
            animate('1s',
              style({ opacity: 0, transform: 'translateX(-100%)' }))
          ], { optional: true }),
          query(':enter', [
            animate('1s',
              style({ opacity: 1, transform: 'none' }))
          ], { optional: true }),
        ])
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
