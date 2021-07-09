import { Component, OnInit, Input } from '@angular/core';
import { TokenStorageService } from 'src/app/core/services/tokenstorage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  isAdmin=false;
  isLoggedIn=false;
  @Input()
  profil:string;
  roles: string;

  constructor(private toastr: ToastrService,private tokenStorage: TokenStorageService, 
    private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.profil=this.tokenStorage.getUsername();
      this.isAdmin = this.tokenStorage.isAdmin();
      // this.roles = this.tokenStorage.getAuthorities();
      // if(this.tokenStorage.getAuthorities().includes('ROLE_ADMIN'))
      // this.isAdmin=true;
    }
  }
 
  signout(){
  
    this.tokenStorage.signOut();
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  
    
  }
  navigate(route: any){
    this.router.navigate([route]);
  }
}
