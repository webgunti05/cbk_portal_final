import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';


import { Members } from '../models/memberregistration';
import { Preferences } from '../models/preferences';

import { RegisterService } from '../services/register.service';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  public formProfile: FormGroup;
  myPreferenceForm: FormGroup;

  private mobAppBg: String;
  private tabBg: String;
  private regPopup: boolean;
  private showMask2: boolean;
  private tab1: boolean;
  private tab2: boolean;
  private tab3: boolean;
  private tab4: boolean;
  members: Members;
  memberInterest: Members[];
  date: any;
  preferences: Preferences[];
  preferencesChild: Preferences[];
  preferenceParentId: any;
  preferenceId = [];
  preferenceParentIds: any[] = [""];
  settings = {};
  itemList = [];
  selectedItems = [];
  userId: any;
  email: any;
  imageUrl: any = "http://13.58.150.195:4300/";
  isSubmitted: boolean = false;
  isError: boolean = false;
  errorMessage: string;

  private sportstab: boolean;
  private moviestab: boolean;
  private politicstab: boolean;

  constructor(public fb: FormBuilder, public datepipe: DatePipe, private registerService: RegisterService, public router: Router) {
    //this.members = new any();

    this.mobAppBg = "assets/images/mobile_app2.png";
    this.tabBg = "assets/images/tab_bg.png";

    this.regPopup = false;
    this.showMask2 = false;

    this.tab1 = true;
    this.tab2 = false;
    this.tab3 = false;
    this.tab4 = false;

    this.sportstab = true;
    this.moviestab = false;
    this.politicstab = false;

    // this.userId = "5aa37697a943b22efa4cf6ea";
  }

  showPrefCategories(id, event) {
    let sptab = document.getElementById("prefSport");
    let smtab = document.getElementById("prefMovie");
    let spltab = document.getElementById("prefPolitic");

    switch (id) {

      case 'prefSport':
        this.sportstab = true;
        this.moviestab = false;
        this.politicstab = false;
        break;

      case 'prefMovie':
        this.sportstab = false;
        this.moviestab = true;
        this.politicstab = false;
        break;

      case 'prefPolitic':
        this.sportstab = false;
        this.moviestab = false;
        this.politicstab = true;
        break;
    }
  }

  showRegPopup() {
    this.regPopup = true;
    this.showMask2 = true;
  }

  closeRegiPop() {
    this.regPopup = false;
    this.showMask2 = false;
  }

  ngOnInit() {

    this.itemList = [
      { "id": 1, "itemName": "India" },
      { "id": 2, "itemName": "Singapore" },
      { "id": 3, "itemName": "Australia" },
      { "id": 4, "itemName": "Canada" },
      { "id": 5, "itemName": "South Korea" },
      { "id": 6, "itemName": "Brazil" }
    ];

    this.selectedItems = [
      { "id": 1, "itemName": "India" },
      { "id": 2, "itemName": "Singapore" },
      { "id": 3, "itemName": "Australia" },
      { "id": 4, "itemName": "Canada" }];
    this.settings = {
      text: "Select Countries",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: "myclass custom-class"
    };

    this.onProfileFormGroup();
    this.onGetPreferencesList();

    this.myPreferenceForm = this.fb.group({
      preferenceId: this.fb.array([])
    });

    //this.onPreferenceChildByParentId();
    //this.onGetMemberByEmail();
    //  this.ongetmemberbyid(this.userId);

  }

  //ongetmemberbyid(id: any) {
  // // id = "5aa37697a943b22efa4cf6ea";
  //  this.registerService.onGetMemberById(id)
  //    .subscribe(result => {
  //      this.members1 = result;
  //      console.log("memberbygetId:" + this.members1);

  //      if (this.members1.dateOfBirth == null && this.members1.dateOfBirth == "" && this.members1.dateOfBirth == undefined) {
  //        this.date = this.datepipe.transform(this.members1.dateOfBirth, 'yyyy-MM-dd');
  //        this.members1.dateOfBirth = this.date;
  //      }

  //      console.log("member:" + this.members1);
  //    });
  //  return this.members1;
  //}




  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }



  //getRegiTabs(id: string, event) {
  //  switch (id) {
  //    case 'prof':
  //      this.tab1 = true;
  //      this.tab2 = false;
  //      this.tab3 = false;
  //      this.tab4 = false;
  //      this.isError = false;
  //      event.target.classList.add('reg_active');
  //      break;

  //    case 'inter':
  //      this.tab2 = true;
  //      this.tab1 = false;
  //      this.tab3 = false;
  //      this.tab4 = false;
  //      this.isError = false;
  //      event.target.classList.add('reg_active');
  //      break;

  //    case 'pref':
  //      this.tab2 = false;
  //      this.tab1 = false;
  //      this.tab3 = true;
  //      this.tab4 = false;
  //      this.isError = false;
  //      event.target.classList.add('reg_active');
  //      break;

  //    case 'fin':
  //      this.tab2 = false;
  //      this.tab1 = false;
  //      this.tab3 = false;
  //      this.tab4 = true;
  //      this.isError = false;

  //      event.target.classList.add('reg_active');

  //      break;

  //    case 'defualt':
  //      this.tab1 = true;
  //      break;
  //  }
  //}



  onProfileRegister() {
    const user = {
      firstname: this.formProfile.get('firstname').value,
      lastname: this.formProfile.get('lastname').value,
      mobileNumber: this.formProfile.get('mobileNumber').value,
      dateOfBirth: this.formProfile.get('dateOfBirth').value,
      //address: this.formProfile.get('address').value,
      profession: this.formProfile.get('profession').value,
      email: this.formProfile.get('email').value,
      gender: this.formProfile.get('gender').value,
      location: this.formProfile.get('location').value,
      country: this.formProfile.get('country').value,
      password: this.formProfile.get('password').value,
      confirmPassword: this.formProfile.get('confirmPassword').value
    }
    this.email = user.email;
    this.isSubmitted = true;
    if (this.formProfile.valid) {
      this.registerService.onRegisterMember(user).subscribe(data => {
        console.log(data);

        this.userId = data.userdata._id;
        console.log("userId:" + this.userId);
      });
      this.isSubmitted = false;

      this.registerService.onComLog(user).subscribe(result => {
        console.log(result);
      });

      this.registerService.onCreateInfo(user).subscribe(result => {
        console.log(result);
      });

      //this.onGetMemberByEmail();
      this.tab1 = false;
      this.tab2 = true;
      this.tab3 = false;
      this.tab4 = false;
      //event.target.classList.add('reg_active');
      //event.target.classList.add('reg_active');
      var myBx = document.getElementById('inter');
      myBx.classList.add('reg_active');
    }

  }

  //onGetMemberByEmail() {
  //  this.email = "ty@gmail.com";
  //  this.registerService.onGetMemberByEmail(this.email).subscribe(data => {
  //    this.members = data;
  //    console.log("members" + data);
  //    //if (this.members.name == null && this.members.name == "" && this.members.name == undefined) {
  //    //  alert("working");

  //    //}
  //    if (this.members.dateOfBirth == null && this.members.dateOfBirth == "" && this.members.dateOfBirth == undefined) {
  //      this.members.dateOfBirth = this.datepipe.transform(this.members.dateOfBirth, 'yyyy-MM-dd');
  //    }

  //    console.log("membersWorks" + this.members);


  //  });
  //  //return this.members;
  //}

  onGetPreferencesList() {
    this.registerService.onGetPreferencesList().subscribe(data => {
      this.preferences = data;
      this.preferences = this.preferences.filter(p => p.parentPreferenceId == null);
      //this.preferenceParentIds = this.preferences;
      console.log(this.preferences);
    });
  }

  onPreferenceListByParentId(id: any) {
    //console.log(this.preferenceParentId);
    this.registerService.onGetPreferencesList().subscribe(data => {
      this.preferencesChild = data;
      this.preferencesChild = this.preferencesChild.filter(p => p.parentPreferenceId == id);
      //this.settings = this.preferencesChild[0];
      //this.selectedItems = this.preferencesChild[0];
      //console.log(this.preferencesChild);
    });
  }

  onPreferenceChildByParentId() {
    //console.log(this.preferenceId);
    let pids: any = [];
    pids.push(this.preferenceId);

    this.preferenceParentIds = pids;
    //this.preferenceParentIds.concat(this.preferenceParentIds);
    console.log(this.preferenceParentIds);
  }

  onChange(id: string, isChecked: boolean) {
    let pids: any = [];

    const emailFormArray = <FormArray>this.myPreferenceForm.controls.preferenceId;
    console.log("emailFormArray" + emailFormArray.controls)
    if (isChecked) {
      emailFormArray.push(new FormControl(id));
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == id)
      emailFormArray.removeAt(index);
    }

    for (let item of emailFormArray.controls) {
      pids.push(item.value);
    }
    this.preferenceParentIds = pids;
    console.log(this.preferenceParentIds)
  }

  onAddPreferences() {

    console.log(this.preferenceId);
    console.log("userId:" + this.userId);
    console.log(this.preferenceParentIds);
    //let preferences= [];
    //for (let item of this.preferenceParentIds) {
    //  preferences.push(item);
    //}
    //console.log(preferences);
    if (this.userId != undefined && this.preferenceParentIds.length > 1) {
      this.isError = false;
      this.registerService.onAddPreferences(this.userId, this.preferenceParentIds).subscribe(preferences => {
        console.log(preferences);
        //this.isError = false;
        if (preferences.message == "Preferences Saved Successfully") {
          this.tab1 = false;
          this.tab2 = false;
          this.tab3 = true;
          this.tab4 = false;

          var myBx2 = document.getElementById('pref');
          myBx2.classList.add('reg_active');

          this.onGetCelebritiesByPreferences();
        }
        else {
          this.isError = true;
          this.errorMessage = "Please select your Preferences";
        }

      });
    }
    else {
      this.isError = true;
      this.errorMessage = "Please select your Preferences";
    }




  }

  onAddIntrest() {
    this.tab1 = false;
    this.tab2 = false;
    this.tab3 = false;
    this.tab4 = true;
    var myBx3 = document.getElementById('fin');
    myBx3.classList.add('reg_active');
  }

  onGetCelebritiesByPreferences() {
    this.registerService.onGetCelebritiesByPreferences(this.userId).subscribe(data => {
      console.log(data);
      this.memberInterest = data;

      console.log("memberInterest:" + this.memberInterest);
    });
  }

  onFinish() {
    this.regPopup = false;
    this.showMask2 = false;
  }

  onProfileFormGroup() {
    this.formProfile = this.fb.group({
      //name: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      //address: ['', Validators.required],
      profession: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      //loginType: ['', Validators.required],
      country: ['', Validators.required],
      location: ['', Validators.required],
      password: password,
      confirmPassword: confirmPassword,
    });
  }



}
