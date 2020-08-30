import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DetailComponent } from './user-details/detail/detail-component.component';
import { ListComponent } from './user-details/list/list.component';
import { NameitemComponent } from './user-details/nameitem/nameitem.component';
import { UserDetailComponent } from './user-details/user-detail/user-detail.component';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatRippleModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';

@NgModule({
  imports:      [ BrowserModule, FormsModule, VirtualScrollerModule, MatCardModule,MatToolbarModule, BrowserAnimationsModule, MatRippleModule, MatListModule ],
  declarations: [ AppComponent, DetailComponent, ListComponent, NameitemComponent, UserDetailComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
