import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleTransitionComponent } from './components/simple-transition/simple-transition.component';
import { ExtendedTransitionComponent } from './components/extended-transition/extended-transition.component';
import { KeyframesComponent } from './components/keyframes/keyframes.component';
import { SequencesComponent } from './components/sequences/sequences.component';
import { CustomComponent } from './components/custom/custom.component';
import { AnimationBuilderComponent } from './components/animation-builder/animation-builder.component';
import { GameComponent } from './components/game/game.component';

export const routes: Routes = [
  { path: 'simpleTransition', component: SimpleTransitionComponent, data: {animation: 'simpleTransition'} },
  { path: 'extendedTransition', component: ExtendedTransitionComponent, data: {animation: 'extendedTransition'} },
  { path: 'keyFrames', component: KeyframesComponent, data: {animation: 'keyFrames'} },
  { path: 'sequences', component: SequencesComponent, data: {animation: 'sequences'} },
  { path: 'custom', component: CustomComponent, data: {animation: 'custom'} },
  { path: 'animationBuilder', component: AnimationBuilderComponent, data: {animation: 'animationBuilder'} },
  { path: 'game', component: GameComponent, data: {animation: 'game'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
