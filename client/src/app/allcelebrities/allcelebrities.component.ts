import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ObservableService } from '../services/observable.service';

@Component({
  selector: 'allcelebrities',
  templateUrl: './allcelebrities.component.html',
  styleUrls: ['./allcelebrities.component.css']
})
export class AllcelebritiesComponent implements OnInit {

  imageUrl: any = "http://13.58.150.195:4300/";
  private allCelebs : Array<any>
  constructor(
    private routSvc: Router,
    private cbOvc: ObservableService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getAllCBKCelebrities();
  }

  getAllCBKCelebrities() {
    this.cbOvc.getAllCelebrities().subscribe(data => {
      this.allCelebs = data;
      console.log(data);
    });
  }

}
