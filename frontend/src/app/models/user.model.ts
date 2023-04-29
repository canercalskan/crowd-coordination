export interface UserModel {
    uid : string,
    key : string;
    name : string,
    surname : string,
    email : string,
    password : string,
    age : number,
    gender : string,
    province : string,
    county : string,
    role : string,
    gsm : string,
    verified : boolean
    //posts : PostModel[]
}