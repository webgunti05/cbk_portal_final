import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor(private routSvc : Router) { }

  ngOnInit() {
  }

  profilePage(){
    this.routSvc.navigateByUrl('/profile');
  }

}
