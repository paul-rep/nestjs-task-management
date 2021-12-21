import { Body, Controller, Get, Post, Delete, Param, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/createTaskDto';
import { GetTasksFilterDto } from './dto/getTasksFilterDto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { TaskStatus } from './tasks.status-enum';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}


    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
       return this.tasksService.getTasks(filterDto);
    }

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    //    return Object.keys(filterDto).length > 0 ? this.tasksService.getFilteredTasks(filterDto) : this.tasksService.getAllTasks();
    // }

    @Get('/:id')
    getTaskById(@Param('id',ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id',ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id',ParseIntPipe) id: number, 
        @Body('status',TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
            return this.tasksService.updateTaskStatus(id, status);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
    @Body() createTaskDto: CreateTaskDto
    ) : Promise<Task> {
        return this.tasksService.createTask(createTaskDto)
    }
}
