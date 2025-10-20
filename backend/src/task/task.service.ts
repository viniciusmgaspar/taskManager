import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { FindAllTaskDto } from "./dto/findAll0task.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) {}

  async create(userId: number, data: CreateTaskDto) {
    const payload: any = {
      title: data.title,
      description: data.description,
      status: data.status,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      creator: { connect: { id: userId } },
    };

    return this.prisma.task.create({ data: payload });
  }

  async findAll(userId: number, filter: FindAllTaskDto) {
    const where: any = {};
    if (filter.onlyCreatedByMe == "true") {
      where.creatorId = userId;
    } else {
      where.OR = [{ creatorId: userId }, { viewers: { some: { id: userId } } }];
    }
    const orderBy: any = { dueDate: "asc" };
    if (filter.status !== undefined) where.status = filter.status;
    if (filter.orderBy !== undefined) orderBy.dueDate = filter.orderBy;
    return this.prisma.task.findMany({
      where,
      orderBy,
      include: {
        creator: { select: { id: true, name: true, email: true } },
        viewers: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findOne(userId: number, id: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        id,
        OR: [{ creatorId: userId }, { viewers: { some: { id: userId } } }],
      },
      include: {
        creator: { select: { id: true, name: true, email: true } },
        viewers: { select: { id: true, name: true, email: true } },
      },
    });
    if (!task) throw new NotFoundException("Tarefa não encontrada");
    return task;
  }

  async update(userId: number, id: number, data: UpdateTaskDto) {
    const task = await this.findOne(userId, id);

    if (task.creatorId !== userId) {
      throw new NotFoundException(
        "Somente o criador da tarefa pode atualizá-la"
      );
    }
    // Build a Prisma-compatible update payload
    const payload: any = {};
    if (data.title !== undefined) payload.title = data.title;
    if (data.description !== undefined)
      payload.description = data.description as any;
    if (data.status !== undefined) payload.status = data.status ?? data.status;
    if (data.dueDate !== undefined)
      payload.dueDate = data.dueDate ? new Date(data.dueDate) : null;

    return this.prisma.task.update({ where: { id }, data: payload });
  }

  async addViewer(userId: number, taskId: number, viewerEmail: string) {
    const user = await this.userService.findByEmail(viewerEmail);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }
    return this.prisma.task.update({
      where: { id: taskId, creatorId: userId },
      data: { viewers: { connect: { id: user.id } } },
    });
  }

  async remove(userId: number, id: number) {
    await this.findOne(userId, id);
    return this.prisma.task.delete({ where: { id } });
  }
}
