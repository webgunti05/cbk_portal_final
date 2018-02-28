import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private logbg : String;
  private loginFrm : boolean;
  private registerFrm : boolean;
  constructor(private routeSvc : Router) {
    this.logbg = "assets/images/login.png";
    this.registerFrm = false;
    this.loginFrm = true;
  }

  ngOnInit() {
  }

  showRegisterFrm($event){
    this.registerFrm = true;
    this.loginFrm = false;
  }

  showLoginFrm(){
    this.registerFrm = false;
    this.loginFrm = true;
  }

}
