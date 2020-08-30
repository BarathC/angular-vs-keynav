import { Injectable, Injector } from '@angular/core';
import faker from 'faker';
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
  public fnGetItems():UserDetails[] {
    this.oUserDetails = Array.from({ length: 10 }, () => (
      faker.helpers.contextualCard()
    ));
    return this.oUserDetails;
  }

  public fnPaginateUserDetails(): void {
    for( let i = 0; i<10; i++){
      this.oUserDetails.push(faker.helpers.contextualCard());
    }
  }
}