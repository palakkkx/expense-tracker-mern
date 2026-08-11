const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  console.log("Authorization Header:", req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("Token:", token);

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      console.log("Decoded:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      console.log("User:", req.user);

      if (!req.user) {
        return res.status(401).json({
          message: "User Not Found",
        });
      }

      next();

    } catch (error) {
      console.error("Auth Error:", error);

      return res.status(401).json({
        message: "Not Authorized",
      });
    }
  } else {
    console.log("No Authorization Header");

    return res.status(401).json({
      message: "No Token",
    });
  }
};

module.exports = { protect };