import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleTransitionComponent } from './components/simple-transition/simple-transition.component';
import { ExtendedTransitionComponent } from './components/extended-transition/extended-transition.component';
import { KeyframesComponent } from './components/keyframes/keyframes.component';
import { SequencesComponent } from './components/sequences/sequences.component';
import { CustomComponent } from './components/custom/custom.component';
import { DragndropComponent } from './components/custom/dragndrop/dragndrop.component';
import { DragnfollowComponent } from './components/custom/dragnfollow/dragnfollow.component';
import { ClicknfollowComponent } from './components/custom/clicknfollow/clicknfollow.component';
import { CanvasComponent } from './components/custom/canvas/canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleTransitionComponent,
    ExtendedTransitionComponent,
    KeyframesComponent,
    SequencesComponent,
    CustomComponent,
    DragndropComponent,
    DragnfollowComponent,
    ClicknfollowComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
