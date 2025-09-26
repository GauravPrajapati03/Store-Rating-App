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


## Store Management API

### Add Store

**Endpoint:**  
`POST /api/stores`

**Description:**  
Adds a new store. Only accessible by Admins.

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (or cookie named `token`)

**Request Body:**
```json
{
  "name": "SuperMart",
  "email": "store@example.com",
  "address": "101 Commerce St",
  "owner_id": 3
}
```

**Response:**

- **201 Created**
    ```json
    {
      "msg": "Store added successfully",
      "store": {
        "id": 1,
        "name": "SuperMart",
        "email": "store@example.com",
        "address": "101 Commerce St",
        "owner_id": 3
      }
    }
    ```
- **400 Bad Request**
    ```json
    { "msg": "All fields are required" }
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
    { "msg": "Error adding store", "error": "Error details" }
    ```

---

### Get All Stores

**Endpoint:**  
`GET /api/stores`

**Description:**  
Fetches all stores. Requires authentication. Supports optional query parameters for filtering.

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (or cookie named `token`)

**Query Parameters (optional):**
- `name`: Filter by store name (partial match)
- `address`: Filter by address (partial match)

**Example Request:**
```
GET /api/stores?name=SuperMart&address=Commerce
```

**Response:**

- **200 OK**
    ```json
    {
      "msg": "Fetched Stores successfully",
      "stores": [
        {
          "id": 1,
          "name": "SuperMart",
          "email": "store@example.com",
          "address": "101 Commerce St",
          "avg_rating": 4.2
        }
      ]
    }
    ```
- **401 Unauthorized**
    ```json
    { "msg": "Not Authorized, No Token" }
    ```
- **500 Internal Server Error**
    ```json
    { "msg": "Error Fetching Stores", "error": "Error details" }
    ```

---

### Get Store Details

**Endpoint:**  
`GET /api/stores/:id`

**Description:**  
Fetches details of a specific store by ID. Requires authentication.

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (or cookie named `token`)

**Response:**

- **200 OK**
    ```json
    {
      "store": {
        "id": 1,
        "name": "SuperMart",
        "email": "store@example.com",
        "address": "101 Commerce St",
        "owner_id": 3,
        "avg_rating": 4.2
      }
    }
    ```
- **404 Not Found**
    ```json
    { "msg": "Store not found" }
    ```
- **401 Unauthorized**
    ```json
    { "msg": "Not Authorized, No Token" }
    ```
- **500 Internal Server Error**
    ```json
    { "msg": "Error fetching store details", "error": "Error details" }
    ```

---

**Notes:**
- All endpoints require authentication.
- Only Admins can add stores.
- JWT token can be sent via `Authorization` header or as a cookie named `token`.
- All requests and responses use JSON format.


---

## Rating Management API

### Add or Update Rating

**Endpoint:**  
`POST /api/ratings`

**Description:**  
Add a new rating or update an existing rating for a store. Accessible by authenticated users.

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (or cookie named `token`)

**Request Body:**
```json
{
  "store_id": 1,
  "rating": 4
}
```

**Response:**

- **201 Created** (New rating added)
    ```json
    { "msg": "Rating added Successfully" }
    ```
- **200 OK** (Existing rating updated)
    ```json
    { "msg": "Rating updated Successfully" }
    ```
- **400 Bad Request**
    ```json
    { "msg": "All fields are Required" }
    ```
    or
    ```json
    { "msg": "Rating must be between 1 and 5" }
    ```
- **401 Unauthorized**
    ```json
    { "msg": "Not Authorized, No Token" }
    ```
- **500 Internal Server Error**
    ```json
    { "msg": "Error submitting rating", "error": "Error details" }
    ```

---

### Get User's Rating for a Store

**Endpoint:**  
`GET /api/ratings/my/:storeId`

**Description:**  
Fetch the authenticated user's rating for a specific store.

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (or cookie named `token`)

**Response:**

- **200 OK** (Rating found)
    ```json
    {
      "msg": "Fetched rating successfully",
      "rating": 4
    }
    ```
- **200 OK** (No rating found)
    ```json
    {
      "msg": "No rating found",
      "rating": null
    }
    ```
- **401 Unauthorized**
    ```json
    { "msg": "Not Authorized, No Token" }
    ```
- **500 Internal Server Error**
    ```json
    { "msg": "Error fetching rating", "error": "Error details" }
    ```

---

### Get Ratings for Store Owner

**Endpoint:**  
`GET /api/ratings/owner/store`

**Description:**  
Fetch all ratings for the authenticated store owner's store, including average rating and user details. Accessible only by store owners.

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (or cookie named `token`)

**Response:**

- **200 OK**
    ```json
    {
      "msg": "Fetched ratings and avg successfully",
      "storeId": 1,
      "averageRating": 4.2,
      "ratings": [
        {
          "id": 5,
          "rating": 4,
          "user_name": "Jane Smith",
          "user_email": "jane@example.com",
          "created_at": "2025-09-26T10:00:00.000Z"
        }
      ]
    }
    ```
- **404 Not Found**
    ```json
    { "msg": "Store not Found for this owner" }
    ```
- **403 Forbidden**
    ```json
    { "msg": "Not Autorized, Store Owners Only" }
    ```
- **401 Unauthorized**
    ```json
    { "msg": "Not Authorized, No Token" }
    ```
- **500 Internal Server Error**
    ```json
    { "msg": "Error fetching ratings for store owner", "error": "Error details" }
    ```

---

**Notes:**
- All endpoints require authentication.
- Only store owners can access `/owner/store`.
- JWT token can be sent via `Authorization` header or as a cookie named `token`.
- All requests and responses use JSON format.