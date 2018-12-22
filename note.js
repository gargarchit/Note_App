var fs = require("fs");

var fetchNotes = () => {
    try {
        var noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    } catch(e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title,body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    }
    var duplicateNote = notes.filter((note) => {
        return note.title === title;
    });
    if(duplicateNote.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => {
        return note.title === title;
    });
    return filteredNotes[0];
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var remove = notes.filter((note) => {
        return note.title !== title; 
    });
    saveNotes(remove);
    return notes.length !== remove.length;
};

var logNote = (notes) => {
    console.log('--');
    console.log('Title: ', notes.title);
    console.log('Body: ', notes.body);  
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote,
};
