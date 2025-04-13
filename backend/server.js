const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: "localhost", // Database container name
  user: "root", 
  password: "password", // Password from docker-compose.yml
  database: "OakFlight", // Database name
  port: 3306,
});
 
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

// Sample API route for inserting example data
app.post("/add-data", (req, res) => {
  const query = `
    INSERT INTO users (name, email) VALUES
      ('Alice', 'alice@example.com'),
      ('Bob', 'bob@example.com'),
      ('Charlie', 'charlie@example.com');
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error inserting data: " + err);
      return res.status(500).send("Error inserting data");
    }
    res.send("Example data inserted successfully!");
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body; // Destructure username and password from request body
  
  // SQL query to check if the user exists with the provided username and password
  const query = "SELECT * FROM Users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error executing query: " + err);
      return res.status(500).send("Internal server error");
    }

    if (results.length > 0) {
      // User found
      res.json({ message: "Login successful" });
    } else {
      // User not found
      res.status(401).json({ message: "Invalid username or password" });
    }
  });
});

// API route to fetch all users
app.get("/users", (req, res) => {
  const query = "SELECT * FROM Users";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data: " + err);
      return res.status(500).send("Error fetching data");
    }

    res.json(results);  // Send the results as JSON
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
