
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  appName: string = "Chatapp";
  user: User = new User('','','','');
  returnUrl: string;
  loginAlert: string;
  loginError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private authService: AuthService) { }
  ngOnInit() {
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onLogin(): void {
    this.authService.login(this.user)
      .then((res) => {        
        if(res.json().error){
          this.loginError = true;
          this.loginAlert = res.json().message;            
        }else{
          this.router.navigate([this.returnUrl]);        
        }
      })
      .catch((err) => {
        this.loginError = true;
        this.loginAlert = err;
      });
  }
}
