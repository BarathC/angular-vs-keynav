import { Injectable, Injector } from '@angular/core';
import faker from 'faker';
import {Subject, Observable} from 'rxjs';
export interface UserDetails {
  name:string;
  username: string;
  avatar: string;
  email: string;
  phone: string;
  address: Address;
  website:string;
  company: Company;
  
}
export interface Address {
  street:string;
  suite:string;
  city: string;
  zipcode:string;
}

export interface Company {
  name:string;
  bs:string;
}
@Injectable({
  providedIn: 'root'
})

export class FakeuserService {

  private oUserDetails:UserDetails[] = [];
  private oSelectedItem:UserDetails = null;
  private oSelectedItemChanged:Subject<void> = new Subject<void>();
  public obsSelectedItemChanged: Observable<void> = null;
  constructor(){
    this.obsSelectedItemChanged = this.oSelectedItemChanged.asObservable();
  }
  public fnGetItems():UserDetails[] {
    this.oUserDetails = Array.from({ length: 10 }, () => (
      faker.helpers.contextualCard()
    ));
    this.oSelectedItem = this.oUserDetails[0];
    return this.oUserDetails;
  }

  public fnPaginateUserDetails(): void {
    for( let i = 0; i<10; i++){
      this.oUserDetails.push(faker.helpers.contextualCard());
    }
  }

  public fnGetSelectedItem(): UserDetails {
    return this.oSelectedItem;
  }

  public fnSetSelectedItem(oItemIn: UserDetails): void {
    this.oSelectedItem = oItemIn;
    this.oSelectedItemChanged.next();

  }
}