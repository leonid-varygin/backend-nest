import { EntityRepository, Repository } from 'typeorm';
import { User } from './auth/user.entity';
import { CreateTaskDto } from './tasks/dto/create-task.dto';
import { GetTasksFilterDto } from './tasks/dto/get-tasks-filter.dto';
import { TaskStatus } from './tasks/task-status.enum';
import { Task } from './tasks/task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user
    await task.save();

    return task;
  }
}
