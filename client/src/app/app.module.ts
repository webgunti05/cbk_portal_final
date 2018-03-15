import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { ProfileComponent } from './profile/profile.component';
import { MenuService } from './services/menu.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ContactusComponent } from './contactus/contactus.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CommunityComponent } from './community/community.component';
import { HelpComponent } from './help/help.component';
import { CelebritiesComponent } from './celebrities/celebrities.component';
import { CreditsComponent } from './credits/credits.component';
import { ObservableService } from './services/observable.service';
import { MainpageComponent } from './mainpage/mainpage.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { RegisterService } from './services/register.service';
import { AllcelebritiesComponent } from './allcelebrities/allcelebrities.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    ProfileComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    AboutusComponent,
    FaqsComponent,
    ContactusComponent,
    TermsComponent,
    PrivacyComponent,
    CommunityComponent,
    HelpComponent,
    CelebritiesComponent,
    CreditsComponent,
    MainpageComponent,
    TransactionsComponent,
    AllcelebritiesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path : '', redirectTo : 'home', pathMatch: 'full' },
      { path : 'home', component : HomeComponent},
      { path : 'register', component : RegisterComponent},
      { path : 'login', component : LoginComponent},
      { path : 'profile', component : ProfileComponent},
      { path : 'aboutus', component : AboutusComponent},
      { path : 'faqs', component : FaqsComponent},
      { path : 'contactus', component : ContactusComponent},
      { path : 'termsandconditions', component : TermsComponent},
      { path : 'privacypolicy', component : PrivacyComponent},
      { path : 'help', component : HelpComponent},
      { path : 'communityguidlines', component : CommunityComponent},
      { path : 'mainpage', component : MainpageComponent},
      { path : 'celebrities', component : CelebritiesComponent},
      { path: 'transactions', component: TransactionsComponent },
      { path: 'allcelebrities', component: AllcelebritiesComponent }
    ])
  ],
  providers: [
    MenuService,
    ObservableService,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
