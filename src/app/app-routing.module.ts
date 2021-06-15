import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { RedirectComponent } from './redirect/redirect.component';
import { ShowTracksComponent } from './show-tracks/show-tracks.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: WelcomePageComponent,
  },

  //todo add a guard here
  {
    path: 'redirect_uri',
    component: RedirectComponent,
  },
  {
    path: 'dashboard/:user_id',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      {
        path: 'tracks/:id',
        component: ShowTracksComponent,
      },
    ],
  },

  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',

    component: WelcomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
