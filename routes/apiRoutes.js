 
 const router = require('express').Router();
 const DB = require('../db/noteDB');
 const fs = require('fs');
 const { getNotes, addNote } = require('../db/noteDB');

  
 router.get('/notes', async (req, res) => {
     try {
         const notes = await getNotes();
         res.json(notes);
     } catch (err) {
         res.status(500).json(err);
     }
 });
 
 router.post('/notes', async (req, res) => {
     try {
         const note = await addNote(req.body);
         res.json(note);
     } catch (err) {
         res.status(500).json(err);
     }
 });
 
//  router.delete('/api/notes/:id', async (req, res) => {
//      try {
//          await DB.deleteNote(req.params.id);
//          res.json({ ok: true });
//      } catch (err) {
//          res.status(500).json(err);
//      }
//  });
 
module.exports = router;
 