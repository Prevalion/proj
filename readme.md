# Vente - E-Commerce Platform

This repository contains a full-featured e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). The platform supports user authentication, product management, order processing, and admin functionalities.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)
- [License](#license)

---

## Features

### User Features
- Browse products with search and pagination.
- Add products to the cart and manage the cart.
- Checkout with shipping, payment, and order placement.
- View order details and track order status.
- Leave product reviews and ratings.

### Admin Features
- Manage products (create, update, delete).
- Manage users (view, update, delete).
- Manage orders (view, mark as delivered).

---

## Project Structure
Collecting workspace information```markdown
# Vente - E-Commerce Platform

This repository contains a full-featured e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). The platform supports user authentication, product management, order processing, and admin functionalities.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)
- [License](#license)

---

## Features

### User Features
- Browse products with search and pagination.
- Add products to the cart and manage the cart.
- Checkout with shipping, payment, and order placement.
- View order details and track order status.
- Leave product reviews and ratings.

### Admin Features
- Manage products (create, update, delete).
- Manage users (view, update, delete).
- Manage orders (view, mark as delivered).

---

## Project Structure

```
.env
.gitignore
docker-compose.yaml
package.json
backend/
  ├── controllers/
  ├── data/
  ├── middleware/
  ├── models/
  ├── routes/
  ├── utils/
  ├── server.js
frontend/
  ├── public/
  ├── src/
      ├── components/
      ├── screens/
      ├── slices/
      ├── utils/
      ├── App.js
      ├── index.js
grafana/
prometheus/
```

---

## Installation

### Prerequisites
- Node.js
- MongoDB
- Docker and Docker Compose (optional for containerized deployment)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/vente.git
   cd vente
   ```

2. Install dependencies:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```
     NODE_ENV=development
     PORT=5050
     MONGO_URI=your_mongo_connection_string
     JWT_SECRET=your_jwt_secret
     ```

---

## Usage

### Development
Run the application in development mode:
```bash
npm run dev
```

### Database Seeding
Seed the database with sample data:
```bash
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

### Production
Build and run the application using Docker Compose:
```bash
docker compose up -d
```

---

## API Endpoints

### Products
- `GET /api/products` - Get all products.
- `GET /api/products/:id` - Get product details.
- `POST /api/products/:id/reviews` - Add a product review.

### Users
- `POST /api/users` - Register a new user.
- `POST /api/users/login` - Authenticate a user.
- `GET /api/users/profile` - Get user profile.

### Orders
- `POST /api/orders` - Create a new order.
- `GET /api/orders/:id` - Get order details.
- `PUT /api/orders/:id/deliver` - Mark order as delivered.

---

## Tech Stack

- **Frontend**: React, Redux Toolkit, React Bootstrap
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT
- **DevOps**: Docker, Prometheus, Grafana

---

## License

This project is licensed under the MIT License.
