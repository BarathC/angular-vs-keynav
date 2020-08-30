import { Component, VERSION } from '@angular/core';
import { FakeuserService,UserDetails } from './app-services/fake-user-service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  public oUserArr:UserDetails[] = [];
  
  constructor(private oUserSrv: FakeuserService){
   
  }

  public ngOnInit() {
    this.oUserArr = this.oUserSrv.fnGetItems();
  }
}
