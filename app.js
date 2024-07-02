const express = require('express');
const fs = require('fs');
const app = express();
const { mean, median, mode } = require('./stats');

// Middleware to parse query parameters
app.use(express.json());

function handleErrors(req, res, next) {
  try {
    const nums = req.query.nums;
    if (!nums) {
      throw new Error('nums are required');
    }

    const numArray = nums.split(',').map(Number);
    if (numArray.some(isNaN)) {
      throw new Error('All elements must be numbers');
    }

    req.numArray = numArray;
    next();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

function writeToFile(data) {
  const timestamp = new Date().toISOString();
  data.timestamp = timestamp;
  fs.writeFileSync('results.json', JSON.stringify(data, null, 2));
}

app.get('/mean', handleErrors, (req, res) => {
  const value = mean(req.numArray);
  const response = { operation: 'mean', value };

  if (req.query.save === 'true') {
    writeToFile(response);
  }

  res.format({
    'application/json': () => res.json(response),
    'text/html': () => res.send(`<html><body><p>Mean: ${value}</p></body></html>`)
  });
});

app.get('/median', handleErrors, (req, res) => {
  const value = median(req.numArray);
  const response = { operation: 'median', value };

  if (req.query.save === 'true') {
    writeToFile(response);
  }

  res.format({
    'application/json': () => res.json(response),
    'text/html': () => res.send(`<html><body><p>Median: ${value}</p></body></html>`)
  });
});

app.get('/mode', handleErrors, (req, res) => {
  const value = mode(req.numArray);
  const response = { operation: 'mode', value };

  if (req.query.save === 'true') {
    writeToFile(response);
  }

  res.format({
    'application/json': () => res.json(response),
    'text/html': () => res.send(`<html><body><p>Mode: ${value}</p></body></html>`)
  });
});

app.get('/all', handleErrors, (req, res) => {
  const meanValue = mean(req.numArray);
  const medianValue = median(req.numArray);
  const modeValue = mode(req.numArray);
  const response = {
    operation: 'all',
    mean: meanValue,
    median: medianValue,
    mode: modeValue
  };

  if (req.query.save === 'true') {
    writeToFile(response);
  }

  res.format({
    'application/json': () => res.json(response),
    'text/html': () => res.send(`
      <html>
        <body>
          <p>Mean: ${meanValue}</p>
          <p>Median: ${medianValue}</p>
          <p>Mode: ${modeValue}</p>
        </body>
      </html>
    `)
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
