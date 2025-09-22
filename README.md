# Rumi API

## Overview
This is a RESTful API for a personal blogging platform, built with Node.js and Express. It uses Prisma as the ORM to interact with a SQLite database for all data persistence needs.

## Features
- **Express.js**: Provides a robust framework for building the API server and routing.
- **Prisma**: Manages database schema, migrations, and type-safe database queries.
- **SQLite**: A lightweight, file-based database used for local development and storage.

## Getting Started
### Installation
1.  **Clone the Repository**
    ```bash
    git clone https://github.com/HassanAmirii/rumi.git
    ```

2.  **Navigate to the Directory**
    ```bash
    cd rumi
    ```

3.  **Install Dependencies**
    ```bash
    npm install
    ```

4.  **Set Up Database**
    Prisma needs to generate the client and set up the SQLite database based on the schema.
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Start the Server**
    ```bash
    node src/server.js
    ```

### Environment Variables
Create a `.env` file in the root of the project and add the following variable. The server defaults to this port if it is not specified.

```env
# The port the server will run on
PORT=3000
```

## API Documentation
### Base URL
The API is served from the root of the server, e.g., `http://localhost:3000`.

### Endpoints
#### POST /new
Creates a new blog post.

**Request**:
```json
{
  "title": "My First Post",
  "content": "This is the content of my very first post.",
  "category": "Technology",
  "tags": "nodejs, prisma"
}
```

**Response**:
```json
{
    "message": "successfully created a new post",
    "post": {
        "id": 1,
        "title": "My First Post",
        "content": "This is the content of my very first post.",
        "category": "Technology",
        "tags": "nodejs, prisma",
        "createdAt": "2024-05-29T12:00:00.000Z",
        "updatedAt": "2024-05-29T12:00:00.000Z"
    }
}
```

**Errors**:
- `500`: Internal Server Error.

---
#### GET /posts
Retrieves a list of all blog posts.

**Request**:
No payload required.

**Response**:
```json
{
    "message": "succesfully retrieved all posts",
    "posts": [
        {
            "id": 1,
            "title": "My First Post",
            "content": "This is the content of my very first post.",
            "category": "Technology",
            "tags": "nodejs, prisma",
            "createdAt": "2024-05-29T12:00:00.000Z",
            "updatedAt": "2024-05-29T12:00:00.000Z"
        }
    ]
}
```

**Errors**:
- `500`: Internal Server Error.

---
#### GET /singlepost/:id
Retrieves a single blog post by its unique ID.

**Request**:
No payload required. Replace `:id` with the post's ID.

**Response**:
```json
{
    "post": {
        "id": 1,
        "title": "My First Post",
        "content": "This is the content of my very first post.",
        "category": "Technology",
        "tags": "nodejs, prisma",
        "createdAt": "2024-05-29T12:00:00.000Z",
        "updatedAt": "2024-05-29T12:00:00.000Z"
    }
}
```

**Errors**:
- `404`: Resource does not exist.
- `500`: Internal Server Error.

---
#### PATCH /update/:id
Updates an existing blog post.

**Request**:
Replace `:id` with the post's ID. All fields are optional.
```json
{
  "title": "My Updated Post Title",
  "content": "This is the updated content."
}
```

**Response**:
```json
{
    "message": "post updated",
    "post": {
        "id": 1,
        "title": "My Updated Post Title",
        "content": "This is the updated content.",
        "category": "Technology",
        "tags": "nodejs, prisma",
        "createdAt": "2024-05-29T12:00:00.000Z",
        "updatedAt": "2024-05-29T12:05:00.000Z"
    }
}
```

**Errors**:
- `404`: Resource does not exist or cannot be updated.
- `500`: Internal Server Error.

---
#### DELETE /remove/:id
Deletes a blog post by its unique ID.

**Request**:
No payload required. Replace `:id` with the post's ID.

**Response**:
```json
{
    "message": "post successfully deleted",
    "post": {
        "id": 1,
        "title": "My Updated Post Title",
        "content": "This is the updated content.",
        "category": "Technology",
        "tags": "nodejs, prisma",
        "createdAt": "2024-05-29T12:00:00.000Z",
        "updatedAt": "2024-05-29T12:05:00.000Z"
    }
}
```

**Errors**:
- `404`: Resource does not exist or cannot be updated.
- `500`: Internal Server Error.

---
#### GET /wildsearch
Searches for posts where the title, content, or category contain the search term.

**Request**:
No payload required. Provide the search term as a query parameter `?term=yoursearch`.

**Response**:
```json
{
    "posts": [
        {
            "id": 1,
            "title": "My First Post",
            "content": "This is the content of my very first post.",
            "category": "Technology",
            "tags": "nodejs, prisma",
            "createdAt": "2024-05-29T12:00:00.000Z",
            "updatedAt": "2024-05-29T12:00:00.000Z"
        }
    ]
}
```

**Errors**:
- `404`: No posts found for the search term.
- `500`: An error occurred while fetching posts.

<br/>
<br/>

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)