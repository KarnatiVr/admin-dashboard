import { Member } from './admin.models';

export class fetchMemberAction {
  static readonly type = '[Member] fetch members';
  constructor() {}
}

export class SearchMemberAction {
  static readonly type = '[Member] search members';
  constructor(public searchParams: String) {}
}

export class DeleteMemberAction {
  static readonly type = '[Member] delete member';
  constructor(public member: Member) {}
}

export class checkboxStatusChangedAction {
  static readonly type = '[Member] checkbox clicked';
  constructor(public member: Member) {}
}

export class DeleteBulkMemberAction {
  static readonly type = '[Member] delete clicked';
  constructor() {}
}
