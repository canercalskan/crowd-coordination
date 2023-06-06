import { TaskModel } from "./task.model";
import { UserModel } from "./user.model";

export interface GroupModel {
    groupId : string,
    groupName : string,
    members : UserModel[],
    role : string,
    manager : UserModel,
    tasks : TaskModel[],
    closedTasks : TaskModel[]
}