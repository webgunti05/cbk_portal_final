import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private mobAppBg : String;
  private tabBg : String;
  private regPopup : boolean;
  private showMask2 : boolean;
  private tab1 : boolean;
  private tab2 : boolean;
  private tab3 : boolean;
  private tab4 : boolean;
  
  constructor() {
    this.mobAppBg = "assets/images/mobile_app2.png";
    this.tabBg = "assets/images/tab_bg.png";

    this.regPopup = false;
    this.showMask2 = false;

    this.tab1 = true;
    this.tab2 = false;
    this.tab3 = false;
    this.tab4 = false;
    
  }

  showRegPopup(){
    this.regPopup = true;
    this.showMask2 = true;
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

}
