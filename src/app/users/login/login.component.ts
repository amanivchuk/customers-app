import { Component, OnInit } from '@angular/core';
import {User} from '../User';
import swal from 'sweetalert2';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = "Please Sign In!";
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user = new User();
  }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      swal.fire('Login', `Welcome again ${this.authService.user.username}!`, 'info');
      this.router.navigate(['/customers']);
    }
  }

  login(): void{
    if(this.user.username == null || this.user.password == null){
      swal.fire('Error login', 'Username or password is empty!', 'error');
      return;
    }

    this.authService.login(this.user).subscribe(response => {

      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);

      let user = this.authService.user;

      this.router.navigate(['/customers']);
      swal.fire('Login', `Welcome ${user.username}!`, 'success');
    }, error => {
      if(error.status == 400){
        swal.fire('Error Login', `User incorrect!`, 'error');
      }
    });
  }

}
