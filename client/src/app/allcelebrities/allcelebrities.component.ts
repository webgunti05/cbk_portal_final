import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ObservableService } from '../services/observable.service';
import { member } from '../models/member';

@Component({
  selector: 'allcelebrities',
  templateUrl: './allcelebrities.component.html',
  styleUrls: ['./allcelebrities.component.css']
})
export class AllcelebritiesComponent implements OnInit {

  imageUrl: any = "http://13.58.150.195:4300/";
  private allCelebs: Array<any>
  private cbProfile: boolean;
  private cbprofmask: boolean;
  celebrity: member;

  constructor(
    private routSvc: Router,
    private cbOvc: ObservableService,
    public route: ActivatedRoute
  ) {
    this.cbProfile = false;
    this.cbprofmask = false;
  }

  ngOnInit() {
    this.getAllCBKCelebrities();
  }

  getAllCBKCelebrities() {
    this.cbOvc.getAllCelebrities().subscribe(data => {
      this.allCelebs = data;
      console.log(data);
    });
  }

  openCbProfile(id) {
    //alert(id);
    this.cbOvc.getMemberByID(id).subscribe(data => {
      this.celebrity = data;
    });  
    this.cbProfile = true;
    this.cbprofmask = true;
    return this.celebrity;
  }

  closeCbProfile() {
    this.cbProfile = false;
    this.cbprofmask = false;
  }

}
