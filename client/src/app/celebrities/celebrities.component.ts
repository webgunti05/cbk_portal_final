import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'celebrities',
  templateUrl: './celebrities.component.html',
  styleUrls: ['./celebrities.component.css']
})
export class CelebritiesComponent implements OnInit {

  constructor(private routSvc : Router) { }

  ngOnInit() {
  }

  profilePage(){
    this.routSvc.navigateByUrl('/profile');
  }
  
  celebPage(){
    this.routSvc.navigateByUrl('/celebrities');
  }
  
  transactionPage(){
    this.routSvc.navigateByUrl('/transactions');
  }

}
