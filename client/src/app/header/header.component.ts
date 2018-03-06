import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ObservableService } from '../services/observable.service';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private logoBg : String;
  private showPopup : boolean;
  private showMask : boolean;
  private showMyMenu : boolean;
  private regPopup : boolean;
  private showMask2 : boolean;
  private tab1 : boolean;
  private tab2 : boolean;
  private tab3 : boolean;
  private tab4 : boolean;

  loginForm: FormGroup;
  message;
  messageClass;
  user:any;

  private navIsFixed : boolean;
  private logoFixed : boolean;
  private loginFixed : boolean;
  private menuFixed : boolean;

  menuList : Array<any>;
  constructor(private menuSvc : MenuService,
     private routeSvc : Router,
     private Obsvc : ObservableService,
     private frmBuilder : FormBuilder,
     @Inject(DOCUMENT) private document: Document
    ) {
    this.logoBg = "assets/images/logo-trans.png";
    this.menuList = this.menuSvc.getMenuList();
    this.showPopup = false;
    this.showMask = false;
    this.creatLoginForm();
    this.user = {};
    this.regPopup = false;
    this.showMask2 = false;

    this.tab1 = true;
    this.tab2 = false;
    this.tab3 = false;
    this.tab4 = false;

    this.navIsFixed = false;
    this.logoFixed = false;
    this.loginFixed = false;
    this.menuFixed = false;

  }


  creatLoginForm(){
    this.loginForm = this.frmBuilder.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  onLoginSubmit(){
    const user = {
      email : this.loginForm.get('email').value,
      password : this.loginForm.get('password').value
    }
   
    this.Obsvc.login(user).subscribe(data =>{
     console.log(data);
      if(data.message == "login sucessfully"){
        this.message = data.message;
        this.messageClass = "alert alert-success";
        this.routeSvc.navigateByUrl('/profile');
        this.showPopup = false;
        this.showMask = false;
        this.showMyMenu = true;
        
      } else{
        this.message = data.message;
        this.messageClass = "alert alert-danger";
        this.showMyMenu = false;
        
        
      }
    });

  }

 

  ShowMyPopup(){
    this.showPopup = true;
    this.showMask = true;
  }

  closePopup(){
    this.showPopup = false;
    this.showMask = false;
  }

  
  showRegPopup(){
    this.regPopup = true;
    this.showMask2 = true;
    this.showPopup = false;
    this.showMask = false;
  }

  closeRegiPop(){
    this.regPopup = false;
    this.showMask2 = false;
  }

  ngOnInit() {
   
  }

  getRegiTabs(id : string, event){
    switch(id){
      case 'prof' :
      this.tab1 = true;
      this.tab2 = false;
      this.tab3 = false;
      this.tab4 = false;
      event.target.classList.add('reg_active');
      break;

      case 'inter' :
      this.tab2 = true;
      this.tab1 = false;
      this.tab3 = false;
      this.tab4 = false;
      event.target.classList.add('reg_active');
      break;

      case 'pref' :
      this.tab2 = false;
      this.tab1 = false;
      this.tab3 = true;
      this.tab4 = false;
      event.target.classList.add('reg_active');
      break;

      case 'fin' :
      this.tab2 = false;
      this.tab1 = false;
      this.tab3 = false;
      this.tab4 = true;
      event.target.classList.add('reg_active');
      break;

      case 'defualt' :
      this.tab1 = true;
      break;
    }  
}

@HostListener("window:scroll", [])
onWindowScroll() {
  let number = this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
  if(number > 100){
    this.navIsFixed = true;
    this.logoFixed = true;
    this.loginFixed = true;
    this.menuFixed = true;
  }
  else if(this.navIsFixed && number < 10){
    this.navIsFixed = false;
    this.logoFixed = false;
    this.loginFixed = false;
    this.menuFixed = false;
  }
}


}
