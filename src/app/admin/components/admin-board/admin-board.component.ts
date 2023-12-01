import { Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { DeleteMemberAction, fetchMemberAction } from '../../state/admin.action';
import { MemberState } from '../../state/admin.state';
import { Observable } from 'rxjs';
import { Member} from '../../state/admin.models';
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

  p: number = 1;
  totalMember: any;
  searchTerm: string = '';

  constructor(private store: Store) {
    this.members$.subscribe((m) => {
      this.members = m;
      this.totalMember = m.length;
    });
  }

  isInputEmpty(): boolean {
    // Function to check if the input is empty
    // console.log(this.searchTerm);
    return this.searchTerm.trim() === '';
  }
  filterMembers(f:any) {
    // console.log(this.searchTerm);

    this.store.dispatch(new fetchMemberAction(f.value.firstname));
  }

  ngOnInit(): void {
    // this.store.dispatch(new DeleteMemberAction())
    // this.store.dispatch(new fetchMemberAction());
  }
}
