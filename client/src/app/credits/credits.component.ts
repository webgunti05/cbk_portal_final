import { Component, OnInit } from '@angular/core';
import { ObservableService } from '../services/observable.service';
import { Router, ActivatedRoute} from '@angular/router';
import { member } from '../models/member';

@Component({
  selector: 'credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  isClassVisible: false;
  private email : any;
  private profile: member;
  private id: any;
  imageUrl: any = "http://13.58.150.195:4300/";
  private name = localStorage.getItem('loginSessId');
  feedDetails: any[];
  errorMessage: string;
  celebrityRequest: any;

  constructor(
    private routSvc: Router,
    private cbOvc: ObservableService,
    public route: ActivatedRoute) 
    { }

  ngOnInit() {
    this.email= localStorage.getItem('loginSessId');
    console.log("seesion" +localStorage.getItem('loginSessId'));
    this.id = localStorage.getItem('memberId');
    this.getCreditById(this.id);

  }

  getCreditById(id : any){
    return this.cbOvc.getMemberByID(this.id).subscribe(result => {
      this.profile = result;
      console.log(this.profile);
      
    });
  }

}
