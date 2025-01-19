import express from 'express';

const app = express();

// Route for the homepage ("/")
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Route for the "/contact" page
app.get('/contact', (req, res) => {
  res.send('Contact us at contact@example.com');
});

// Route for the "/about" page
app.get('/about', (req, res) => {
  res.send('This is the about page.');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
