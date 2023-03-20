import { CommentModel } from "./comment.model";
import { UserModel } from "./user.model";

export interface PostModel {
    key : string,
    author : UserModel,
    images : FileList;
    content : string,
    status : string,
    urgency : string,
    comments : CommentModel, 
}