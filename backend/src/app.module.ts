import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { TaskModule } from "./task/task.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [UserModule, AuthModule, TaskModule],
})
export class AppModule {}
