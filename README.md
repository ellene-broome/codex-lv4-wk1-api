# ContentHub API (Codex Academy Level 4)

## A simple Express.js API built for Codex Academy Level 4.A Node.js + Express REST API that progressed from using in-memory data (Week 1) to a real PostgreSQL database using Supabase (Week 2).

## What This Project Demonstrates
### Week 1 — API Fundamentals

- REST-style routes

- Middleware usage

- GET and POST requests

- JSON responses

- Postman testing

- Automated tests (Vitest + Supertest)

- Temporary in-memory data

### Week 2 — Database Integration

- Connecting backend to Supabase (PostgreSQL)

- Environment variables (.env)

- Persistent data storage

- SQL operations (SELECT, INSERT, DELETE)

- API now returns live database records

## Tech Used

- Node.js

- Express

- Helmet

- Postman

- Vitest + Supertest

-Supabase (PostreSQL)

## Project Structure
```
src/
  app.js          - Express routes
  server.js       - Server entry point
  data.js         - Week 1 in-memory data
  supabaseClient.js # Database connection
tests/

```

##  Setup

- Clone the repo:

git clone https://github.com/ellene-broome/codex-lv4-wk1-api.git
cd codex-lv4-wk1-api


- Install dependencies:

npm install


- Run the server:

node src/server.js


- Server runs on:

http://localhost:3000

## Routes
## Core Routes
| Method | Route  | Description               |
| ------ | ------ | ------------------------- |
| GET    | /      | Welcome message           |
| GET    | /posts | Sample posts (memory)     |
| GET    | /users | Sample users              |
| GET    | /items | Database items (Supabase) |

## POST /items (Week 1)
### Creates a new item in memory

Example body:
```
{
  "name": "marker"
}
```
Success (201)
```
{
  "id": 7,
  "name": "marker"
}
```
Error (400)
```
{
  "error": "Name is required"
}
```


## Database (Week 2)
### Table Items
| Column     | Description                |
| ---------- | -------------------------- |
| id         | Auto generated primary key |
| name       | Item name                  |
| category   | Item category              |
| created_at | Timestamp                  |

The `/items` route now returns real database records


## Testing

- Manual testing with Postman
- Automated tests with Vitest + Supertest

## What I Learned

- APIs act as a middle layer between client and database

- Databases store persistent data

- Environment variables protect secrets

- SQL queries directly affect live data

- Backend behavior changes when switching from memory → database