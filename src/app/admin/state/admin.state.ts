import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  Store,
  createSelector,
} from '@ngxs/store';
import { Member, MemberStateModel } from './admin.models';

import {
  DeleteBulkMemberAction,
  DeleteMemberAction,
  SearchMemberAction,
  checkboxStatusChangedAction,
  fetchMemberAction,
} from './admin.action';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@State<MemberStateModel>({
  name: 'members',
  defaults: {
    members: [],
    filteredMembers: [],
  },
})
@Injectable()
export class MemberState {
  private apiUrl =
    'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
  // members: Member[] = [];

  constructor(private store: Store, private http: HttpClient) {}

  @Selector()
  static getMembers(state: MemberStateModel) {
    console.log(state.members);
    return state.members;
  }

  @Selector()
  static getSearchMembers(state: MemberStateModel) {
    // console.log(state.filteredMembers);
    return state.filteredMembers;
  }

  @Action(DeleteMemberAction)
  deleteMember(
    ctx: StateContext<MemberStateModel>,
    action: DeleteMemberAction
  ) {
    const member = action?.member;
    const state = ctx.getState();
    const updatedMembers = state.members.filter((item) => item.id != member.id);
    const updatedFilteredMembers = state.filteredMembers.filter(
      (item) => item.id != member.id
    );
    // console.log(updatedMembers)
    // console.log(updatedFilteredMembers)
    ctx.patchState({
      ...state,
      members: updatedMembers,
      filteredMembers: updatedFilteredMembers,
    });
  }

  @Action(fetchMemberAction)
  fetchMember(ctx: StateContext<MemberStateModel>, action: fetchMemberAction) {
    const state = ctx.getState();
    console.log('fetch Member Action');

    this.http.get<Member[]>(this.apiUrl).subscribe((data) => {
      ctx.patchState({
        ...state,
        members: data,
      });
    });
  }

  @Action(SearchMemberAction)
  searchMember(
    ctx: StateContext<MemberStateModel>,
    action: SearchMemberAction
  ) {
    const state = ctx.getState();
    const searchParam = action.searchParams;
    console.log(searchParam);
    const filteredMembers = state.members.filter((item) => {
      return item.role === searchParam;
    });
    // console.log(filteredMembers);
    ctx.patchState({
      ...state,
      filteredMembers: filteredMembers,
    });
    // console.log(state.filteredMembers);
  }

  @Action(checkboxStatusChangedAction)
  changeCheckboxStatus(
    ctx: StateContext<MemberStateModel>,
    action: checkboxStatusChangedAction
  ) {
    const member = action.member;
    const state = ctx.getState();

    state.members.forEach((item) => {
      if (item.id == member.id) {
        member.isSelected = !member.isSelected;
      }
    });

    ctx.patchState({
      members: [...state.members],
    });
    // console.log(state.members);
    // console.log(state.members.length)
  }

  @Action(DeleteBulkMemberAction)
  DeleteBulkMember(ctx: StateContext<MemberStateModel>) {
    const state = ctx.getState();
    const updatedMembers = state.members.filter(
      (item) => item.isSelected != true
    );
    const updatedFilteredMembers = state.filteredMembers.filter(
      (item) => item.isSelected != true
    );
    // console.log(updatedMembers);
    ctx.patchState({
      ...state,
      members: updatedMembers,
      filteredMembers: updatedFilteredMembers,
    });
    // console.log(state.members)
  }
}
