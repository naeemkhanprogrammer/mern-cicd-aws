const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config(); // to load .env

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ✅ Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express + Prisma' });
});

// ✅ Create user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
