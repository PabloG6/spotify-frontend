import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { RedirectComponent } from './redirect/redirect.component';
import { ShowTracksComponent } from './show-tracks/show-tracks.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  
  {
    path: "login",
    component: WelcomePageComponent
  },

  //todo add a guard here
  {
    path: "redirect_uri",
    component: RedirectComponent
  },
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "tracks/:id",
    component: ShowTracksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "error",
    component: ErrorComponent,
  },
  {
    path: "**",
   
    component: WelcomePageComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }