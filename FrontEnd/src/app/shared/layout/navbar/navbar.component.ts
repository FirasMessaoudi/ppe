import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/core/domain/icategory';
import { FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/core/services/tokenstorage.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from "src/app/core/services/sharedservice.service";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../components/login/login.component';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/core/api_services/user.service';

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
  profil: string;
  url: any;
  user: any;
  constructor(public router: Router,private storageService: StorageService,  
    private translateService: TranslateService, 
    private sanitizer: DomSanitizer,private userService: UserService,
    private tokenStorage: TokenStorageService, public dialog: MatDialog) {
    

  }

  ngOnInit() {
    
   
    this.lang = this.storageService.read('language');
    this.dir= this.lang=='ar'? 'rtl': 'ltr';
    console.log(this.lang);

    this.tokenStorage.currentStatus.subscribe(status => {
      this.isLoggedIn = status;
      if(this.isLoggedIn){
        this.profil = this.tokenStorage.getUsername();
        this.userService.getUser(this.profil).subscribe(
          res => this.user = res,
          err => console.log(err),
          () =>{
            console.log(this.user);
            
          if(this.user){
            if(this.user.picture){
            this.downloadFile(this.user.picture);
            }
          }
          }
 
        )
      }



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
  openLogin(){
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      autoFocus: false,
      // maxHeight: '90vh',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  sanitize(){
    if(this.url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    } else {
      return "https://www.w3schools.com/howto/img_avatar.png";
    }
}
downloadFile($event) {
  let file;
  let blob;
  let path: string = $event;
  let type;
  console.log(path)
  let ext = path.substr(path.lastIndexOf('.') + 1);
  console.log(ext);
  if (ext.toLowerCase() === 'pdf')
    type = 'application/pdf';
  if (ext.toLowerCase() === 'png')
    type = 'image/png';
  if (ext.toLowerCase() === 'jpg' || ext === 'jpeg')
    type = 'image/jpeg';
  if (ext.toLowerCase() === 'gif')
    type = 'image/gif';
  this.userService.getFile($event, type).subscribe(
    (result) => {

      blob = result;

    },
    (error) => {console.log(error);
    },
    () => {
      file = new Blob([blob], {type: type});
      this.url = window.URL.createObjectURL(file);

    }
  )

}
}
