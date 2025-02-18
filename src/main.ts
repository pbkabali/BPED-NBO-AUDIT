import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import config from "./Config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.connectMicroservice({
  //   transport: Transport.REDIS,
  //   options: {
  //     ...config.redis.dev,
  //   },
  // });

  app.enableCors();

  // app.enableCors({
  //   origin: true,
  //   // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   methods: '*',
  //   credentials: true,
  // });

  // Constants
  const PORT = 8001;
  const HOST = "0.0.0.0";

  await app.startAllMicroservices();
  await app.listen(PORT, HOST);
  console.log("PBS-AUDIT Service running on port 8001...");
}
bootstrap();
