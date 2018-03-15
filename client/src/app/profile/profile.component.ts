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
  feedDetails: any[];
  errorMessage: string;
  celebrityRequest: any;

  
  constructor(private routSvc: Router, private cbOvc: ObservableService, public route: ActivatedRoute) { 
    this.infoTab = true;
    this.feedsTab = false;
    this.mediaTab = false;
  }

  ngOnInit() {


    this.email= localStorage.getItem('loginSessId');
    console.log("seesion" +localStorage.getItem('loginSessId'));

 

    this.infoTab = true;
    this.ongetprofilebyemail(this.email);
    this.getMemberByEmail(this.email);

    console.log("session" + this.name);

    this.createCelebRequest();
  }

  showProfileTabs(id : string, event){
    var infotab = document.getElementById('infoT');
    var feedtab = document.getElementById('feedT');
    var mediatab = document.getElementById('mediaT');

    switch(id){
      case 'infoT' :
      this.infoTab = true;
      this.feedsTab = false;
      this.mediaTab = false;
      event.target.classList.add('ptab_active');
      feedtab.classList.remove('ptab_active');
      mediatab.classList.remove('ptab_active');
      
      break;

      case 'feedT' :
      this.infoTab = false;
      this.feedsTab = true;
      this.mediaTab = false;
      event.target.classList.add('ptab_active');
      infotab.classList.remove('ptab_active');
      mediatab.classList.remove('ptab_active');
      this.onGetContentByID();
      break;

      case 'mediaT' :
      this.infoTab = false;
      this.feedsTab = false;
      this.mediaTab = true;
      event.target.classList.add('ptab_active');
      infotab.classList.remove('ptab_active');
      feedtab.classList.remove('ptab_active');
      this.onGetContentByID();
      break;

      case 'defualt' :
      this.infoTab = true;
      break;
    }  
}





  profilePage() {
    //this.routSvc.navigateByUrl('/profile');
    this.routSvc.navigate(['/profile/']);
  }

  celebPage() {
    this.routSvc.navigate(['/celebrities/']);
  }

  transactionPage() {
    //this.routSvc.navigateByUrl('/transactions');
    this.routSvc.navigate(['/transactions/']);
  }

ongetprofilebyemail(email : any) {
  this.email = email;
  this.cbOvc.onGetProfileByEmail(email).subscribe(data => {
    this.profile = data;
    console.log(data);
  });
}

getMemberByEmail(email: any) {
  email = this.email;
  this.cbOvc.getMemberByEmail(this.email).subscribe(x => {
    console.log("testingid" + x._id);
    this.id = x._id;
    localStorage.setItem('memberId', x._id);
    console.log("final" + this.id);
  });
  return this.id;
}

onGetContentByID() {

  this.cbOvc.onGetContentByID(this.id).subscribe(result => {
    this.feedDetails = result;
    console.log(this.feedDetails);
    
  }, error => this.errorMessage = <any>error);
  console.log(this.errorMessage);
  return this.feedDetails;
}

createCelebRequest(id: any) {
  alert(id);
    this.cbOvc.sendCelebRequest(this.id).subscribe(result => {
      this.celebrityRequest = result;
      console.log(this.celebrityRequest);
      
    });
  }

}
