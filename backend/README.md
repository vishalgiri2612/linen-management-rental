# ClosetRush Backend

Built with Node.js, Express, and MongoDB to serve the ClosetRush Linen Management Platform.

## Features
- JWT Authentication (Login/Register)
- Product/Item Management
- Rental Order Processing
- User Dashboard Data
- Admin Stats API

## Setup

1. **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/try/download/community) installed and running.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Environment**: Update `.env` with your `MONGO_URI` and `JWT_SECRET`.
4. **Seed Database**: (Optional) Populate initial items:
   - Use Postman or CURL: `POST http://localhost:5000/api/items/seed`
5. **Run Server**:
   ```bash
   node index.js
   ```

## API Endpoints
- `POST /api/auth/register` - Create new user/admin
- `POST /api/auth/login` - User/Admin login
- `GET /api/items` - List all linen items
- `POST /api/rent` - Create a rental order (requires Auth)
- `GET /api/admin/stats` - System overview (for admin)
