import { Component, ViewChild, ElementRef, OnInit, Renderer2 } from '@angular/core';

const followerHeight = 10;
const followerWidth = 10;

@Component({
  selector: 'app-clicknfollow',
  templateUrl: './clicknfollow.component.html',
  styleUrls: ['./clicknfollow.component.css']
})
export class ClicknfollowComponent implements OnInit {
  @ViewChild('container') private containerElement: ElementRef;
  @ViewChild('follower') private followerElement: ElementRef;

  boundary: any = {};
  follower: any;

  constructor(private renderer: Renderer2) {
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

  onMouseButton(event: MouseEvent): void {
    const insideBoundary = this.isInsideBoundary(event);

    if (insideBoundary) {
      console.warn('render!');
      this.renderer.setStyle(this.follower, 'left', event.pageX - (followerWidth / 2) + 'px');
      this.renderer.setStyle(this.follower, 'top', event.pageY - (followerHeight / 2) + 'px');
    }
  }

  isInsideBoundary(event: MouseEvent) {
    return event.pageX > this.boundary.left &&
      event.pageX < this.boundary.right &&
      event.pageY > this.boundary.top &&
      event.pageY < this.boundary.bottom;
  }
}
