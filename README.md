# ContentHub API (Codex Academy Level 4)

### A Node.js + Express REST API that progressed from using in-memory data (Week 1) to a real PostgreSQL database using Supabase (Week 2).

## What This Project Demonstrates
### Week 1 — API Fundamentals
- REST-style routes
- Middleware
- Query parameters & validation
- JSON responses
- Postman testing
- Pagination
- Testing with Vitest + Supertest
- Temporary in-memory data
### Week 2 — Database Integration
- Supabase PostgreSQL connection
- Environment variables (.env)
- Persistent data storage
- SQL operations (INSERT, SELECT, UPDATE, DELETE)
- API now returns live database records
## Tech Used
- Node.js
- Express
- Helmet
- Postman
- Vitest + Supertest
- Supabase (PostgreSQL)
## Project Structure
```
src/
  app.js          - Express routes
  server.js       - Server entry point
  data.js         - Week 1 in-memory data
  supabaseClient.js # Database connection
tests/

```
## Setup
- Clone the repo:
```
git clone https://github.com/ellene-broome/codex-lv4-wk1-api.git
cd codex-lv4-wk1-api
```
### Install dependencies:
```
npm install
```
## Create .env file in the project root
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
```
- Start the server:
  `npm run dev`
- Server runs on:
```
http://localhost:3000
```
After starting the server, open http://localhost:3000/items to verify the database connection.

## Routes
## General Routes
| Method | Route  | Description               |
| ------ | ------ | ------------------------- |
| GET    | /      | Welcome message           |
| GET    | /posts | Sample posts (memory)     |
| GET    | /users | Sample users              |
## Items (Supabase)
| Method | Route      | Result                   |
| ------ | ---------- | ------------------------ |
| GET    | /items     | List items               |
| POST   | /items     | Create item              |
| PUT    | /items/:id | Update item (200 or 404) |
| DELETE | /items/:id | Delete item (204 or 404) |
## Example POST Body
```
{
  "name": "marker",
  "category": "school"
}
```
## Database Table: items
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
- APIs connect clients to databases
- Memory data disappears — databases persist
- Environment variables protect secrets
- SQL operations control real data
- Backend behavior changes when switching from memory → database
  ## cors modification
  The API only accepts cross-origin requests from the frontend origin defined in CLIENT_ORIGIN.