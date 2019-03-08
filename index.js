const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 23023;

const handler = function (req, res) {
  let filePath = `${req.url}`;
  filePath = `./src/${filePath}`;

  if (req.url === '/')
    filePath = `${filePath}/index.html`;

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') {
        fs.readFile('./src/404.html', function (error, content) {
          res.writeHead(200, {
            'Content-Type': contentType
          });
          res.end(content, 'utf-8');
        });
      } else {
        res.writeHead(500);
        res.end(`Sorry, check with the site admin for error: ${error.code}\n`);
        res.end();
      }
    } else {
      res.writeHead(200, {
        'Content-Type': contentType
      });
      res.end(content, 'utf-8');
    }
  });
};

const server = http.createServer(handler);

server.listen(port);

console.log(`Server listening on port: ${port}`);
