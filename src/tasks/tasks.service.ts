import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.status-enum';
import { GetTasksFilterDto } from './dto/getTasksFilterDto';
import { CreateTaskDto } from './dto/createTaskDto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './tasks.entity';


@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository){}
  
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }
  

    async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id)
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    async deleteTask(id: number): Promise<Task> {
        const task = await this.getTaskById(id);
        return task.remove();
    }
    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
      return this.taskRepository.createTask(createTaskDto);
    }
}
