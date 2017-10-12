const http = require('http');
const fs = require('fs');
const hndl = require('./helpers/handlers');
const jsonParser = require('./helpers/jsonParser');
const jsonPath = './content/articles.json';

const hostname = '127.0.0.1';
const port = 3000;

const articles = getJSON(jsonPath);


const server = http.createServer((req, res) => {
  jsonParser.parseBodyJson(req, (err, payload) => {
    const handler = getHandler(req.url);

    handler(req, res, payload, articles, (err, result, articles) => {
      if (err) {
        res.statusCode = err.code;
        res.setHeader('Content-Type', 'application/json');
        res.end( JSON.stringify(err) );

        return;
      }

      updateJson(articles);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end( JSON.stringify(result) );
    });
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function getHandler(url) {
  return hndl.handlers[url] || hndl.notFound;
}

function updateJson(content){
  fs.writeFile(jsonPath, JSON.stringify(content), (err) => {
    if(err){
      console.error(err);
    }
  })
}

function getJSON(path){
  try{
    const content = JSON.parse(fs.readFileSync(path, 'utf8'));
    return content;    
  }    
  catch(Error){
    return [];
  }
}