const util = require('util');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
//const { join } = require('path');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


class NoteDB {
  read() {
    return readFileAsync('db/db.json', 'utf-8');
  }
  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }
  getNotes() {
    return this.read().then((notes) => {
      let displayNotes;
      try {
        displayNotes = [].concat(JSON.parse(notes))
      } catch (error) {
        displayNotes = [];
      }
      return displayNotes;
    })
  }

//   addNote(note) {
//     // define note 
//     // define new note
//     /*
//     // Add a unique id to the note using uuid package
//     const newNote = { title, text, id: uuidv1() };

//     // Get all notes, add the new note, write all the updated notes, return the newNote
//     */

//     return this.getNotes() // create .then, pass new note, update it
//   };
//   removeNote(id) {
//     return this.getNotes()
//   }
// }
// Func to read notes from db.json

//   fs.readFile(filePath, 'utf-8', (error, fileContent) => {
//     if (error) throw error;
//     const parsedData = JSON.parse(fileContent);
//     return res.send(parsedData)
//   })
// }
    
  addNote(note){
  const { title, text } = note;
  if (!title || !text) {
    throw new Error('Make sure to enter both Title & Text');
  }

  const newNote = {
    id: uuidv4(),
    title: title,
    text: text
  };

  return this.getNotes()
    .then(function (notes) {
      return notes.concat(newNote);
    })
    .then(function(updatedNotes) {
      return this.write(updatedNotes);
    })
    .then(function() {
      return newNote;
    })
    
  // fs.readFile(filePath, 'utf-8', (error, fileContent) => {
  //   if (error) {
  //     console.error('Could not read note', error)
  //   } else {
  //     const parsedData = JSON.parse(fileContent);
  //     parsedData.push(note);

  //     let newFile = JSON.stringify(parsedData);

  //     fs.writeFile(filePath, newFile, 'utf-8', function(error) {
  //       if (error) {
  //         console.error('Error writing new note', error);
  //       }
  //     })
  //   }
  //   console.log('New note added');
  //   return res.send(JSON.parse(newFile))
  // })
}

// function deleteNote(req,res) {
//   fs.readFile(filePath, 'utf-8', function(error, fileContent) {
//     if(error){
//       console.error('Error deleting note', err);
//     } else {
//       const deletedNote = req.params.id;
//       const parsedData = JSON.parse(fileContent);
//     }
//   })
// }
}


  module.exports = new NoteDB;



