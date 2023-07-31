const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set up the body-parser middleware to parse incoming request data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sample initial guestbook entries
let guestbookEntries = [
  { id: 1, name: 'John Doe', message: 'Hello, guestbook!', timestamp: new Date() },
  { id: 2, name: 'Jane Smith', message: 'Nice to see you!', timestamp: new Date() },
];

// Route to render the Guestbook page
app.get('/', (req, res) => {
  res.render('index', { guestbookEntries });
});

// Route to add a new guestbook entry
app.post('/add', (req, res) => {
  const { name, message } = req.body;
  if (name && message) {
    const newEntry = {
      id: guestbookEntries.length + 1,
      name,
      message,
      timestamp: new Date(),
    };
    guestbookEntries.push(newEntry);
    res.redirect('/');
  } else {
    res.status(400).json({ message: 'Name and message cannot be empty' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
