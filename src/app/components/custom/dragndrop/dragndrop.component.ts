import { Component, ViewChild, ElementRef, OnInit, Renderer2, Host } from '@angular/core';

const draggableHeight = 50;
const draggableWidth = 100;

@Component({
  selector: 'app-dragndrop',
  templateUrl: './dragndrop.component.html',
  styleUrls: ['./dragndrop.component.css']
})
export class DragndropComponent implements OnInit {

  @ViewChild('container') private containerElement: ElementRef;
  @ViewChild('draggable') private draggableElement: ElementRef;

  boundary: any = {};
  draggable: any;
  container: any;
  isMouseDown = false;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.draggable = this.draggableElement.nativeElement;
    this.container = this.containerElement.nativeElement;

    this.boundary = {
      left: this.container.offsetLeft + (draggableWidth / 2),
      right: this.container.clientWidth + this.container.offsetLeft - (draggableWidth / 2),
      top: this.container.offsetTop + (draggableHeight / 2),
      bottom: this.container.clientWidth + this.container.offsetTop - (draggableHeight / 2),
    };
  }

  onMouseButton(event: MouseEvent): void {
    this.isMouseDown = event.buttons === 1;

    if (this.isMouseDown) {
      console.warn('this.container.scrolltop: ' + this.container.scrolltop);
      console.warn('event.clientY: ' + event.clientY);
      console.warn('this.boundary.top: ' + this.boundary.top);
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isMouseDown && this.isInsideBoundary(event)) {
      this.renderer.setStyle(this.draggable, 'left', event.clientX - this.boundary.left + 'px');
      this.renderer.setStyle(this.draggable, 'top', event.clientY - this.boundary.top + 'px');
    }
  }

  isInsideBoundary(event: MouseEvent) {
    return event.clientX > this.boundary.left &&
      event.clientX < this.boundary.right &&
      event.clientY > this.boundary.top &&
      event.clientY < this.boundary.bottom;
  }
}
