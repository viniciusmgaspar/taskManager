// create-task.dto.ts
import { IsNotEmpty, IsOptional, IsEnum, IsDateString } from "class-validator";
import { TaskStatus } from "../../utils/Enum/task.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
