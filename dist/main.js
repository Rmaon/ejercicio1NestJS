"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
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
//# sourceMappingURL=main.js.map