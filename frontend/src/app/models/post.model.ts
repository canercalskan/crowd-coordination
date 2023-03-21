import { CommentModel } from "./comment.model";

export class PostModel {
    key! : string
    authorUid! : string
    authorName! : string
    date! : string
    images! : FileList;
    content! : string
    status! : string
    urgency! : string
    comments! : CommentModel 
    imageURL! : string
    constructor(cartImage : FileList) {
        this.images = cartImage;
    }
}