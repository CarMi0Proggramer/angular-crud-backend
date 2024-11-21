import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppDataSource } from "./data-source";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: "http://localhost:4200",
    });
    await app.listen(process.env.PORT ?? 3000);

    AppDataSource.initialize()
        .then(() => console.log("Database connected"))
        .catch((err) => console.log("Error during initialization: ", err));
}
bootstrap();
