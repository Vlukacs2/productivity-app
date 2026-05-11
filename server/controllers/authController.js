const bcrypt = require("bcryptjs");

const db = require("../config/db");

const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const existingUser = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = db.prepare(`
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
  `).run(name, email, hashedPassword);

  const user = {
    id: result.lastInsertRowid,
    name,
    email
  };

  res.status(201).json({
    ...user,
    token: generateToken(user.id)
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  const match = await bcrypt.compare(
    password,
    user.password
  );

  if (!match) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id)
  });
};

const getMe = (req, res) => {
  res.json(req.user);
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};