const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();
const port = 9090;

// Middleware to serve static files from the 'dist' folder with the '/devsoc' base path
app.use('/devsoc', express.static(path.resolve(__dirname, './dist/'), { maxAge: '1y', etag: false }));

// History API fallback to handle SPA routing with the '/devsoc' base path
app.use('/devsoc', history({
  index: '/devsoc/index.html' // This should ensure correct pathing for SPA
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Handle requests that don't match any routes by serving the frontend index.html
app.get('/devsoc/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port} at path /devsoc`);
});
