# Ecommerce Backend

This is a robust backend for an ecommerce application, built with Node.js, Express, and PostgreSQL (via Prisma). It handles user authentication, product management, cart operations, orders, and more.

## 🚀 Features

- **Authentication**: Secure user registration and login using JWT.
- **Product Management**: CRUD operations for products and categories.
- **Cart & Orders**: Manage shopping carts and process orders.
- **File Uploads**: Image uploads handling using Cloudinary and Multer.
- **Database**: Relational data modeling with Prisma ORM and PostgreSQL.
- **Security**: Password hashing with bcryptjs, environment variable protection.

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **File Storage**: Cloudinary

## 📋 Prerequisites

Before running this project, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- PostgreSQL database
- Cloudinary account (for image uploads)

## ⚙️ Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
# Server Configuration
PORT=5000

# Database Configuration
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Authentication
JSON_SECRET_KEY="your_super_secret_jwt_key"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up the database:**
    Make sure your PostgreSQL server is running and the `DATABASE_URL` is set correctly in your `.env` file.
    ```bash
    npx prisma migrate dev --name init
    # Optional: Seed the database
    npm run seed
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The server should now be running at `http://localhost:5000`.

## 📡 API Endpoints

Here is a quick overview of the main resource routes:

- **Auth**: `/api/auth` (Login, Sign-up)
- **Products**: `/api/products` (List, Create)
- **Cart**: `/api/cart`
- **Orders**: `/api/orders`

_(Note: Check the `src/routes` directory for a complete list of endpoints.)_

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.