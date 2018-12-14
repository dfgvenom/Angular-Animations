import { NgModule } from '@angular/core';
import { MatButtonModule, MatSlideToggleModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimationBuilderComponent } from './components/animation-builder/animation-builder.component';
import { CanvasComponent } from './components/custom/canvas/canvas.component';
import { ClicknfollowComponent } from './components/custom/clicknfollow/clicknfollow.component';
import { CustomComponent } from './components/custom/custom.component';
import { DragndropComponent } from './components/custom/dragndrop/dragndrop.component';
import { DragnfollowComponent } from './components/custom/dragnfollow/dragnfollow.component';
import { ExtendedTransitionComponent } from './components/extended-transition/extended-transition.component';
import { GameComponent } from './components/game/game.component';
import { KeyframesComponent } from './components/keyframes/keyframes.component';
import { SequencesComponent } from './components/sequences/sequences.component';
import { SimpleTransitionComponent } from './components/simple-transition/simple-transition.component';
import { FormsModule } from '@angular/forms';


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
    CanvasComponent,
    AnimationBuilderComponent,
    GameComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
