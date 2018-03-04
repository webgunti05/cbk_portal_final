import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
    this.creatLoginForm;

  }


  creatLoginForm(){
    this.loginForm = this.frmBuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  onLoginSubmit(){
    const user = {
      username : this.loginForm.get('username').value,
      password : this.loginForm.get('password').value
    }

    this.Obsvc.login(user).subscribe(data =>{
      if(!data.success){
        this.message = data.message;
      } else{
        this.message = data.message;
       
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
