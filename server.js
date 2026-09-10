const { spawn } = require('child_process');
const path = require('path');

const backend = path.join(__dirname, 'backend', 'server.js');
const child = spawn(process.execPath, [backend], {
  cwd: path.join(__dirname, 'backend'),
  env: process.env,
  stdio: 'inherit'
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 0);
});

process.on('SIGTERM', () => child.kill('SIGTERM'));
process.on('SIGINT', () => child.kill('SIGINT'));
