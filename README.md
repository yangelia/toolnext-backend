## ToolNext Backend

Backend для платформи ToolNext — сервісу оренди інструментів з авторизацією, управлінням інструментами, бронюваннями, відгуками та профілями користувачів.

Проєкт побудований на Node.js + Express + MongoDB з використанням JWT, Multer, Cloudinary та чіткою модульною архітектурою.

---

## Стек технологій

Node.js, Express

MongoDB, Mongoose

JWT Authentication (access + refresh tokens)

Multer (завантаження фото)

Cloudinary

Celebrate / Joi (валідація)

Helmet, CORS

Pino логування

---

## Структура проєкту

src/
├─ constants/
├─ controllers/
│ ├─ authController.js
│ ├─ usersController.js
│ ├─ toolsController.js
│ ├─ bookingController.js
│ └─ feedbackController.js
│
├─ db/
│ └─ connectMongoDB.js
│
├─ middleware/
│ ├─ authenticate.js
│ ├─ errorHandler.js
│ ├─ logger.js
│ └─ notFoundHandler.js
│
├─ models/
│ ├─ user.js
│ ├─ session.js
│ ├─ tool.js
│ ├─ booking.js
│ └─ feedback.js
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

Архітектура модульна: кожен напрямок (auth, tools, booking…) має свої routes → controllers → services → models.

---

## Встановлення

1. Клонувати репозиторій
   git clone https://github.com/yourname/toolnext-backend.git
   cd toolnext-backend

2. Встановити залежності
   npm install

3. Створити файл .env

Скопіювати:

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
POST /auth/refresh Оновлення токену

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

---
