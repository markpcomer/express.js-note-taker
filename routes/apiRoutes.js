 const router = require('express').Router();
 //const fs = require('fs').promises;
 //const { v4: uuidv4 } = require('uuid');
 //const filePath = './db/db.json';
 const noteDB = require('../db/noteDB');

// Function to read notes from db.json
// async function getNotes(req, res) {
//     try {
//       const fileContent = await fs.readFile(filePath, 'utf-8');
//       const parsedData = JSON.parse(fileContent);
//       console.log(parsedData);
//       res.json(parsedData.notesArray);
//     } catch (error) {
//       console.error('Failed to read file', error);
//       res.status(500).send('Failed to get notes');
//     }
//   }
router.get('api/notes', (req, res) => {
  noteDB
  .getNotes()
  .then((notes) => {
    return res.json(notes);
  })
  .catch((error) => {
    res.status(500).json(error);
  })
});

router.post('api/notes', (req, res) => {
  noteDB
  .addNote(req.body)
  .then(function(note) {
    res.json(note);
  })
  .catch(function(err) {
    res.status(500).json(err);
  })
});

// async function addNote(req, res) {
//     const { title, text } = req.body; // add to addNote
//     if (!title || !text) {
//       return res.status(400).send('Make sure to enter both Title & Text');
//     }
  
//     const note = {
//       id: uuidv4(),
//       title: title,
//       text: text
//     };
  
//     try {
//       const fileContent =  await fs.readFile(filePath, 'utf-8');
//       const parsedData = JSON.parse(fileContent);
//       parsedData.push(note);
//       const newFile = JSON.stringify(parsedData);
//       await fs.writeFile(filePath, newFile, 'utf-8');
//       console.log('New note added');
//       res.json(note);
//     } catch (error) {
//       console.error('Failed to add note', error);
//       res.status(500).send('Failed to add note');
//     }
//   }
  





 
module.exports = router;



//  router.get('/notes', async (req, res) => {
//      try {
//          const notes = await getNotes();
//          res.json(notes);
//      } catch (err) {
//          res.status(500).json(err);
//      }
//  });
 
//  router.post('/notes', async (req, res) => {
//      try {
//          const note = await addNote(req.body);
//          res.json(note);
//      } catch (err) {
//          res.status(500).json(err);
//      }
//  });
 
//  router.delete('/api/notes/:id', async (req, res) => {
//      try {
//          await DB.deleteNote(req.params.id);
//          res.json({ ok: true });
//      } catch (err) {
//          res.status(500).json(err);
//      }
//  });
 