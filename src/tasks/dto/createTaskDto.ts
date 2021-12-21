import { IsNotEmpty } from "class-validator";
import { TaskStatus } from "../tasks.status-enum";

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;
    status: TaskStatus;
}