import { Component, OnInit } from '@angular/core';

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

  
  constructor() { 
    this.infoTab = true;
    this.feedsTab = false;
    this.mediaTab = false;
  }

  ngOnInit() {
    this.infoTab = true;
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

}
