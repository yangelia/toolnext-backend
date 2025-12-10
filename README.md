Node.js REST API for the ToolNext platform - a service for renting tools with authentication, bookings, feedbacks, and user profiles.

##  Опис
ToolNext Backend - це серверна частина застосунку для оренди інструментів.  
API забезпечує:
- автентифікацію користувачів (JWT),
- управління інструментами,
- бронювання,
- відгуки,
- категорії,
- роботу з медіафайлами,
- захищені маршрути.

---

## Технології
- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **BCrypt**
- **Multer** (завантаження зображень)
- **Joi / Yup** (валідація)
- **CORS**
- **dotenv**
- **Swagger (опціонально)**

---

## Структура проєкту
src/
├─ config/
├─ controllers/
├─ middlewares/
├─ models/
├─ routes/
├─ services/
├─ utils/
└─ server.js

---

##  Доступні ендпоїнти
### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/current`

### Tools
- `GET /tools`
- `GET /tools/:id`
- `POST /tools` (auth)
- `PATCH /tools/:id` (auth)
- `DELETE /tools/:id` (auth)

### Booking
- `POST /tools/:id/booking`
- `GET /bookings/my`

### Feedback
- `POST /tools/:id/feedback`
- `GET /tools/:id/feedbacks`

---

## Налаштування

Файл **.env**:

PORT=5000
MONGODB_URI=your_mongo_url
JWT_SECRET=your_secret
REFRESH_SECRET=your_refresh_secret
TOKEN_EXPIRES_IN=1h
REFRESH_EXPIRES_IN=7d
UPLOAD_DIR=uploads/
