import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  private email: any;
  private id: any;
  constructor(private routSvc: Router, public route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.email = params['email'];
      console.log(this.email);
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("id:" + this.id);
    });
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

}
