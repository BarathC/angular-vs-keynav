import { Component, VERSION } from '@angular/core';
import { FakeuserService } from './app-services/fake-user-service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  public oUserArr:any;
  
  constructor(private oUserSrv: FakeuserService){
    this.oUserArr = this.oUserSrv.fnGetItems();
  }
}
