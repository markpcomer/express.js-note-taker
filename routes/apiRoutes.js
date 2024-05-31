 const router = require('express').Router();
 const db = require('../db/noteDB');

 const {
  readNote,
  writeNote,
  getNotes,
  addNote,
  deleteNote
} = require('../db/noteDB');
 
 router.get('/notes', async (req, res) => {
     try {
         const notes = await db.getNotes();
         res.json(notes);
     } catch (err) {
         res.status(500).json(err);
     }
 });
 
 router.post('/notes', async (req, res) => {
     try {
         const note = await db.addNote(req.body);
         res.json(note);
     } catch (err) {
         res.status(500).json(err);
     }
 });
 
 router.delete('/notes/:id', async (req, res) => {
     try {
         await db.deleteNote(req.params.id);
         res.json({ ok: true });
     } catch (err) {
         res.status(500).json(err);
     }
 });
 
 module.exports = router;
 