import {Component, OnInit, ViewChild} from '@angular/core';
import {ILogin} from 'src/app/core/domain/ilogin';
import {AuthService} from 'src/app/core/api_services/authservice.service';
import {TokenStorageService} from 'src/app/core/services/tokenstorage.service';
import {ToastrService} from 'ngx-toastr';
import {IUser} from 'src/app/core/domain/iuser';
import {FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialogRef} from '@angular/material/dialog';

export const patternMDP: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,12}$/;
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
  matcher = new MyErrorStateMatcher();
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string;
  private loginInfo: ILogin;
  username = '';
  password = '';
  firstname = '';
  lastname = '';
  email = '';
  profil: string;
  isAdmin = false;
  signUpForm: FormGroup;
  isSignUp = false;
  isLogin = true;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private spinnerService: NgxSpinnerService,
              public dialogRef: MatDialogRef<LoginComponent>,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.spinnerService.hide();
  }

  ngOnInit() {
    this.tokenStorage.currentStatus.subscribe(status => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.profil = this.tokenStorage.getUsername();

      }


    });
    this.createSignUpForm();
  }


  createSignUpForm() {
    this.signUpForm = this.fb.group({
        'firstname': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
        'username': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
        'email': [null, Validators.pattern(patternEmail)],
        password: [null, Validators.compose([Validators.minLength(8), Validators.pattern(patternMDP)])],
        confirmPassword: [null]

      },
      {
        validator: this.MustMatch('password', 'confirmPassword')

      }
    );
  }

  signUp() {
    if (this.signUpForm.status == 'INVALID') {
      console.log(this.signUpForm.value);
      this.toastr.error('You must fill all the fields');
      return;

    }
    this.spinnerService.show();
    const val = this.signUpForm.value;
    const user = new IUser(val.firstname, val.firstname, val.username, val.email, val.password);
    this.authService.signUp(user).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.token);
        this.profil = this.tokenStorage.getUsername();
        this.isLoggedIn = true;
        this.onNoClick();
      },
      error => {
        console.log(error);
        this.toastr.error('username or email already exist !');
        this.spinnerService.hide();

      },
      () => {
        this.spinnerService.hide();

      }
    );

  }

  attemptLogin() {
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
        this.onNoClick();
      },
      error => {
        console.log(error);
        this.spinnerService.hide();
        this.toastr.error('Check Your Username or Password', 'Autnetification failed');
        // this.errorMessage = error.error.message;
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

  signout() {
    this.tokenStorage.signOut();
    this.reloadPage();
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
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
