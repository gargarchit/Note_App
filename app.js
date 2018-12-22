var fs = require("fs");
var yargs = require("yargs");

var note = require("./note.js");

const titleOptions = {
    describe: 'Title of Note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'Body of Note',
    demand: true,
    alias: 'b'
};        
var argv = yargs
    .command('add', 'Add a new note', {
        title:titleOptions,
        body:bodyOptions
    })
    .command('list', 'list All Notes')
    .command('read', 'Read a Note', {
        title:titleOptions
    })
    .command('remove', 'Remove a Note', {
        title:titleOptions
    })
    .help()
    .argv;
var command = argv._[0];

if(command === 'add') {
    var notes = note.addNote(argv.title, argv.body);
    if(notes){
        console.log('Note Created');
        note.logNote(notes);
    } else{
        console.log('Note Title Taken');
    }
} else if(command === 'list') {
    var allnotes = note.getAll();
    console.log('Printing ' + allnotes.length +' note(s)');
    allnotes.forEach((notes) => {
        note.logNote(notes);
    });
} else if(command === 'read') {
    var notes = note.getNote(argv.title);
    if(notes){
        console.log('NOTE FOUND');
        note.logNote(notes);
    } else{
        console.log('NOTE NOT FOUND');
    }
} else if(command === 'remove') {
    var noteRemoved = note.removeNote(argv.title);
    var message = noteRemoved ? 'NOTE Removed' : 'NOTE NOT FOUND';
    console.log(message);
} else {
    console.log("Command Not Recognized");
}