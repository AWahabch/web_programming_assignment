import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
/* Auth */
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';

/* Index */
import { HomeComponent } from './components/index/home/home.component';

/* IsAuthenService */
import { EnsureAuthenticatedService } from './services/ensure-authenticated.service';

@NgModule({
    imports: [
    RouterModule.forRoot([
         { path: '', component: HomeComponent, canActivate: [EnsureAuthenticatedService]},         
         { path: 'login', component: LoginComponent },
         { path: 'logout', component: LogoutComponent }         
    ])
  ],
  exports:[RouterModule]
 })
export class AppRoutingModule {}
