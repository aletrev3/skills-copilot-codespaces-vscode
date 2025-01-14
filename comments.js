// Create web server
// 1. Import modules
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const querystring = require('querystring');

// 2. Create server
const server = http.createServer((req, res) => {
  // 2.1 Get URL
  const urlObj = url.parse(req.url);
  const pathName = urlObj.pathname;
  const query = querystring.parse(urlObj.query);

  // 2.2 Route
  if (pathName === '/' || pathName === '/index.html') {
    // 2.2.1 Read file
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      // 2.2.2 Response
      res.writeHead(200, {
        'Content-Type': 'text/html',
      });
      res.end(data);
    });
  } else if (pathName === '/comments') {
    // 2.2.3 Write file
    fs.writeFile(
      path.join(__dirname, 'comments.txt'),
      query.comment + '\n',
      { flag: 'a' },
      (err) => {
        // 2.2.4 Response
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.end('Write comment success');
      },
    );
  } else {
    // 2.2.5 Response
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });
    res.end('Not Found');
  }
});

// 3. Listen port
server.listen(3000, () => {
  console.log('Server is running at http://