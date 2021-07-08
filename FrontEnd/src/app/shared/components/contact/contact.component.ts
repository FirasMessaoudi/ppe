import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatDialogRef } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/core/api_services/contact.service';
import { Contact } from 'src/app/core/domain/contact';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm :FormGroup ;
  matcher = new MyErrorStateMatcher();
  constructor(private toaster:ToastrService,
    private  contactService:ContactService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<ContactComponent>,
     private fb:FormBuilder,) { }

  ngOnInit() {
    this.createFormContact();

  }
  createFormContact(){
    this.contactForm = this.fb.group({
      'subject':[null,Validators.required],
      'message':[null,Validators.required]
    }

    )
  }
  sendMessage(){
    if(this.contactForm.invalid){
      return ;
    }
    let contact: Contact = this.contactForm.value;
    contact.dateMessage = new Date();

    this.spinner.show();
    this.contactService.addMessage(contact).subscribe(
      res =>
      {console.log(res);
      this.createFormContact();
      this.toaster.success('Your message has been successfully sent');
      this.spinner.hide();
      },
      err =>{console.log(err.error) 
       this.toaster.error('oops something went wrong');
       this.spinner.hide();
      },
      ()=> {
        this.contactForm.reset();
        this.onNoClick();
        this.spinner.hide();
      }
    )
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
