import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleTransitionComponent } from './components/simple-transition/simple-transition.component';
import { ExtendedTransitionComponent } from './components/extended-transition/extended-transition.component';
import { KeyframesComponent } from './components/keyframes/keyframes.component';
import { SequencesComponent } from './components/sequences/sequences.component';
import { CustomComponent } from './components/custom/custom.component';

export const routes: Routes = [
  { path: 'simpleTransition', component: SimpleTransitionComponent },
  { path: 'extendedTransition', component: ExtendedTransitionComponent },
  { path: 'keyFrames', component: KeyframesComponent },
  { path: 'sequences', component: SequencesComponent },
  { path: 'custom', component: CustomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
