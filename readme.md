# Movie Reviews API

A RESTful API backend for a movie review application built with Node.js and Express. This application allows users to register, login, manage their profiles, browse movies, create and manage reviews, and share reviews with other users.

## Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **User Management**: Profile viewing and updating, password change functionality
- **Movie Management**: Add new movies and retrieve movie listings
- **Review System**: Create, read, update, and delete movie reviews with ratings
- **Review Sharing**: Share reviews with other users
- **Authorization**: Protected routes with JWT-based authentication

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MySQL
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: Crypto-js for password hashing
- **CORS**: Enabled for cross-origin requests

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MySQL Server
- npm (comes with Node.js)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Hackathon-Movie-Reviews-Dac-Aug-2025
   ```

2. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

## Database Setup

1. **Create the database and tables**
   - Open MySQL and run the SQL script:
   ```bash
   mysql -u root -p < db.sql
   ```
   Or manually execute the SQL commands in `backend/db.sql`

2. **Configure database connection**
   - Update the database credentials in `backend/db/db.js`:
   ```javascript
   const pool = mysql.createPool({
       host: 'localhost',
       user: 'root',
       password: 'your_password',  // Update this
       database: 'movie_reviews'
   })
   ```

## Configuration

The application uses a JWT secret key for token generation. The secret is configured in `backend/utils/config.js`. For production, consider using environment variables:

```javascript
module.exports = {
    secret: process.env.JWT_SECRET || "your-secret-key"
}
```

## Running the Server

Start the server with:

```bash
npm start
```

Or if you have a start script in `package.json`:

```bash
node server.js
```

The server will start on `http://localhost:4000`

## API Endpoints

### Authentication
All endpoints except `/user/register` and `/user/login` require a JWT token in the request header:
```
token: <your-jwt-token>
```

### User Endpoints

#### Register User
- **POST** `/user/register`
- **Body**:
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "mobile": "1234567890",
    "birth": "1990-01-01"
  }
  ```

#### Login
- **POST** `/user/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: Returns JWT token and user information

#### Get User Profile
- **GET** `/user/profile`
- **Headers**: `token: <jwt-token>`
- **Response**: User profile information

#### Update User Profile
- **PUT** `/user/profile`
- **Headers**: `token: <jwt-token>`
- **Body**:
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "birth": "1990-01-01"
  }
  ```

#### Update Password
- **PUT** `/user/profile/password`
- **Headers**: `token: <jwt-token>`
- **Body**:
  ```json
  {
    "password": "newpassword123"
  }
  ```

### Movie Endpoints

#### Get All Movies
- **GET** `/movies`
- **Headers**: `token: <jwt-token>`
- **Response**: List of all movies

#### Add Movie
- **POST** `/movies`
- **Headers**: `token: <jwt-token>`
- **Body**:
  ```json
  {
    "title": "Inception",
    "releaseDate": "2010-07-16"
  }
  ```

### Review Endpoints

#### Get User's Reviews
- **GET** `/review`
- **Headers**: `token: <jwt-token>`
- **Response**: All reviews created by the authenticated user

#### Get All Reviews
- **GET** `/review/all`
- **Headers**: `token: <jwt-token>`
- **Response**: All reviews from all users

#### Create Review
- **POST** `/review/insert`
- **Headers**: `token: <jwt-token>`
- **Body**:
  ```json
  {
    "movie_id": 1,
    "review": "Great movie!",
    "rating": 5
  }
  ```

#### Update Review
- **PUT** `/review/update/:id`
- **Headers**: `token: <jwt-token>`
- **Body**:
  ```json
  {
    "review": "Updated review text",
    "rating": 4
  }
  ```

#### Delete Review
- **DELETE** `/review/delete/:id`
- **Headers**: `token: <jwt-token>`

### Share Endpoints

#### Get Shared Reviews
- **GET** `/share`
- **Headers**: `token: <jwt-token>`
- **Response**: List of review IDs shared with the authenticated user

#### Share Review with User
- **POST** `/share/:id`
- **Headers**: `token: <jwt-token>`
- **Body**:
  ```json
  {
    "user_id": 2
  }
  ```
- **Note**: `:id` is the review_id to share

## Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "status": "success",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "status": "error",
  "error": "Error message"
}
```

## Database Schema

### Users Table
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `first_name` (TEXT)
- `last_name` (TEXT)
- `email` (TEXT)
- `password` (TEXT) - SHA256 hashed
- `mobile` (TEXT)
- `birth` (DATE)

### Movies Table
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `title` (TEXT)
- `releasedate` (DATE)

### Reviews Table
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `movie_id` (INT, FOREIGN KEY)
- `review` (TEXT)
- `rating` (INT)
- `user_id` (INT, FOREIGN KEY)
- `modified` (TIMESTAMP)

### Shares Table
- `review_id` (INT, FOREIGN KEY, PRIMARY KEY)
- `user_id` (INT, FOREIGN KEY, PRIMARY KEY)

## Project Structure

```
backend/
├── db/
│   ├── db.js          # Database connection pool
│   └── db.sql         # Database schema
├── routes/
│   ├── authorization.js  # JWT authentication middleware
│   ├── movies.js        # Movie endpoints
│   ├── review.js        # Review endpoints
│   ├── share.js         # Share endpoints
│   └── user.js          # User endpoints
├── utils/
│   ├── config.js        # Configuration (JWT secret)
│   └── result.js        # Response formatting utilities
├── server.js            # Express server setup
└── package.json         # Dependencies
```

## Security Notes

- Passwords are hashed using SHA256 before storage
- JWT tokens are required for protected routes
- Database credentials should be moved to environment variables in production
- JWT secret should be stored securely and not committed to version control

## License

This project was created for the SUNEBEAM_HACKATHON.
