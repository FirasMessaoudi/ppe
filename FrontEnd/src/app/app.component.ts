import { Component, HostListener, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './core/services/sharedservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor (public router: Router, private storageService: StorageService, public translateService: TranslateService) {
    if (!this.lang) {
    this.translateService.setDefaultLang('en');
    } else {
      this.translateService.use(this.lang);
    }

  }
  template = ` <img src="https://www.knoll.com/images/cylindo-spinner-512v2.gif" width="100%" height="100%" />`;
  title = 'Movies Box';
  lang: string = this.storageService.read('language');
  ngOnInit(): void {
    console.log(this.lang);

    if (!this.lang) {
      this.storageService.save('language', 'en');
  }
  }
  scrollTop() {
    window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
}
@HostListener('window:scroll', ['$event']) scrollHandler(event) {
  const number = window.scrollY;
  const el = document.getElementById('btn-returnToTop');
  if (number >= 500) {
      el.className = 'show';

  } else {
      el.className = 'hide';
  }
}
}
