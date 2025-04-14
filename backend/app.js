const express = require('express');
const db = require('./db');
const userRouter = require('./routes/user.js');
const flightRouter = require('./routes/flight');

const app = express();

app.use(express.json());

// ทำให้ req.db ใช้งานได้ในทุก route
app.use((req, res, next) => {
  req.db = db;
  next();
});


app.use('/users', userRouter);
app.use('/flights', flightRouter);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
