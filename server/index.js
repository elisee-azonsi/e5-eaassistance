// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


// Create an Express application
const app = express();


// import MySQL connection file
const db = require('./models/config');

// import routes
const routes = require('./routes/index');


const corsOptions = {
  origin: 'http://localhost:3001', // Replace with your allowed origin(s)
  methods: ['GET', 'POST', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));

// Middleware to parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Use the routes router for handling login and registration routes
app.use('/', routes);

// Start the server and listen on the specified port
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
