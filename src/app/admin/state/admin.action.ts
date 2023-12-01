import { Member} from "./admin.models";

export class fetchMemberAction{
    static readonly type = "[Member] fetch members"
    constructor( public searchParam?:String){}
}

export class DeleteMemberAction{
    static readonly type = "[Member] delete member"
    constructor( public id:String ){}
}

