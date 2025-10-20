// create-task.dto.ts
import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { TaskStatus } from "../../utils/Enum/task.enum";
import { ApiProperty } from "@nestjs/swagger";

enum OrderByOptions {
  ASC = "asc",
  DESC = "desc",
}

export class FindAllTaskDto {
  @ApiProperty({ enum: TaskStatus, required: false })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({ enum: TaskStatus, required: false })
  @IsOptional()
  @IsEnum(OrderByOptions)
  orderBy?: string;

  @ApiProperty({ required: false, default: false })
  onlyCreatedByMe?: string;
}
