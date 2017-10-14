function parseBodyJson(req, cb) {
  let body = [];
  let params = {};

  try{
    req.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
  
      params = JSON.parse(body);
    });
  }
  catch(Error){
    cb({"code": 400, "message": "Request invalid"}, params);
  }

  cb(null, params);
}

module.exports.parseBodyJson = parseBodyJson;