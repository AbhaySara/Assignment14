const cors = require("cors");

const express = require("express");

const mongoose = require("mongoose");

const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

const studentRoutes = require('./routes/studentRoutes');

app.use('/students', studentRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});