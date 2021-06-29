import { Component, OnInit, ViewChild } from '@angular/core';
import { ILogin } from 'src/app/domain/ilogin';
import { AuthService } from 'src/app/service/authservice.service';
import { TokenStorageService } from 'src/app/service/tokenstorage.service';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/domain/iuser';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from 'src/app/service/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorStateMatcher } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
export  const patternMDP: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,12}$/;
export const patternEmail: RegExp = /^[^\W][a-zA-Z0-9\-\_\.]+[^\W]@[^\W][a-zA-Z0-9\-\_\.]+[^\W]\.[a-zA-Z]{2,6}$/;
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('framelogin') modalLogin: ModalDirective;
  @ViewChild('framesignup') modalSignUp: ModalDirective;
  matcher = new MyErrorStateMatcher();
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string;
  private loginInfo: ILogin;
  username='';
  password='';
  firstname='';
  lastname='';
  email='';
  profil:string;
  isAdmin=false;
  signUpForm:FormGroup;
  user: any;
  url : any;
  constructor(private fb:FormBuilder,private toastr: ToastrService,private authService: AuthService,
     private tokenStorage: TokenStorageService,  
        private spinnerService: NgxSpinnerService,
        private userService: UserService,
        private sanitizer: DomSanitizer,

      
     ) { }

  ngOnInit() {
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


    })
    this.createSignUpForm();
  }
  
  sanitize(){
    if(this.url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    } else {
      return "https://www.w3schools.com/howto/img_avatar.png";
    }
}
  createSignUpForm(){
    this.signUpForm = this.fb.group({
      'firstname':[null,Validators.compose([Validators.required,Validators.minLength(5)])],
      'username': [null,Validators.compose([Validators.required,Validators.minLength(5)])],
      'email':[null,Validators.pattern(patternEmail)],
       password:[null,Validators.compose([Validators.minLength(8),Validators.pattern(patternMDP)])],
       confirmPassword:[null]

    },
    {
      validator: this.MustMatch('password', 'confirmPassword')

    }
    )
  }
  signUp(){
    if(this.signUpForm.status=='INVALID'){
      console.log(this.signUpForm.value);
      this.toastr.error('You must fill all the fields')
      return ;

    }
    this.spinnerService.show();
    let val = this.signUpForm.value;
    let user= new IUser(val.firstname,val.firstname,val.username,val.email,val.password); 
    this.authService.signUp(user).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.token);
        this.profil = this.tokenStorage.getUsername();
        this.isLoggedIn = true;
        this.modalSignUp.hide();
      },
      error => {
        console.log(error);
        this.toastr.error("username or email already exist !");
        this.spinnerService.hide();

      },
      () => {
        this.spinnerService.hide();

      }
    )
    
  }
  attemptLogin(){
    this.loginInfo = new ILogin(this.username, this.password);
    this.spinnerService.show();
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.token);
       this.profil = this.tokenStorage.getUsername();
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        console.log(this.profil);
       // this.roles = this.tokenStorage.getAuthorities();
       // console.log("roled= "+this.roles);
       // this.reloadPage();
       this.modalLogin.hide();
      },
      error => {
        console.log(error);
        this.spinnerService.hide();
        this.toastr.error("Check Your Username or Password","Autnetification failed");
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      },
      () => {
        this.spinnerService.hide();
      }
    );
  }
  reloadPage() {
    window.location.reload();
  }
  signout(){
    
    this.tokenStorage.signOut();
    this.reloadPage();
  
    
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
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
  
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
  
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
