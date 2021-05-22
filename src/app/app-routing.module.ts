import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginGuard} from './guards/login.guard';
import {CallbackComponent} from './pages/callback/callback.component';

const routes: Routes = [
  {component: HomeComponent, path: '', canActivate: [LoginGuard]},
  {component: CallbackComponent, path: 'callback'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
