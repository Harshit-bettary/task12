
const express = require("express");
const router = express.Router();


const { auth, isAdmin, isUser } = require("../middleware/middleware_auth");
const { login, signup } = require("../controller/authcontroller");

router.post("/login", login);
router.post("/signup", signup);
  
  //protected routes
  router.get("/user", auth, isUser, (req, res) => {
    res.json({
      success: true,
      message: "Welcome to the Protected Route for users",
    });
  });
  
  router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
      success: true,
      message: "Welcome to the Protected Route for admin",
    });
  });
  
  module.exports = router;