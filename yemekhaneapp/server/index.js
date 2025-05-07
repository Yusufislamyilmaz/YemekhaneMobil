// server/index.js
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const USERS_PATH = path.resolve('./public/users.json');

// Kullanıcının güncel bakiyesini çeken endpoint
app.get('/api/balance/:username', async (req, res) => {
  try {
    const users = JSON.parse(await fs.readFile(USERS_PATH, 'utf-8'));
    const u = users.find(u => u.username === req.params.username);
    if (!u) return res.status(404).send({ error: 'User not found' });
    res.send({ balance: u.balance });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

// Kullanıcının bakiyesini güncelleyen endpoint
app.post('/api/balance/:username', async (req, res) => {
  const { amount } = req.body;
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).send({ error: 'Geçersiz miktar' });
  }
  try {
    const text = await fs.readFile(USERS_PATH, 'utf-8');
    const users = JSON.parse(text);
    const idx = users.findIndex(u => u.username === req.params.username);
    if (idx === -1) return res.status(404).send({ error: 'User not found' });

    users[idx].balance += amount;
    await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2), 'utf-8');
    res.send({ balance: users[idx].balance });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

app.listen(3001, () => console.log('Balance API listening on :3001'));
