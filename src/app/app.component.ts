import { Component, VERSION } from '@angular/core';
import { FakeuserService,UserDetails } from './app-services/fake-user-service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  constructor(private oUserSrv: FakeuserService){
   
  }

  public ngOnInit() {
  }
}
