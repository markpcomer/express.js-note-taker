 const express = require('express');
 const router = express.Router();
 const {
  readNote,
  writeNote,
  getNotes,
  addNote
} = require('../db/noteDB');

router.get('/notes', (req, res) => {

  getNotes()
    .then(function (notes) {
      return res.json(notes);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
});

router.post('/notes', (req, res) => {
  addNote(req.body)
    .then(function(note) {
      res.json(note);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
});

module.exports = router;








 /*
 router.get('/notes', (req, res) => {
  console.log('GET request to /api/notes'); // Add this line
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error'});
      return;
    }
    try {
      const notes = JSON.parse(data);
      res.json(notes);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).json({ error: 'Error parsing JSON data' });
    }

  });
 });

 router.post('/notes', (req, res) => {
  console.log('POST request to /api/notes');
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    try {
      const notes = JSON.parse(data);
      const newNote = req.body;
      newNote.id = uuidv4();
      notes.push(newNote); 

      fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(newNote);
    });
    } catch (error) {
      console.error('Error handling POST request:', error);
      res.status(500).json({ error: 'Error handling Post request'});
    }
  });
  })
*/




