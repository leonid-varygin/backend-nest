import { EntityRepository, Repository } from "typeorm";
import { Task } from "./tasks/task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

}