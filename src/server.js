// server.js
// This file is the ENTRY point for the application. It STARTS the Express server and LISTENS for incoming requests.

// Load environment variables from .env file
import "dotenv/config"; 
// imports the app (Express server) from app.js
import app from "./app.js";



// decides which port to listen on
const PORT = process.env.PORT || 3000;

// starts the server and listens on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
