import { Component, ViewChild, ElementRef, OnInit, Renderer2 } from '@angular/core';

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
  isMouseDown = false;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.draggable = this.draggableElement.nativeElement;

    const container = this.containerElement.nativeElement;
    this.boundary = {
      left: container.offsetLeft + (draggableWidth / 2),
      right: container.clientWidth + container.offsetLeft - (draggableWidth / 2),
      top: container.offsetTop + (draggableHeight / 2),
      bottom: container.clientWidth + container.offsetTop - (draggableHeight / 2),
    };
  }

  onMouseButton(event: MouseEvent): void {
    this.isMouseDown = event.buttons === 1;
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isMouseDown && this.isInsideBoundary(event)) {
      this.renderer.setStyle(this.draggable, 'left', event.clientX - (draggableWidth / 2) + 'px');
      this.renderer.setStyle(this.draggable, 'top', event.clientY - (draggableHeight / 2) + 'px');
    }
  }

  isInsideBoundary(event: MouseEvent) {
    return event.clientX > this.boundary.left &&
      event.clientX < this.boundary.right &&
      event.clientY > this.boundary.top &&
      event.clientY < this.boundary.bottom;
  }
}
