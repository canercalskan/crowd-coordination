import { UserModel } from "./user.model";

export interface GroupModel {
    members : UserModel[],
    role : string,
    manager : UserModel
}