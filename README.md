## ToolNext Backend

Backend для платформи ToolNext — сервісу оренди інструментів з авторизацією, управлінням інструментами, бронюваннями, відгуками та профілями користувачів.

Проєкт побудований на Node.js + Express + MongoDB з чіткою модульною архітектурою, підтримкою завантаження зображень та обробкою помилок.

---

## Стек технологій

Node.js + Express

MongoDB + Mongoose

Авторизація (access token / cookies)

Multer — завантаження зображень

Cloudinary — зберігання фото

Joi / Celebrate — валідація

Helmet + CORS

Pino — логування запитів

---

## Структура проєкту

src/
├─ constants/
│
├─ controllers/
│ ├─ authController.js
│ ├─ usersController.js
│ ├─ toolsController.js
│ ├─ bookingController.js
│ └─ feedbackController.js
│
├─ db/
│ ├─ connectMongoDB.js
│ └─ cloudinary.js
│
├─ middleware/
│ ├─ authenticate.js
│ ├─ upload.js
│ ├─ logger.js
│ ├─ errorHandler.js
│ └─ notFoundHandler.js
│
├─ models/
│ ├─ user.js
│ ├─ tool.js
│ ├─ booking.js
│ └─ feedback.js
│ (session.js — за необхідності, якщо команда обере session-based auth)
│
├─ routes/
│ ├─ authRoutes.js
│ ├─ usersRoutes.js
│ ├─ toolsRoutes.js
│ ├─ bookingRoutes.js
│ └─ feedbackRoutes.js
│
├─ services/
│ ├─ auth.js
│ ├─ users.js
│ ├─ tools.js
│ ├─ booking.js
│ └─ feedback.js
│
├─ validations/
│ ├─ authValidation.js
│ ├─ toolValidation.js
│ ├─ bookingValidation.js
│ └─ feedbackValidation.js
│
└─ server.js

---

## Встановлення

1. Клонувати репозиторій
   git clone https://github.com/yourname/toolnext-backend.git
   cd toolnext-backend

2. Встановити залежності
   npm install

3. Створити конфігураційні файли

cp .env.example .env

Заповнити змінні:

PORT=3000
MONGO_URL=mongodb://...
JWT_SECRET=...
JWT_REFRESH_SECRET=...
FRONTEND_DOMAIN=http://localhost:3001
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

4. Запустити сервер
   npm run dev

---

## Маршрути API

### Auth

Метод Ендпоінт Опис
POST /auth/register Реєстрація
POST /auth/login Логін
POST /auth/logout Логаут
GET /auth/current Поточний користувач
POST /auth/refresh Оновлення токену (якщо оберемо JWT refresh-flow)

---

### Users

Метод Ендпоінт
GET /users/current
GET /users/:id
GET /users/:id/tools

---

### Tools

Метод Ендпоінт
GET /tools
GET /tools/:id
POST /tools
PATCH /tools/:id
DELETE /tools/:id

---

### Bookings

Метод Ендпоінт
POST /bookings/:toolId
GET /bookings/my

---

### Feedback

Метод Ендпоінт
POST /feedback/:toolId
GET /feedback/:toolId

---

## Помилки та обробка

Проєкт містить:

- глобальний error handler
- обробник 404
- централізовану валідацію
- логування запитів через pino

---
