## Authentication API

### Register User

**Endpoint:**  
`POST /api/auth/register`

**Description:**  
Registers a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "address": "123 Main St",
  "password": "yourpassword"
}
```

**Response:**

- **201 Created**
    ```json
    {
      "msg": "User created successfully",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "address": "123 Main St"
      }
    }
    ```
- **400 Bad Request**
    ```json
    { "msg": "All fields are required" }
    ```
    or
    ```json
    { "msg": "User already exists" }
    ```
- **500 Internal Server Error**
    ```json
    { "msg": "User Registration Error", "error": "Error details" }
    ```

---

### Login User

**Endpoint:**  
`POST /api/auth/login`

**Description:**  
Logs in an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response:**

- **200 OK**
    ```json
    {
      "msg": "Login successful",
      "token": "jwt_token_here",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "USER",
        "address": "123 Main St"
      }
    }
    ```
- **400 Bad Request**
    ```json
    { "msg": "Enter Email and Password" }
    ```
    or
    ```json
    { "msg": "Invalid Email or Password" }
    ```
- **500 Internal Server Error**
    ```json
    { "msg": "Login Error", "error": "Error details" }
    ```

---

**Notes:**
- All requests and responses use JSON format.
- On successful login, a JWT token is returned and also set as a cookie named `token`.


## User Management API

### Add User

**Endpoint:**  
`POST /api/users`

**Description:**  
Adds a new user. Only accessible by Admins.

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (or cookie named `token`)

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "address": "456 Market St",
  "password": "securepassword"
}
```

**Response:**

- **201 Created**
    ```json
    {
      "message": "User added successfully",
      "user": {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com",
        "address": "456 Market St"
      }
    }
    ```
- **400 Bad Request**
    ```json
    { "message": "All fields are required" }
    ```
- **403 Forbidden**
    ```json
    { "msg": "Not Autorized, Admins Only" }
    ```
- **401 Unauthorized**
    ```json
    { "msg": "Not Authorized, No Token" }
    ```
- **500 Internal Server Error**
    ```json
    { "message": "Error adding user", "error": "Error details" }
    ```

---

### Get All Users

**Endpoint:**  
`GET /api/users`

**Description:**  
Fetches all users. Only accessible by Admins. Supports optional query parameters for filtering.

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (or cookie named `token`)

**Query Parameters (optional):**
- `name`: Filter by name (partial match)
- `email`: Filter by email (partial match)
- `address`: Filter by address (partial match)
- `role`: Filter by role (`USER`, `ADMIN`, `OWNER`)

**Example Request:**
```
GET /api/users?role=USER&name=Jane
```

**Response:**

- **200 OK**
    ```json
    {
      "users": [
        {
          "id": 2,
          "name": "Jane Smith",
          "email": "jane@example.com",
          "address": "456 Market St",
          "role": "USER"
        }
      ]
    }
    ```
- **403 Forbidden**
    ```json
    { "msg": "Not Autorized, Admins Only" }
    ```
- **401 Unauthorized**
    ```json
    { "msg": "Not Authorized, No Token" }
    ```
- **500 Internal Server Error**
    ```json
    { "message": "Error fetching users", "error": "Error details" }
    ```

---

### Get User Details

**Endpoint:**  
`GET /api/users/:id`

**Description:**  
Fetches details of a specific user by ID. Only accessible by Admins.

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (or cookie named `token`)

**Response:**

- **200 OK**
    ```json
    {
      "user": {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com",
        "address": "456 Market St",
        "role": "USER"
      }
    }
    ```
    If user is an OWNER:
    ```json
    {
      "user": {
        "id": 3,
        "name": "Owner Name",
        "email": "owner@example.com",
        "address": "789 Store Ave",
        "role": "OWNER",
        "store": {
          "id": 1,
          "name": "Store Name",
          "address": "789 Store Ave",
          "avg_rating": 4.5
        }
      }
    }
    ```
- **404 Not Found**
    ```json
    { "message": "User not found" }
    ```
- **403 Forbidden**
    ```json
    { "msg": "Not Autorized, Admins Only" }
    ```
- **401 Unauthorized**
    ```json
    { "msg": "Not Authorized, No Token" }
    ```
- **500 Internal Server Error**
    ```json
    { "message": "Error fetching user details", "error": "Error details" }
    ```

---

### Get Dashboard Stats

**Endpoint:**  
`GET /api/users/dashboard/stats`

**Description:**  
Fetches dashboard statistics: total users, stores, and ratings. Only accessible by Admins.

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (or cookie named `token`)

**Response:**

- **200 OK**
    ```json
    {
      "totalUsers": 10,
      "totalStores": 5,
      "totalRatings": 25
    }
    ```
- **403 Forbidden**
    ```json
    { "msg": "Not Autorized, Admins Only" }
    ```
- **401 Unauthorized**
    ```json
    { "msg": "Not Authorized, No Token" }
    ```
- **500 Internal Server Error**
    ```json
    { "message": "Error fetching dashboard stats", "error": "Error details" }
    ```

---

**Notes:**
- All endpoints require authentication as an Admin.
- JWT token can be sent via `Authorization` header or as a cookie named `token`.
- All requests and responses use JSON format.