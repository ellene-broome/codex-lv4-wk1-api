# Codex Level 4 — Week 1: ContentHub API

A simple Express API built for Codex Academy Level 4, Week 1.
This project practices building REST-style routes, using correct status codes,
and returning JSON like a public API.

---

## Tech Used
- Node.js
- Express
- Helmet
- Vitest + Supertest (tests)

---

## Setup

### 1) Clone the repo

```bash
git clone https://github.com/ellene-broome/codex-lv4-wk1-api.git
cd codex-lv4-wk1-api
```
### 2) Install dependencies
```bash
npm install
```
### Run the Server
```bash
npm start
```
### Dev mode - auto-start
```bash
npm run dev
```
Server runs on:
- http://localhost:3000
### Run Tests
```bash
npm test
```
### Routes (Wk1 Day 1)
### GET/
Returns a welcome message.
### GET/posts
Returns a list of example posts
### GET/users
Returns a list of example users
### GET/items
Returns the list of items from the date source

### POST/items
Adds a new item to the list

