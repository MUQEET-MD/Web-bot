const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

let botProcess = null;

app.use(express.static('public'));
app.use(express.json());

app.post('/deploy', (req, res) => {
  const sessionId = req.body.session;
  if (!sessionId) return res.status(400).send('Session is required');

  const sessionPath = './bot/session/session.json';
  const sessionData = { session: sessionId };

  fs.mkdirSync('./bot/session', { recursive: true });
  fs.writeFileSync(sessionPath, JSON.stringify(sessionData, null, 2));

  if (!botProcess) {
    botProcess = exec('node .', { cwd: './bot' });
    return res.send('Bot deployed and started!');
  } else {
    return res.send('Bot already running with session');
  }
});

app.listen(PORT, () => {
  console.log(`Dashboard running at http://localhost:${PORT}`);
});
