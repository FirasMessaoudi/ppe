import { Component, OnInit } from '@angular/core';
import { StorageService } from "src/app/core/services/sharedservice.service";
import { TranslateService } from '@ngx-translate/core';
import { MatSlideToggleChange, MatSelectChange, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contact } from 'src/app/core/domain/contact';
import { ContactService } from 'src/app/core/api_services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { ContactComponent } from '../contact/contact.component';
import { TokenStorageService } from 'src/app/core/services/tokenstorage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  languages = [
    { value: 'en', viewValue: 'English' },
    { value: 'fr', viewValue: 'Français' },
    { value: 'ar', viewValue: 'العربية' }
  ];
  lang: string;
  adult: string = this.storageService.read('adult');
  isLoggedIn: any;

  constructor(
    private storageService: StorageService,
    private tokenStorage: TokenStorageService,
    private translateService: TranslateService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.lang = this.storageService.read('language');
    this.tokenStorage.currentStatus.subscribe(
      res =>{
        this.isLoggedIn= res;
      }
    )
    if (!this.adult) {
      this.storageService.save('adult', false);
    }
  }

  languageChange(event: MatSelectChange) {
    this.storageService.save('language', event.value);
    this.storageService.lang.next(event.value);
    this.translateService.use(event.value);
  }

  themeChange(event: MatSelectChange) {
    this.storageService.save('theme', event.value);
    this.storageService.theme.next(event.value);
  }
  adultChange(event: MatSlideToggleChange) {
    if (event.checked === true) {
      this.storageService.save('adult', true);
    } else {
      this.storageService.save('adult', false);
    }
  }
 openContact(){
   if(this.isLoggedIn){
  const dialogRef = this.dialog.open(ContactComponent, {
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
else {
this.toastr.warning("You must log in before you could send your request")
}
 }
}
