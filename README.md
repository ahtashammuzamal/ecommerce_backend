# 🛍️ Ecommerce Backend API

A robust, production-ready backend for an e-commerce platform built with **Node.js**, **Express**, and **PostgreSQL**. This project demonstrates scalable architecture, secure authentication, and complex data relationships.

## ✨ Key Features

- **🔐 Authentication & Security**
  - Secure User Sign-up & Login using **JWT** (JSON Web Tokens).
  - Password hashing with **bcrypjs**.
  - **Role-Based Access Control (RBAC)**: Admin-only routes for product and order management.

- **📦 Product Management**
  - Complete CRUD operations for products.
  - **Image Uploads**: Integrated with **Cloudinary** and **Multer** for handling multiple product images.
  - Category organization (seeded database).

- **🛒 Shopping Cart**
  - Persistent cart management for authenticated users.
  - Add, update, remove items, and clear cart functionality.

- **📦 Order Processing**
  - Order creation from cart contents.
  - Admin capabilities to update order status (e.g., from 'Pending' to 'Shipped').

- **🗄️ Database & ORM**
  - Built on **PostgreSQL** for reliable relational data storage.
  - Managed via **Prisma ORM** for type-safe database queries and migrations.

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Runtime** | Node.js | JavaScript runtime environment |
| **Framework** | Express.js | Fast, unopinionated web framework |
| **Database** | PostgreSQL | Open source relational database |
| **ORM** | Prisma | Next-generation Node.js and TypeScript ORM |
| **Auth** | JWT & Bcrypt | Stateless authentication and security |
| **Storage** | Cloudinary | Cloud-based image and video management |

## � Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- **Node.js**: v16+
- **PostgreSQL**: Local or cloud instance (e.g., Supabase, Neon)
- **Cloudinary Account**: For handling image uploads

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ahtashammuzamal/ecommerce_backend.git
    cd ecommerce_backend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    # Server
    PORT=5000

    # Database (Prisma)
    DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce_db?schema=public"

    # Security
    JSON_SECRET_KEY="your_super_complex_secret_key"

    # Cloudinary (Image Uploads)
    CLOUDINARY_CLOUD_NAME="your_cloud_name"
    CLOUDINARY_API_KEY="your_api_key"
    CLOUDINARY_API_SECRET="your_api_secret"
    ```

4.  **Database Migration & Seeding**
    ```bash
    npx prisma migrate dev --name init  # Create tables in your DB
    npm run seed                        # Populate initial categories
    ```

5.  **Run the Server**
    ```bash
    npm run dev
    ```
    Server running at: `http://localhost:5000`

## 📡 API Documentation

### 👤 Authentication
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/sign-up` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login user & get Token | ❌ |
| `POST` | `/api/auth/logout` | Logout user | ✅ |

### 📦 Products
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Get all products | ❌ |
| `GET` | `/api/products/:id` | Get single product details | ❌ |
| `POST` | `/api/products/create` | Create new product (w/ images) | ✅ (Admin) |
| `PATCH` | `/api/products/:id` | Update product details | ✅ (Admin) |
| `DELETE` | `/api/products/:id` | Delete a product | ✅ (Admin) |

### � Cart
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/cart` | Get user's cart | ✅ |
| `POST` | `/api/cart/add` | Add item to cart | ✅ |
| `PATCH` | `/api/cart/update` | Update item quantity | ✅ |
| `DELETE` | `/api/cart/remove` | Remove specific item | ✅ |
| `POST` | `/api/cart/clear` | Remove all items | ✅ |

### 🚚 Orders
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/orders` | Get user's order history | ✅ |
| `POST` | `/api/orders/create` | Place a new order | ✅ |
| `PATCH` | `/api/orders/:orderId/status` | Update order status | ✅ (Admin) |