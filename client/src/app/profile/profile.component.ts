import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { member } from '../models/member';
import { ObservableService } from '../services/observable.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private infoTab : boolean;
  private feedsTab : boolean;
  private mediaTab : boolean;
  isClassVisible: false;
  private email : any;
  private profile: member;
  private id: any;
  imageUrl: any = "http://13.58.150.195:4300/";
  private name = localStorage.getItem('loginSessId');

  
  constructor(private routSvc: Router, private cbOvc: ObservableService, public route: ActivatedRoute) { 
    this.infoTab = true;
    this.feedsTab = false;
    this.mediaTab = false;
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.email = params['email'];
      console.log(this.email);
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("id:" + this.id);
    });

    this.infoTab = true;
    this.ongetprofilebyemail(this.email);

    console.log("session" + this.name);
  }

  showProfileTabs(id : string, event){
    switch(id){
      case 'infoT' :
      this.infoTab = true;
      this.feedsTab = false;
      this.mediaTab = false;
      event.target.classList.add('ptab_active');
      break;

      case 'feedT' :
      this.infoTab = false;
      this.feedsTab = true;
      this.mediaTab = false;
      event.target.classList.add('ptab_active');
      break;

      case 'mediaT' :
      this.infoTab = false;
      this.feedsTab = false;
      this.mediaTab = true;
      event.target.classList.add('ptab_active');
      break;

      case 'defualt' :
      this.infoTab = true;
      break;
    }  
}


//profilePage(){
//  this.routSvc.navigateByUrl('/profile');
//}

//celebPage(){
//  this.routSvc.navigateByUrl('/celebrities');
//}

//transactionPage(){
//  this.routSvc.navigateByUrl('/transactions');
//}


  profilePage() {
    //this.routSvc.navigateByUrl('/profile');
    this.routSvc.navigate(['/profile/', { email: this.email, id: this.id }]);
  }

  celebPage() {
    this.routSvc.navigate(['/celebrities/', { email: this.email, id: this.id }]);
  }

  transactionPage() {
    this.routSvc.navigateByUrl('/transactions');
  }

ongetprofilebyemail(email : any) {
  this.email = email;
  this.cbOvc.onGetProfileByEmail(email).subscribe(data => {
    this.profile = data;
    console.log(data);
  });


}

}
