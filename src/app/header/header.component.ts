import { Component, OnInit } from '@angular/core';
import {AuthService} from '../users/auth.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  logout(): void{
    let username = this.authService.user.username;
    this.authService.logout();
    swal.fire('Logit', `User ${username} is logout now!`, 'success');
    this.router.navigate(['/login']);
  }
}
