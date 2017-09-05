import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('dropdownMenuState', [
      state('inactive', style({
        height: '0'
      })),
      state('active',   style({
        height: '110px'
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ],
})
export class AppComponent {
  dropdownMenu = {
    state: 'inactive'
  };

  constructor(
    private router: Router
  ) {

  }

  home() {
    this.router.navigate(['/home']);
    this.dropdownMenu.state = 'inactive';
  }

  tag() {
    this.router.navigate(['/tag']);
    this.dropdownMenu.state = 'inactive';
  }

  about() {
    this.router.navigate(['/about']);
    this.dropdownMenu.state = 'inactive';
  }

  toggleDropdownMenu(e) {
    this.dropdownMenu.state === 'active' ? this.dropdownMenu.state = 'inactive' : this.dropdownMenu.state = 'active';
    e.stopPropagation();
  }
}
