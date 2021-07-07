import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/core/domain/icategory';
import { FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/core/services/tokenstorage.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from "src/app/core/services/sharedservice.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {
  categories: ICategory[];
  keyword='';
  isLoggedIn=false;
  isAdmin=false;
  roles:string;
  tvshows="TV Shows";
  Movies="Movies";
  Series="Series"
  Animes="Animes";
  lang:string;


  modalFormSubscriptionName = new FormControl('', Validators.required);
modalFormSubscriptionEmail = new FormControl('', Validators.email);
  dir: any;
  constructor(public router: Router,private storageService: StorageService,  private translateService: TranslateService, private tokenStorage: TokenStorageService) {
    

  }

  ngOnInit() {
    
   
    this.lang = this.storageService.read('language');
    this.dir= this.lang=='ar'? 'rtl': 'ltr';
    console.log(this.lang);

    this.tokenStorage.currentStatus.subscribe(status => {
      this.isLoggedIn = status;



    });
    this.storageService.langObs.subscribe(
      res=>{
        if(res!=null){
          console.log(res);
          
        this.dir= res=='ar'? 'rtl': 'ltr';
        console.log(this.dir);
        }
        
      }
    )
  }
  changeLanguage(event){
    console.log("language= "+event);
    this.storageService.save('language', event);
    this.translateService.use(event);
   
  }
  goToSearch(){
    if(this.keyword==''){
      this.router.navigate([''])
    } else {
    this.router.navigate(['query/searchbykeyword',this.keyword])
    }
  }
  navigateMovie(){
    this.router.navigate(['query/all','Movies'])
  }
  navigateSerie(){
    this.router.navigate(['query/all','Series'])
  }
  navigateUpcoming(){
    this.router.navigate(['query/upcomingmovies'])
  }
  navigateTop(){
    this.router.navigate(['query/top-rated'])
  }
}
