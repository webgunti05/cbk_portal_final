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

  imageUrl: any = "http://13.58.150.195:4300/";
  private name = localStorage.getItem('loginSessId');

  constructor(private routSvc: Router, private cbOvc: ObservableService, public route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.email = params['email'];
      console.log(this.email);
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("id:" + this.id);
    });

    this.ongetprofilebyemail(this.email);
  }

  profilePage() {
    //this.routSvc.navigateByUrl('/profile');
    this.routSvc.navigate(['/profile/', { email: this.email, id: this.id }]);
  }

  celebPage() {
    this.routSvc.navigate(['/celebrities/', { email: this.email, id: this.id }]);
  }

  transactionPage() {
    this.routSvc.navigate(['/transactions/', { email: this.email, id: this.id }]);
  }

  ongetprofilebyemail(email : any) {
    this.email = email;
    this.cbOvc.onGetProfileByEmail(email).subscribe(data => {
      this.profile = data;
      console.log(data);
    });
  
  
  }

}
