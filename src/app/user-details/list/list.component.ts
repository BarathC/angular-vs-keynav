import { Component, OnInit, ViewChild,ViewChildren, QueryList  } from '@angular/core';
import { NameitemComponent } from '../nameitem/nameitem.component';
import { UserDetails, FakeuserService } from '../../app-services/fake-user-service';
import { IPageInfo, VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { ImUtClConstants } from '../constants';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  // #region variable

  @ViewChild(VirtualScrollerComponent, { static: false })
  private oVirtualScroll: VirtualScrollerComponent;

  //This variable holds the list of visible artifact item components
  @ViewChildren(NameitemComponent)
  private oListItems: QueryList<NameitemComponent>;

  public oUserDetailsArr: Array<UserDetails>;


  public oVisibleUserDetailsArr: Array<UserDetails>;

  private bGetNextBatch: boolean;

  private nCountKeyDown: number;

  // #endregion variable

  //#region Interface Implements

  constructor(private oUserDetailSrv: FakeuserService) {
  }

    public ngOnInit(): void {
    this.fnInitializeAndValidateInput();
    this.fnUpdateVerticalListData();
   
  }
  public ngAfterViewInit(): void {
    this.fnScrollToTheSelectedItem();
  }

  public ngOnDestroy(): void {
  }
  //#endregion Interface Implements

  //#region Methods

  public efnGetViewPortItems(oViewPortItemsArr: Array<UserDetails>): void {
    this.oVisibleUserDetailsArr = oViewPortItemsArr;
  }

  /**
   *This event gets triggered in the following cases
   *  - When there are no items in view port.
   *  - When scrollbar reaches the end of the list.
   */
  public efnGetNextBatch(oEvent: IPageInfo): void {
    if (oEvent.endIndex === this.oUserDetailsArr.length - 1) {
      this.oUserDetailSrv.fnPaginateUserDetails();
    }
  }


  /**
   * Function to handle key up event
    */
  public efnOnKeyUp(oEvent: KeyboardEvent): void {
    if (this.nCountKeyDown > 1) {
      this.nCountKeyDown = 0;
      return;
    }
    this.nCountKeyDown = 0;

    //Get Selected Item
    const oSelectedItem: UserDetails = this.oUserDetailSrv.fnGetSelectedItem();
    //Proceed if down or up arrow key is pressed
    if ((oEvent.key === ImUtClConstants.sUpArrowKey || oEvent.key === ImUtClConstants.sDownArrowKey) && !!oSelectedItem) {
      let nItemSelectorIndex: number = 0
      let bScroll: boolean = false;
      //Set item padding count to half of visible items
      let nPaddingItemCount: number = Math.round(this.oVisibleUserDetailsArr.length / ImUtClConstants.nItemListScrollPaddingFactor);
      //Get index of selected item in item id array
      let nIndexofItem: number = this.oUserDetailsArr.findIndex((oImDmItemId: UserDetails): boolean => (oImDmItemId.username === oSelectedItem.username));
      //Get index of item in visible item array
      let nIndexOfVisibleItem: number = this.oVisibleUserDetailsArr.findIndex((oImDmItemId: UserDetails): boolean => (oImDmItemId.username === oSelectedItem.username));
      if (nIndexOfVisibleItem === -1) {
        this.fnScrollToTheSelectedItem();
        return;
      }
      if (oEvent.key === ImUtClConstants.sUpArrowKey) {
        //Return if index is 0 (first item)
        if (nIndexofItem === 0)
          return;
        //Trigger scroll if we reach the top of visible item list
        if (nIndexOfVisibleItem === 0 || nIndexOfVisibleItem === 1) {
          bScroll = true;
        }
        nItemSelectorIndex = -1;
      }
      if (oEvent.key === ImUtClConstants.sDownArrowKey) {
        //Return if selected item is the last item
        if (nIndexofItem === this.oUserDetailsArr.length - 1)
          return;
        //Trigger scroll if we reach the bottom of visible item list
        if (nIndexOfVisibleItem === this.oVisibleUserDetailsArr.length - 1 || nIndexOfVisibleItem === this.oVisibleUserDetailsArr.length - 2) {
          bScroll = true;
        }
        nItemSelectorIndex = 1;
        nPaddingItemCount -= 2;
      }
      if (bScroll) {
        nIndexofItem -= nPaddingItemCount;
        nIndexofItem = nIndexofItem <= 0 ? 0 : nIndexofItem;
        //Scroll to the selected index
        this.oVirtualScroll.scrollToIndex(nIndexofItem, true, 0, 0);
      }
      //Now select the next item
      const oVisibleItemComponentList: NameitemComponent[] = this.oListItems.toArray();
      const oNextActiveItem: NameitemComponent = oVisibleItemComponentList[nIndexOfVisibleItem + nItemSelectorIndex];
      if (!!oNextActiveItem) {
        oNextActiveItem.fnClicked();
      }
    }
  }
  // Initialise public members and validate input
  private fnInitializeAndValidateInput(): void {
    this.oUserDetailsArr = new Array<UserDetails>();
    this.oVisibleUserDetailsArr = new Array<UserDetails>();
    this.bGetNextBatch = true;
    this.nCountKeyDown = 0;
  }

  //Function to update vertical  list data
  private fnUpdateVerticalListData(): void {
    //Get item array
    this.oUserDetailsArr = this.oUserDetailSrv.fnGetItems();
    if (this.oUserDetailsArr === null || this.oUserDetailsArr === undefined)
      this.oUserDetailsArr = new Array<UserDetails>();


  }



  // function to scroll to selected item
  private fnScrollToTheSelectedItem(): void {
    if (this.oUserDetailSrv === null || this.oUserDetailSrv === undefined || (typeof this.oUserDetailSrv !== 'object'))
      return;

    const oSelectedItem: UserDetails = this.oUserDetailSrv.fnGetSelectedItem();
    if (oSelectedItem === null || oSelectedItem === undefined)
      return;

    const sSelectedItemId: string = oSelectedItem.username;
    if (sSelectedItemId === null || sSelectedItemId === undefined)
      return;

    const nIndexInViewPortArr: number = this.oVisibleUserDetailsArr.findIndex((oImDmItemId: UserDetails): boolean => (oImDmItemId.username === sSelectedItemId));
    if (nIndexInViewPortArr === -1) {
      let nSelectedItemIndex: number = this.oUserDetailsArr.findIndex((oImDmItemId: UserDetails): boolean => (oImDmItemId.username === sSelectedItemId));
      if (nSelectedItemIndex === -1)
        return;

      if (nSelectedItemIndex > 1)
        nSelectedItemIndex -= 2;
      else
        nSelectedItemIndex = 0;
      this.oVirtualScroll.scrollToIndex(nSelectedItemIndex, true, 0, 0);
    }
  }

}