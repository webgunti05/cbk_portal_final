import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private mobAppBg : String;
  private tabBg : String;
  constructor() {
    this.mobAppBg = "assets/images/mobile_app2.png";
    this.tabBg = "assets/images/tab_bg.png";
  }

  ngOnInit() {
  }

}
