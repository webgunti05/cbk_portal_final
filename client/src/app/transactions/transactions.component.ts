import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { member } from '../models/member';
import { ObservableService } from '../services/observable.service';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  private email: any;
  private id: any;

  private infoTab : boolean;
  private feedsTab : boolean;
  private mediaTab : boolean;
  isClassVisible: false;
  private profile: member;
  transactions: Array<any>;

  imageUrl: any = "http://13.58.150.195:4300/";
  private name = localStorage.getItem('loginSessId');

  constructor(private routSvc: Router, private cbOvc: ObservableService, public route: ActivatedRoute) { }

  ngOnInit() {

    this.email = localStorage.getItem('loginSessId');
    console.log("seesion" + localStorage.getItem('loginSessId'));
    this.id = localStorage.getItem('memberId');

    this.ongetprofilebyemail(this.email);
    this.onGetTransactions();
  }

  profilePage() {
    //this.routSvc.navigateByUrl('/profile');
    this.routSvc.navigate(['/profile/']);
  }

  celebPage() {
    this.routSvc.navigate(['/celebrities/']);
  }

  transactionPage() {
    this.routSvc.navigate(['/transactions/']);
    this.onGetTransactions();
  }

  ongetprofilebyemail(email : any) {
    this.email = email;
    this.cbOvc.onGetProfileByEmail(email).subscribe(data => {
      this.profile = data;
      console.log(data);
     
    });
  }

  onGetTransactions() {
    this.id = "5a8cf8d2e253000670d1cfd9";
    this.cbOvc.onGetTransactions(this.id).subscribe(data => {
      this.transactions = data;
      console.log(data);
    });

  }

}
