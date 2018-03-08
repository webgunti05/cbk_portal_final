import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

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
