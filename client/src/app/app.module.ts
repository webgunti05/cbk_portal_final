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
//import { AuthGuard } from './guards/auth.guard';
//import { NotAuthGuard } from './guards/notAuth.guard';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';


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
      { path: '', redirectTo: 'home', pathMatch: 'full', },
      { path: 'home', component: HomeComponent},
      //{ path : 'register', component : RegisterComponent},
      //{ path : 'login', component : LoginComponent},
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
      { path: 'aboutus', component: AboutusComponent, canActivate: [AuthGuard]},
      { path: 'faqs', component: FaqsComponent, canActivate: [AuthGuard]},
      { path: 'contactus', component: ContactusComponent, canActivate: [AuthGuard]},
      { path: 'termsandconditions', component: TermsComponent, canActivate: [AuthGuard]},
      { path: 'privacypolicy', component: PrivacyComponent, canActivate: [AuthGuard]},
      { path: 'help', component: HelpComponent, canActivate: [AuthGuard]},
      { path: 'communityguidlines', component: CommunityComponent, canActivate: [AuthGuard]},
      { path: 'mainpage', component: MainpageComponent, canActivate: [AuthGuard]},
      { path: 'celebrities', component: CelebritiesComponent, canActivate: [AuthGuard]},
      { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
      { path: 'allcelebrities', component: AllcelebritiesComponent, canActivate: [AuthGuard] },
      { path: 'credits', component: CreditsComponent, canActivate: [AuthGuard] }
    ])
  ],
  providers: [
    MenuService,
    ObservableService,
    RegisterService,
    AuthGuard, NotAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
