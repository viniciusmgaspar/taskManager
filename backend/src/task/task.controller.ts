import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskService } from "./task.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { FindAllTaskDto } from "./dto/findAll0task.dto";

@ApiBearerAuth("jwt")
@Controller("tasks")
@UseGuards(AuthGuard("jwt"))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Req() req, @Body() dto: CreateTaskDto) {
    return this.taskService.create(req.user.userId, dto);
  }

  @Get()
  async findAll(@Req() req, @Query() filter: FindAllTaskDto) {
    return this.taskService.findAll(req.user.userId, filter);
  }

  @Get(":id")
  async findOne(@Req() req, @Param("id") id: string) {
    return this.taskService.findOne(req.user.userId, +id);
  }

  @Put(":id")
  async update(@Req() req, @Param("id") id: string, @Body() dto: UpdateTaskDto) {
    return this.taskService.update(req.user.userId, +id, dto);
  }

  @Patch(":id/viewers/:viewerEmail")
  async addViewer(
    @Req() req,
    @Param("id") id: string,
    @Param("viewerEmail") viewerEmail: string,
  ) {
    await this.taskService.addViewer(
      req.user.userId,
      +id,
      viewerEmail,
    );
    return 'Usuário adicionado como viewer com sucesso';
  }

  @Delete(":id")
  async remove(@Req() req, @Param("id") id: string) {
    return this.taskService.remove(req.user.userId, +id);
  }
}
