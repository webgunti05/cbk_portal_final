import { Component, OnInit } from '@angular/core';
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
  loginForm: FormGroup;
  message;
  messageClass;

  menuList : Array<any>;
  constructor(private menuSvc : MenuService,
     private routeSvc : Router,
     private Obsvc : ObservableService,
     private frmBuilder : FormBuilder
    ) {
    this.logoBg = "assets/images/logo-trans.png";
    this.menuList = this.menuSvc.getMenuList();
    this.showPopup = false;
    this.showMask = false;
    this.creatLoginForm();

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
      if(!data.success){
        this.message = data.message;
        this.messageClass = "alert alert-danger"
      } else{
        this.message = data.message;
        this.messageClass = "alert alert-success"
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

  

  ngOnInit() {
  }

}
