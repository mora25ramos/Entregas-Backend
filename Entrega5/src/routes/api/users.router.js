import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserDAO from "../../dao/mongoDB/userDAO.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const usersRouter = Router();

// POST /api/users/register
usersRouter.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const userExists = await UserDAO.getUserByUsername(username);
    if (userExists) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await UserDAO.createUser(username, hashedPassword);

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Return user and token
    return res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/users/login
usersRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await UserDAO.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Check if password is correct
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Return user and token
    return res.status(200).json({ user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/users/profile
usersRouter.get("/profile", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;

    // Get user
    const user = await UserDAO.getUserById(userId);

    // Return user
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default usersRouter;