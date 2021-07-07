import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(user => this.user = user);
  }

  signOut(): void {
    this.authService.signOut();
  }

}
