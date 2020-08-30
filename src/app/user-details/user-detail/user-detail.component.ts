import { Component, OnInit } from '@angular/core';
import { UserDetails, FakeuserService } from '../../app-services/fake-user-service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public oSelectedItem: UserDetails;
  constructor( private oUserSrv: FakeuserService) { }

  ngOnInit() {
    this.oSelectedItem = this.oUserSrv.fnGetSelectedItem();
    this.oUserSrv.obsSelectedItemChanged.subscribe(()=>{
      this.oSelectedItem = this.oUserSrv.fnGetSelectedItem();
    })
  }

}