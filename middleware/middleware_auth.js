const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        console.log("Cookie Token:", req.cookies?.token); 
        console.log("Body Token:", req.body?.token);     
        console.log("Header Token:", req.headers.authorization); 

        const token =
            req.cookies?.token ||
            req.body?.token ||
            req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is Missing. Please provide a valid token.",
            });
        }
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Payload:", payload); 
            req.user = payload;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token. Authentication Failed.",
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error verifying the token.",
            error: error.message,
        });
    }
};

exports.isUser = (req, res, next) => {
    try {
        console.log("Checking User Role:", req.user.role);

        if (req.user.role.toLowerCase() !== "user") {
            return res.status(403).json({
                success: false,
                message: "Access Denied. This is a protected route for users only.",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Role does not match the token.",
        });
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        console.log("Checking Admin Role:", req.user.role);

        if (req.user.role.toLowerCase() !== "admin") { 
            return res.status(403).json({
                success: false,
                message: "Access Denied. This is a protected route for Admins only.",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Admin Role does not match the token.",
        });
    }
};
