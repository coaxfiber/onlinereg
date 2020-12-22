import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GlobalService } from './global.service';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { InfoComponent } from './info/info.component';
import { InputComponent } from './main/input/input.component';
import { HttpModule } from '@angular/http';
import { TermsComponent } from './terms/terms.component';


import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { UpdateRegComponent } from './update-reg/update-reg.component';
import { ReportcardComponent } from './reportcard/reportcard.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    InfoComponent,
    InputComponent,
    TermsComponent,
    UpdateRegComponent,
    ReportcardComponent,
  ],
  entryComponents: [
    InputComponent,
    MainComponent,
    InfoComponent,
    TermsComponent,
    UpdateRegComponent,
    ReportcardComponent,
   ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    
    SocialLoginModule
  ],
  providers: [GlobalService,
  {
    provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '100400588236-rhpnguqginvpo91n12q1e201qe62ce1d.apps.googleusercontent.com'
            ),
          }
        ],
      } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
