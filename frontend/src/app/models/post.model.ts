import { CommentModel } from "./comment.model";

export class PostModel {
    key! : string;
    authorUid! : string;
    authorName! : string;
    authorImage!: string;
    authorRole! : string;
    date! : string;
    images! : FileList;
    content! : string;
    status! : string;
    urgency! : boolean;
    comments : CommentModel[] = []
    imageURL! : string;
    likes : number = 0;
    constructor(cartImage : FileList) {
        this.images = cartImage;
    }
    commentsClicked : boolean = false;
}