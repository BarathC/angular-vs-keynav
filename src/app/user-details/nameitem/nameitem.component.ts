import { Component, OnInit, Input } from '@angular/core';
import { FakeuserService, UserDetails } from '../../app-services/fake-user-service';

@Component({
  selector: 'app-nameitem',
  templateUrl: './nameitem.component.html',
  styleUrls: ['./nameitem.component.css']
})
export class NameitemComponent implements OnInit {
  @Input() oItem:any;
  public oSelectedItem: UserDetails;
  constructor(private oUserSrv: FakeuserService) { }

  ngOnInit() {
      this.oSelectedItem = this.oUserSrv.fnGetSelectedItem();
    this.oUserSrv.obsSelectedItemChanged.subscribe(()=>{
      this.oSelectedItem = this.oUserSrv.fnGetSelectedItem();
    })
  }

  fnClicked() {
    this.oUserSrv.fnSetSelectedItem(this.oItem);
  }

}