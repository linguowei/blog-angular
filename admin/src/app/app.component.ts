import { MsgService } from './services/msg/msg.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '(document:click)': 'documentClick($event)',
  }
})
export class AppComponent implements DoCheck {
  isShowAccount = false;
  userName = '';

  constructor(
    private http: HttpClient,
    private msg: MsgService,
    private router: Router
  ) {
  }

  ngDoCheck() {
    this.userName = localStorage.getItem('userName');
  }

  personalCenter(e) {
    this.isShowAccount = !this.isShowAccount;
    e.stopPropagation();
  }

  documentClick(e) {
    this.isShowAccount = false;
    e.stopPropagation();
  }
  personalCenterContent(e) {
    e.stopPropagation();
  }

  logout() {
    this.http.get('/api/admin/logout').subscribe((res) => {
      if (res['code'] === 200) {
        this.msg.info(res['msg']);
        this.isShowAccount = false;
        setTimeout(() => {
          this.router.navigate(['/admin/index']);
        }, 2000);
      }
    });
  }
}
