import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

const followerHeight = 5;
const followerWidth = 5;
let curMovX = 0;
let curMovY = 0;

@Component({
  selector: 'app-dragnfollow',
  templateUrl: './dragnfollow.component.html',
  styleUrls: ['./dragnfollow.component.css'],
  animations: [
    trigger('followAnimation', [
      state('off', style({
        backgroundColor: 'blue',
        top: '{{movY}}px',
        left: '{{movX}}px',
        transform: 'none',
      }),
        { params: { movX: curMovX, movY: curMovY } }
      ),
      state('record', style({
        backgroundColor: 'red',
        top: '{{movY}}px',
        left: '{{movX}}px',
      }),
        { params: { movX: curMovX, movY: curMovY } }
      ),
      state('on', style({
        backgroundColor: 'green',
        transform: 'translateX({{movX}}px) translateY({{movY}}px)'
      }),
        { params: { movX: curMovX, movY: curMovY } }
      ),
      state('on2', style({
        backgroundColor: 'green',
      })),
      transition('void => *', []),
      transition('off => record', [
        animate(200)
      ]),
      transition('record => on', [
        animate(200)
      ]),
      transition('on => off', [
        animate(200)
      ]),
      transition('* => on', [
        animate(50)
      ]),
    ])
  ]
})
export class DragnfollowComponent implements OnInit {

  @ViewChild('container') private containerElement: ElementRef;
  @ViewChild('follower') private followerElement: ElementRef;

  movements: any[] = [[1, 1]];
  boundary: any = {};
  follower: any;
  isMouseDown = false;

  isAnimationState = 'off';

  constructor() {
  }

  ngOnInit() {
    this.follower = this.followerElement.nativeElement;

    const container = this.containerElement.nativeElement;
    this.boundary = {
      left: container.offsetLeft + (followerWidth / 2),
      right: container.clientWidth + container.offsetLeft - (followerWidth / 2),
      top: container.offsetTop + (followerHeight / 2),
      bottom: container.clientWidth + container.offsetTop - (followerHeight / 2),
    };
  }

  onMouseButtonDown(event: MouseEvent): void {
    if (this.isAnimationState === 'off') {
      this.isMouseDown = event.buttons === 1;
      this.isAnimationState = 'record';
    }
  }

  onMouseButtonUp(event: MouseEvent): void {
    this.isMouseDown = event.buttons === 1;
    this.isAnimationState = 'on';
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.toState === 'on') {
      if (this.getMovementSize() > 0) {
        const currentMovement = this.movements.shift();
        curMovX = currentMovement[0];
        curMovY = currentMovement[1];
        this.isAnimationState = 'on2';
        setTimeout(() => {
          this.isAnimationState = 'on';
        }, 10);
      } else {
        this.isAnimationState = 'off';
      }
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isAnimationState === 'record' && this.isMouseDown && this.isInsideBoundary(event)) {
      const movX = event.pageX - this.boundary.left - (followerWidth / 2);
      const movY = event.pageY - this.boundary.top - (followerHeight / 2);

      this.movements.push([movX, movY]);
    }
  }

  isInsideBoundary(event: MouseEvent) {
    return event.pageX > this.boundary.left &&
      event.pageX < this.boundary.right &&
      event.pageY > this.boundary.top &&
      event.pageY < this.boundary.bottom;
  }

  getAnimationState() {
    return { value: this.isAnimationState, params: { movX: curMovX, movY: curMovY } };
  }

  getMovementSize() {
    return this.movements.length;
  }

}
