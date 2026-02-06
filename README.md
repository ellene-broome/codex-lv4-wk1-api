# ContentHub API (Level 4 — Week 1)

A simple Express.js API built for Codex Academy Level 4.

This project practices:
- Building REST-style routes
- Using middleware
- Handling GET and POST requests
- Returning JSON responses
- Testing with Postman

---

## 🚀 Tech Used

- Node.js  
- Express  
- Helmet  
- Postman  
- Vitest + Supertest  

---

## 📂 Project Structure

```
src/
app.js
server.js
data.js
tests/
```

---

## ⚙️ Setup

Clone the repo:

```bash
git clone https://github.com/ellene-broome/codex-lv4-wk1-api.git
cd codex-lv4-wk1-api
```
Install dependencies:
npm install
```
Run the server:
node src/server.js
```
Server runs on:
```
http://localhost:3000
```
## 📌 Routes
### GET /

Returns welcome message.

### GET /posts

Returns sample posts.

### GET /users

Returns sample users.

### GET /items

Returns list of items.

### POST /items

Creates a new item.

Example body:
{
  "name": "marker"
}

Success response (201):
{
  "id": 7,
  "name": "marker"
}

Error response (400):
{
  "error": "Name is required"
}

## 🧪 Testing

All routes tested using Postman.

Tests included with Vitest + Supertest.

---
