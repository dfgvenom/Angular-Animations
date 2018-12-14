import { AfterViewInit, Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';
import { pairwise, switchMap, takeUntil } from 'rxjs/operators';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';

const followerHeight = 5;
const followerWidth = 5;
let curMovX = 0;
let curMovY = 0;
let lastMovX = -1;
let lastMovY = -1;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  animations: [
    trigger('followAnimation', [
      state('initial', style({
        backgroundColor: 'black',
        top: '0px',
        left: '0px',
      })),
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
      transition('* => initial', [
        animate(200)
      ]),
      transition('* => record', [
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
export class GameComponent implements AfterViewInit {
  @ViewChild('canvas') public canvas: ElementRef;
  @ViewChild('follower') private followerElement: ElementRef;
  private cx: CanvasRenderingContext2D;
  private canvasEl;
  private rect;

  movements: any[] = [];
  follower: any;
  isMouseDown = false;

  animationState = 'initial';
  public clearAtStart = false;

  constructor(private renderer: Renderer2) {
  }

  public ngAfterViewInit() {
    this.follower = this.followerElement.nativeElement;
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = 900;
    canvasEl.height = 400;

    this.cx.lineCap = 'round';

    this.captureEvents(canvasEl);
    this.rect = this.getBoundary();

    this.renderer.setStyle(this.follower, 'top', this.rect.top + 'px');
    this.renderer.setStyle(this.follower, 'left', this.rect.left + 'px');
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          if (this.clearAtStart) {
            this.clearCanvas();
          }
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              pairwise()
            );
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const prevPos = {
          x: res[0].pageX - this.rect.left,
          y: res[0].pageY - this.rect.top
        };

        const currentPos = {
          x: res[1].pageX - this.rect.left,
          y: res[1].pageY - this.rect.top
        };

        this.drawOnCanvas(prevPos, currentPos, true);
      });
  }

  private drawOnCanvas(
    prevPos: { x: number, y: number },
    currentPos: { x: number, y: number },
    isMouseDrawing: boolean
  ) {
    if (!this.cx) {
      return;
    }

    if (prevPos) {
      this.cx.beginPath();

      this.setCanvasStyle(isMouseDrawing);

      this.cx.moveTo(prevPos.x, prevPos.y);

      this.cx.lineTo(currentPos.x, currentPos.y);

      this.cx.stroke();
    }
  }

  private setCanvasStyle(isMouseDrawing: boolean) {
    let lineWidth;
    let strokeStyle;
    if (isMouseDrawing) {
      lineWidth = 1;
      strokeStyle = 'blue';
    } else {
      lineWidth = 3;
      strokeStyle = 'black';
    }
    this.cx.lineWidth = lineWidth;
    this.cx.strokeStyle = strokeStyle;
  }

  clearCanvas() {
    this.animationState = 'initial';
    this.movements = [];
    this.cx.clearRect(0, 0, this.rect.width, this.rect.height);
    curMovX = 0;
    curMovY = 0;
    lastMovX = -1;
    lastMovY = -1;
  }

  private getBoundary() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    return canvasEl.getBoundingClientRect();
  }

  onMouseButtonDown(event: MouseEvent): void {
    this.isMouseDown = event.buttons === 1;
    if (this.animationState === 'off'
      || this.animationState === 'initial') {
      this.animationState = 'record';
    } else if (this.animationState === 'on'
      || this.animationState === 'on2') {
      // this.movements.push(['off']);
    }
  }

  onMouseButtonUp(event: MouseEvent): void {
    this.isMouseDown = event.buttons === 1;
    this.animationState = 'on';
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.toState === 'on') {
      if (this.getMovementSize() > 0) {
        this.handleAnimationCycle(event);
      } else {
        this.returnToOff();
      }
    }
  }
  private handleAnimationCycle(event: AnimationEvent) {
    this.handleCanvasDrawingInAnimation(event);
    this.updateCurrentMovement();
    this.restartAnimationCycle();
  }

  private handleCanvasDrawingInAnimation(event: AnimationEvent) {
    if (event.fromState === 'on2') {
      let lastPos = null;
      if (lastMovX !== -1) {
        lastPos = { x: lastMovX, y: lastMovY };
      }
      this.drawOnCanvas(lastPos, { x: curMovX, y: curMovY }, false);
      lastMovX = curMovX;
      lastMovY = curMovY;
    }
  }

  private updateCurrentMovement() {
    const currentMovement = this.movements.shift();
    curMovX = currentMovement[0];
    curMovY = currentMovement[1];
  }

  private restartAnimationCycle() {
    this.animationState = 'on2';
    setTimeout(() => {
      this.animationState = 'on';
    }, 10);
  }

  // if (currentMovement instanceof String) {
  //   lastMovX = -1;
  //   lastMovY = -1;
  //   this.animationState = 'off';
  //   if (this.getMovementSize() > 0) {
  //     setTimeout(() => {
  //       this.animationState = 'on';
  //     }, 10);
  //   }
  // } else {

  private returnToOff() {
    lastMovX = -1;
    lastMovY = -1;
    this.animationState = 'off';
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isMouseDown && this.isInsideBoundary(event)) {
      const movX = event.pageX - this.rect.left - (followerWidth / 2);
      const movY = event.pageY - this.rect.top + (followerHeight / 2);

      this.movements.push([movX, movY]);
    }
  }

  isInsideBoundary(event: MouseEvent) {
    return event.pageX > this.rect.left &&
      event.pageX < this.rect.right &&
      event.pageY > this.rect.top &&
      event.pageY < this.rect.bottom;
  }

  getAnimationState() {
    return { value: this.animationState, params: { movX: curMovX, movY: curMovY } };
  }

  getMovementSize() {
    return this.movements.length;
  }

  toggleClearAtStart() {
    this.clearAtStart = !this.clearAtStart;
  }

}
