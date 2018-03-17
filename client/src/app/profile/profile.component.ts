import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { member } from '../models/member';
import { ObservableService } from '../services/observable.service';
import { RegisterService } from '../services/register.service';
import { FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';

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

  private profile: member;
  private id: any;
  imageUrl: any = "http://13.58.150.195:4300/";
  private name = localStorage.getItem('loginSessId');
  feedDetails: any[];
  errorMessage: string;
  celebrityRequest: any;
  message;
  messageClass;
  private pform: boolean;
  email: any;
  user: {};
  isValid: boolean = false;
  successMessage: string;
  @ViewChild('fileInput') fileInput: ElementRef;
  images: any;
  oldImage: any;
  

  public profileForm: FormGroup;

  
  constructor(
    private routSvc: Router,
    private cbOvc: ObservableService,
    public route: ActivatedRoute,
    private registerService: RegisterService,
    public fb: FormBuilder,
    private ele: ElementRef)
  { 
    this.infoTab = true;
    this.feedsTab = false;
    this.mediaTab = false;
    this.pform = false;

    
  }

  ngOnInit() {
    this.email= localStorage.getItem('loginSessId');
    console.log("seesion" +localStorage.getItem('loginSessId'));

    this.infoTab = true;
    this.ongetprofilebyemail(this.email);
    this.getMemberByEmail(this.email);

    console.log("session" + this.name);

    //this.openPform(this.id);
    this.onProfileFormGroup();

    //this.createCelebRequest(this.id);
  }

  openPform(id) {
   // alert(id);
    this.pform = true;
    let frmwrap = document.getElementById('pf');
    frmwrap.classList.add('show_updpform');

    //const user = {
    //  firstname: this.profileForm.get('firstname').value,
    //  lastname: this.profileForm.get('lastname').value,
    //  mobileNumber: this.profileForm.get('mobileNumber').value,
    //  dateOfBirth: this.profileForm.get('dateOfBirth').value,
    //  address: this.profileForm.get('address').value,
    //  profession: this.profileForm.get('profession').value,
    //  email: this.profileForm.get('email').value,
    //  gender: this.profileForm.get('gender').value,
    //  location: this.profileForm.get('location').value,
    //  country: this.profileForm.get('country').value,
    //  aboutMe: this.profileForm.get('about').value
    //}
    //this.email = user.email;
    //this.cbOvc.getMemberByID(id).subscribe(data => {
    //  console.log(data);
    //  this.user = data;

    //});


  }

  onProfileFormGroup() {
    this.profileForm = this.fb.group({
      
      //firstname: ['', Validators.required],
      //lastname: ['', Validators.required],
      //mobileNumber: ['', Validators.required],
      //dateOfBirth: ['', Validators.required],
      //aboutMe: ['', Validators.required],
      //email: ['', Validators.required],
      //gender: ['', Validators.required],
      //country: ['', Validators.required],
      //location: ['', Validators.required],
        'profile.name': ['', [Validators.required]],
        'profile.lastName': ['', [Validators.required]],
        'profile.mobileNumber': ['', [Validators.required]],
        'profile.email': ['', [Validators.required]],
        'profile.location': ['', [Validators.required]],
        'profile.aboutMe': ['', [Validators.required]],
        'profile.gender': ['', [Validators.required]],
        'profile.dateOfBirth': ['', [Validators.required]],
        
      });
  }


  closePform() {
    this.pform = false;
    let frmwrap = document.getElementById('pf');
    frmwrap.classList.remove('show_updpform');
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
    this.oldImage = this.profile.avtar_imgPath;
  });
  return this.profile;
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

// createCelebRequest(id: any) {
  
//     this.cbOvc.sendCelebRequest(this.id).subscribe(result => {
//       this.celebrityRequest = result;
//       console.log(this.celebrityRequest);
      
//     });
//   }

createCelebRequest(id) {

    this.cbOvc.sendCelebRequest(id).subscribe(result => {
     //this.celebrityRequest = result;
      console.log(this.celebrityRequest);

      
      if (result.message == "Request Sent Successfully") {

      // this.message = result.message;
        //this.messageClass = "alert alert-success";
      } else {

        //this.message = result.message;
        //this.messageClass = "alert alert-danger";
      }
      
    });
}

  onUpdateProfile(profile) {
    if (this.profileForm.valid) {
      this.isValid = false;
      this.pform = false;
      this.cbOvc.onUpdateMember(profile).subscribe(result => {
        console.log(result);
      });
    } else {
      this.isValid = true;
      this.successMessage = "please Enter User Details";
      this.pform = true;
    }
    
  }

  readURL(event) {
    let files = this.ele.nativeElement.querySelector('#selectFile').files;
    if (files.length > 0 && files.count != 0 && files != null) {

      let req = files;
      let formData = new FormData();
      let file = files[0];
      this.images = file.name;

      formData.append('selectFile', file, file.name);
      formData.append('avtars', file, file.id);
      console.log(formData);
      console.log(files);
      this.cbOvc.onfileupload(this.id, formData).subscribe(res => console.log(res));
    }
    if (this.images != null && this.images != "") {
      this.profile.avtar_originalname = this.images.toString();

      this.profile.avtar_imgPath = "avtars/" + this.images.toString();
    }
    else {
      this.profile.avtar_imgPath = this.oldImage;
    }
  }

}
