import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Member, MemberStateModel } from './admin.models';

import { DeleteMemberAction, fetchMemberAction } from './admin.action';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@State<MemberStateModel>({
  name: 'members',
  defaults: {
    members: [],
  },
})
@Injectable()
export class MemberState {
  private apiUrl =
    'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
  members: Member[] = [];

  constructor(private store: Store, private http: HttpClient) {}

  @Selector()
  static getMembers(state: MemberStateModel) {
    console.log(state.members);
    return state.members;
  }

  @Action(DeleteMemberAction)
  deleteMember(
    ctx: StateContext<MemberStateModel>,
    action: DeleteMemberAction
  ) {
    const deleteId = action.id;
    const state = ctx.getState();

    const updatedMembers = this.members.filter((item) => item.id != deleteId);
    ctx.patchState({
      members: updatedMembers,
    });
  }

  @Action(fetchMemberAction)
  fetchMember(
    ctx: StateContext<MemberStateModel>,
    action: fetchMemberAction
  ){
    const param=action.searchParam
    const state = ctx.getState();
    this.http.get<Member[]>(this.apiUrl)
    .subscribe((data)=>
    {
      if(!param){
        ctx.patchState({
          members: data,
        });
      }
      else{
        data = data.filter(i=>i.role === param)
        ctx.patchState({
          members:data
        })
      }
    })
  }
}

