require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
const urlparser = require('url-parser');

// Basic Configuration
const port = process.env.PORT || 3000;

let shortURLs = [];

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req, res) {
  let url = req.body.url;

  dns.lookup(urlparser.parse(url).hostname, (error, address) => {
    console.log('address', address);
    if(!address) {
      res.json({error: "invalid url"})
    } else {
      let existingUrl = shortURLs.find(obj => obj.original_url === url);
      if(!existingUrl) {
        let lastShortId = shortURLs[shortURLs.length - 1] ? shortURLs[shortURLs.length - 1].short_url : 0;
        shortURLs.push({ original_url : url, short_url : lastShortId + 1});
        res.json({ original_url : url, short_url : lastShortId + 1});
      }
    }
  })
});

app.get('/api/shorturl/:short_url', function(req, res) {
  let existingUrl = shortURLs.find(obj => obj.short_url == req.params.short_url);
  if(existingUrl) {
    res.redirect(existingUrl.original_url);
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
