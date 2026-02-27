const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const ASSETS_DIR = path.join(__dirname, '../public');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(ASSETS_DIR, req.url === '/' ? 'index.html' : req.url);

  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('  🪬 Arpeggiator Dev Server');
  console.log('  ➜  Local:   http://localhost:' + PORT);
  console.log('  ➜  Network: http://127.0.0.1:' + PORT);
  console.log('  Press Ctrl+C to stop');
  console.log('');
});
