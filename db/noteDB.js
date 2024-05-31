const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const util = require('util');
const { writeToFile } = require('../../noteDB');


// Promisifying fs methods
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

async function readNote() {
    try {
        const data = await readFileAsync("./db/db.json", 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.log("Error reading from file", error);
        return [];
    }
};

async function writeNote(data) {
    try{
        await writeFileAsync("./db/db.json", JSON.stringify(data)); 
    } catch (error) {
        console.log("Error writing to file", error);
    }
};

async function getNotes(){
    try {
        const notes = await readFromFile("./db/db.json");
        let result;
        if(Array.isArray(notes) && notes.length > 0) {
            result = notes;
        } else {
            result = [];
        }
    } catch (error) {
        console.log("Cannot read note", error);
    }
};

async function addNote(note) {
    const { title, text } = note;
    if(!title || !text) {
        throw new Error("Enter title and/or text");
    }
    const newNote = { title, text, id: uuidv4() };
    const allNotes = await getNotes("./db/db.json");
    allNotes.push(newNote);
    await writeToFile("./db/db.json", allNotes);
    return newNote;
};

async function deleteNote(id) {
    const allNotes = await getNotes("./db/db.json");
    const filteredNotes = allNotes.filter((note) => note.id !== id);
    await writeToFile("./db/db.json", filteredNotes);
};

module.exports = {
    readNote,
    writeNote,
    getNotes,
    addNote,
    deleteNote
};

