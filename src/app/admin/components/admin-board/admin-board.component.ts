import { Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  DeleteBulkMemberAction,
  DeleteMemberAction,
  SearchMemberAction,
  checkboxStatusChangedAction,
  fetchMemberAction,
} from '../../state/admin.action';
import { MemberState } from '../../state/admin.state';
import { Observable } from 'rxjs';
import { Member } from '../../state/admin.models';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss'],
})
export class AdminBoardComponent implements OnInit {
  @ViewChild('f') myForm!: NgForm;

  @Select(MemberState.getMembers)
  members$!: Observable<Member[]>;
  members: Member[] = [];

  @Select(MemberState.getSearchMembers)
  filteredMembers$!: Observable<Member[]>;
  filteredMembers: Member[] = [];

  p: number = 1;
  totalMember: any;
  searchTerm: string = '';
  totalFilteredMembers: any;
  itemsPerPage: number = 10;
  currentPageItems: number = 10;
  pageItems: Member[] = [];
  topCheckBoxSelected: boolean = false;
  startIndex: number = 0;

  name: String = '';
  email: String = '';
  role: String = '';

  constructor(private store: Store) {
    this.members$.subscribe((m) => {
      this.members = m;
      this.totalMember = m.length;
    });
    console.log(this.members);
    this.filteredMembers$.subscribe((m) => {
      this.filteredMembers = m;
    });
  }

  filterMembers(f: any) {
    // console.log(this.searchTerm);
    this.store.dispatch(new SearchMemberAction(f.value.firstname));
  }

  checkboxClicked(member: Member) {
    // this.topCheckBoxSelected=this.allChecked()
    this.store.dispatch(new checkboxStatusChangedAction(member));
    // console.log(member)
  }

  calculateCurrentPageItems() {
    // console.log("fm",this.filteredMembers)
    // console.log('m', this.members);
    // console.log(this.p)
    if (this.filteredMembers.length > 0) {
      if (this.p <= this.filteredMembers.length / this.itemsPerPage) {
        this.currentPageItems = 10;
      } else {
        this.currentPageItems = this.filteredMembers.length % this.itemsPerPage;
      }
      this.startIndex = (this.p - 1) * this.itemsPerPage;
      // console.log(this.startIndex, this.currentPageItems);
      // console.log(this.filteredMembers);
      this.pageItems = this.filteredMembers.slice(
        this.startIndex,
        this.startIndex + this.currentPageItems
      );
    } else if (this.members.length > 0) {
      if (this.p <= this.members.length / this.itemsPerPage) {
        this.currentPageItems = 10;
      } else {
        this.currentPageItems = this.members.length % this.itemsPerPage;
      }
      this.startIndex = (this.p - 1) * this.itemsPerPage;

      this.pageItems = this.members.slice(
        this.startIndex,
        this.startIndex + this.currentPageItems
      );
    }
  }
  onSelectAll(ev: any) {
    this.calculateCurrentPageItems();
    console.log(this.allChecked());
    this.pageItems.forEach((item) => {
      if (item.isSelected != this.topCheckBoxSelected) {
        this.store.dispatch(new checkboxStatusChangedAction(item));
      }
    });
  }

  deleteButtonClicked(member: Member) {
    console.log(this.topCheckBoxSelected);
    // if (member.isSelected == true) {
    //   this.store.dispatch(new DeleteMemberAction(member));
    // }
    this.store.dispatch(new DeleteMemberAction(member));
  }

  bulkDeleteClicked() {
    this.pageItems.forEach((item) =>
      this.store.dispatch(new DeleteMemberAction(item))
    );
    // this.store.dispatch(new DeleteBulkMemberAction());
  }

  onPageChange($event: any) {
    // console.log($event)
    this.p = $event;
    this.calculateCurrentPageItems();
    // console.log('page changed',this.pageItems);
    // this.topCheckBoxSelected = this.allChecked();
  }

  allChecked() {
    this.calculateCurrentPageItems();
    // this.topCheckBoxSelected=false
    // console.log(this.pageItems);
    // console.log(this.pageItems.every((item) => item.isSelected));
    return this.pageItems.every((item) => item.isSelected);
  }

  onEdit(member: Member) {
    member.isEdit = true;
  }
  onSaved(member: Member) {
    alert('saved');
    member.isEdit = false;
    console.log(this.members);
  }
  ngOnInit(): void {
    // this.store.dispatch(new DeleteMemberAction())
    this.store.dispatch(new fetchMemberAction());
    this.calculateCurrentPageItems();
    this.allChecked();
  }
}
