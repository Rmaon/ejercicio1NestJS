# 🚀 Guía de Inicio Rápido - Trivial NestJS

## Paso 1: Instalación

```bash
# Instalar dependencias
npm install
```

## Paso 2: Configurar MongoDB

### Opción A: MongoDB Local
```bash
# Iniciar MongoDB
mongod

# O con Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Opción B: MongoDB Atlas (Cloud)
1. Crear cuenta en https://www.mongodb.com/cloud/atlas
2. Crear un cluster gratuito
3. Obtener la URI de conexión
4. Actualizar `.env` con tu URI

## Paso 3: Configurar Variables de Entorno

```bash
# Copiar ejemplo
cp .env.example .env

# Editar .env
# Cambiar JWT_SECRET por algo seguro
```

## Paso 4: Iniciar la Aplicación

```bash
npm run start:dev
```

La app estará disponible en: http://localhost:3000

## Paso 5: Probar la API

### 1. Registrar un Usuario

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "password123",
    "username": "usuario1"
  }'
```

### 2. Login (guardar el token)

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "password123"
  }'
```

**Respuesta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "email": "usuario@ejemplo.com",
    "username": "usuario1",
    "role": "user"
  }
}
```

**Guardar el `access_token` para las siguientes peticiones.**

### 3. Obtener una Pregunta Aleatoria

```bash
curl -X GET http://localhost:3000/trivial/question \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

**Respuesta:**
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "statement": "Star Wars: ¿Quién dispara primero en la cantina de Mos Eisley?",
  "options": [
    { "index": 0, "text": "Greedo" },
    { "index": 1, "text": "Han Solo" },
    { "index": 2, "text": "Ambos a la vez" },
    { "index": 3, "text": "Nadie, es un montaje" }
  ],
  "difficulty": "easy"
}
```

### 4. Enviar Respuesta

```bash
curl -X POST http://localhost:3000/trivial/answer \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "questionId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "selectedOption": 1
  }'
```

**Respuesta:**
```json
{
  "correct": true,
  "correctOption": 1,
  "score": {
    "totalAnswered": 1,
    "correctAnswers": 1,
    "percentage": 100
  }
}
```

### 5. Ver Puntuación

```bash
curl -X GET http://localhost:3000/trivial/score \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

## Paso 6: Crear un Administrador

Para gestionar preguntas, necesitas un usuario administrador:

```bash
curl -X POST http://localhost:3000/auth/make-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "secretKey": "make_me_admin_2024"
  }'
```

Ahora puedes acceder al CRUD de preguntas.

## Paso 7: Gestionar Preguntas (Solo Admin)

### Listar todas las preguntas

```bash
curl -X GET http://localhost:3000/questions \
  -H "Authorization: Bearer TU_TOKEN_ADMIN"
```

### Crear una pregunta

```bash
curl -X POST http://localhost:3000/questions \
  -H "Authorization: Bearer TU_TOKEN_ADMIN" \
  -H "Content-Type: application/json" \
  -d '{
    "statement": "¿Cuál es la capital de Francia?",
    "options": [
      { "index": 0, "text": "París" },
      { "index": 1, "text": "Londres" },
      { "index": 2, "text": "Berlín" },
      { "index": 3, "text": "Madrid" }
    ],
    "answerIndex": 0,
    "difficulty": "easy"
  }'
```

## 🎯 Niveles de Dificultad

Puedes filtrar preguntas por dificultad:

```bash
# Pregunta fácil
curl -X GET http://localhost:3000/trivial/question?difficulty=easy \
  -H "Authorization: Bearer TU_TOKEN"

# Pregunta media
curl -X GET http://localhost:3000/trivial/question?difficulty=medium \
  -H "Authorization: Bearer TU_TOKEN"

# Pregunta difícil
curl -X GET http://localhost:3000/trivial/question?difficulty=hard \
  -H "Authorization: Bearer TU_TOKEN"
```

## 📊 Ver Histórico

```bash
curl -X GET http://localhost:3000/trivial/history \
  -H "Authorization: Bearer TU_TOKEN"
```

## 🔄 Reiniciar Puntuación

```bash
curl -X POST http://localhost:3000/trivial/reset \
  -H "Authorization: Bearer TU_TOKEN"
```

## 🛠️ Usando Postman

1. Importa el archivo `Trivial.postman_collection.json` en Postman
2. La colección incluye todas las peticiones configuradas
3. Después del login, el token se guarda automáticamente
