import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private logoBg : String;
  private showPopup : boolean;
  private showMask : boolean;

  menuList : Array<any>;
  constructor(private menuSvc : MenuService, private routeSvc : Router) {
    this.logoBg = "assets/images/logo-trans.png";
    this.menuList = this.menuSvc.getMenuList();
    this.showPopup = false;
    this.showMask = false;


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
