import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma.service";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [UserModule],
  providers: [TaskService, PrismaService],
  controllers: [TaskController],
})
export class TaskModule {}
