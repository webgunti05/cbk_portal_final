import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

  private menuList : Array<any>;
  constructor() { 
    this.menuList = ["home", "register", "login"];
  }

  getMenuList(){
    return this.menuList;
  }

}
