const util = require('util');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const path = require('path');

const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

  
function readNote() {
    readFromFile('db/db.json', 'utf8');
}

function writeNote(note) {
    const jsonNote = JSON.stringify(note);
    return writeToFile('db/db.json', jsonNote);
}

function getNotes() {
    return readFromFile('db/db.json', 'utf8')
        .then((notes) => {
            let jsonNotes;

        try {
          jsonNotes = [].concat(JSON.parse(notes));
        } catch (err) {
          jsonNotes = [];
        }
        return jsonNotes;
        })
        .catch((err) => {
            console.error('Error reading file', err);
            return [];
        })
}

function addNote(note) {
    const { title, text } = note;
    const newNote = { title, text, id: uuidv4() };
    if (!title || !text) {
      throw new Error("Please enter title and text");
    }
    return getNotes()
      .then(function(notes) {
        return notes.concat(newNote);
      })
      .then(function(updatedNotes) {
        return writeNote(updatedNotes);
      })
      .then(function() {
        return newNote;
      })
  }

module.exports = {
    readNote,
    writeNote,
    getNotes,
    addNote
}








/*










    
  addNote(note){
  const { title, text } = note;
  if (!title || !text) {
    throw new Error('Make sure to enter both Title & Text');
  }

  const newNote = {
    title: title,
    text: text,
    id: uuidv4(),
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
*/


