const express = require("express");
const dbConnect = require("./config/db");
const router = require("./routes/user");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const startServer = async () => {
  try {
    await dbConnect(); 
    console.log("Connected to MongoDB Successfully.");
    app.use("/api/users", router);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1); 
  }
};
startServer();
