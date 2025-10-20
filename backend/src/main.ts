import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("tasks-server")
    .setVersion("1.0")
    // .addSecurity('token', { name: 'token', in: 'header', type: 'apiKey' })
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "jwt"
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document, {
    customSiteTitle: "tasks server",
  });

  // Allow CORS from frontend during development
  app.enableCors({
    origin: ["http://localhost:5173"],
    credentials: true,
  });

  await app.listen(Number(3000));
}
bootstrap();
