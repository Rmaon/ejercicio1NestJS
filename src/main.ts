import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors();
  
  // Habilitar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`Aplicación corriendo en: http://localhost:${port}`);
  console.log(`Endpoints disponibles:`);
  console.log(`   - POST /auth/register - Registrar usuario`);
  console.log(`   - POST /auth/login - Login`);
  console.log(`   - GET /trivial/question - Obtener pregunta aleatoria`);
  console.log(`   - POST /trivial/answer - Enviar respuesta`);
  console.log(`   - GET /trivial/score - Ver puntuación`);
  console.log(`   - GET /questions - Listar preguntas (ADMIN)`);

  console.log();
  console.log(`Abre el archivo index.html en tu navegador`);
}

bootstrap();
