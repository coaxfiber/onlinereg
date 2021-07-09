import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TermsComponent } from './../terms/terms.component';

import { GlobalService } from './../global.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  disabled = false
  private loggedIn: boolean;
  constructor(private global: GlobalService,public dialog: MatDialog,public dialogRef: MatDialogRef<LoginComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private authService: SocialAuthService) { 
    
  }

signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.loggedIn = (user != null);
      if (user!=null) {
       this.global.email = user.email
       //this.global.email = "cudiamatdeviebia@gmail.com"

       this.dialogRef.close({result:'ok'});
      }else{
        //this.global.swalAlert("Goolge Login Failed!",'Please Check your Internet Connectivity to proceed.','warning')
      }
    });
  }
  Cookies(){
    this.global.swalInfo('','<div class=\'no-overflow\'><p>1 cookie(<i>Session cookie</i>) is used on this site:</p><p>You must allow this cookie in your browser to provide continuity and to remain logged in when browsing the site. When you log out or close the browser, this cookie is destroyed (in your browser and on the server).</p><p>Note: Cookies are not enabled in incognito mode (Don\'t use incognito mode in your browser).</p></div> ', 'info')
  }
  closethis(){
       this.dialogRef.close({result:'ok'});
  }
  ngOnInit() {

  }

  terms(): void {
        const dialogRef = this.dialog.open(TermsComponent, {
          width: '600px', disableClose: false
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result=='ok') {
            this.disabled = true
          }
        });
      } 
}
