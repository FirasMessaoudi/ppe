import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/api_services/authservice.service';
import { TokenStorageService } from 'src/app/core/services/tokenstorage.service';
import { UserService } from 'src/app/core/api_services/user.service';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  url: any;
  formData : FormData = new FormData;
  file: File;
  constructor(private authService: AuthService,
  private toaster: ToastrService,  
  private sanitizer: DomSanitizer,
  private spinner: NgxSpinnerService,
  private fb: FormBuilder, private userService: UserService,
   private tokenStorage: TokenStorageService, private router: Router) { }
  user: any;
  userForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.userForm = this.fb.group(
      {
        firstname:[''],
        username:[''],
        email:[''],
        password:[''],
        confirmPassword:[''],
        oldPassword:['']
      }
    )
  
    this.userService.getUser(this.tokenStorage.getUsername()).subscribe(
      res => this.user = res,
      err => console.log(err),
      () => {
        this.userForm = this.fb.group(
          {
            firstname:[this.user.firstname,Validators.compose([Validators.required,Validators.minLength(5)])],
            username:[this.user.username,Validators.compose([Validators.required,Validators.minLength(6)])],
            email:[this.user.email,Validators.pattern(patternEmail)],
            oldPassword:[null,Validators.required],
            password:[null,Validators.compose([Validators.minLength(8),Validators.pattern(patternMDP)])],
            confirmPassword:[null]
          },
          {
            validator: this.MustMatch('password', 'confirmPassword')
    
          }
        )
        console.log(this.user);
        if(this.user.picture!=null && this.user.picture!=""){
          this.downloadFile(this.user.picture);
        }
      }
    )
  }
  sanitize(){
    if(this.url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    } else {
      return "https://www.w3schools.com/howto/img_avatar.png";
    }
}
  onSelectFile(event) {
    this.file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: Event) => { // called once readAsDataURL is completed
      this.url = reader.result;
      }
    }
  }
  update(){
    for (const i in this.userForm.controls) {  // Upadte form values: make it synchrone.
      this.userForm.controls[i].markAsDirty();
      this.userForm.controls[i].updateValueAndValidity();

    }
    if (this.userForm.invalid) {
      return null;
    }
    this.spinner.show();
    let response: any;
    if(this.file){
  this.formData.delete('file');
   this.formData.append('file',this.file);
   let path : string;
   this.userService.pushFileToStorage(this.formData).subscribe(
     res => path = res.body,
     err =>{console.log(err);
      this.spinner.hide();

    },
     () => {
       console.log(path);
      this.user.firstname = this.userForm.get('firstname').value;
      this.user.newUsername= this.userForm.get('username').value;
      this.user.newEmail = this.userForm.get('email').value;
      this.user.password = this.userForm.get('password').value;
      this.user.oldPassword = this.userForm.get('oldPassword').value;
      this.user.picture =path;
      this.userService.update(this.user).subscribe(
        res => response = res,
        err =>{console.log(err);
          this.spinner.hide();
    
        },
        () => {
          this.spinner.hide();
          if(response.status==226){
             this.toaster.error(response.message);
          } else {
            this.toaster.success("Your informations were updated successfully");
            this.tokenStorage.signOut();
            this.router.navigate(['/']);

          }
        }
      );
     }
   );
    }else {
      this.user.firstname = this.userForm.get('firstname').value;
      this.user.newUsername= this.userForm.get('username').value;
      this.user.newEmail = this.userForm.get('email').value;
      this.user.password = this.userForm.get('password').value;
      this.user.oldPassword = this.userForm.get('oldPassword').value;
      this.userService.update(this.user).subscribe(
        res => response = res,
        err =>{console.log(err);
          this.spinner.hide();
    
        },
        () => {
          this.spinner.hide();
          if(response.status==226){
             this.toaster.error(response.message);
          } else {
            this.toaster.success("Your informations were updated successfully");
            this.tokenStorage.signOut();
            this.router.navigate(['/']);

          }
        }
      );

    }
  }
  reset() {
    this.userForm.reset();
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
