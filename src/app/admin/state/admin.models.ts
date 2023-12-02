export interface Member {
  id: String;
  name: String;
  email: String;
  role: String;
  isSelected?: boolean;
  isEdit?: boolean;
}
export interface filteredMember {
  id: String;
  name: String;
  email: String;
  role: String;
  isSelected?: boolean;
  isEdit?: boolean;
}

export interface MemberStateModel {
  members: Member[];
  filteredMembers: Member[];
}
