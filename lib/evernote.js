fs = require('fs');
crypto = require('crypto');
Evernote = require('evernote').Evernote;

var authToken = require('../config/evernote').config.authToken
if (authToken == "your developer token") {
	console.log("Please fill in your developer token");
	console.log("To get a developer token, visit https://sandbox.evernote.com/api/DeveloperToken.action");
	process.exit(1);
}

// Initial development is performed on our sandbox server. To use the production
// service, change sandbox: false and replace your
// developer token above with a token from
// https://www.evernote.com/api/DeveloperToken.action
var client = new Evernote.Client({
	token: authToken,
	sandbox: true
});

var userStore = client.getUserStore();

userStore.checkVersion(
	"Evernote EDAMTest (Node.js)",
	Evernote.EDAM_VERSION_MAJOR,
	Evernote.EDAM_VERSION_MINOR,
	function(err, versionOk) {
		console.log("Is my Evernote API version up to date? " + versionOk);
		console.log();
		if (!versionOk) {
			process.exit(1);
		}
	}
);

var noteStore = client.getNoteStore();

// List all of the notebooks in the user's account
var notebooks = noteStore.listNotebooks(function(err, notebooks) {
	console.log("Found " + notebooks.length + " notebooks:");
	for (var i in notebooks) {
		console.log("  * " + notebooks[i].name);
	}
});

// To create a new note, simply create a new Note object and fill in
// attributes such as the note's title.
var note = new Evernote.Note();
note.title = "Test 2";
// note.guid = '410a298c-788e-4a5a-8044-996e38a7cf31';

var content = fs.readFileSync('../tmp/test.enml', 'utf8')
	// note.content ='<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd"><en-note style="word-wrap: break-word; -webkit-nbsp-mode: space; -webkit-line-break: after-white-space;"><p style="font-size: 32px;">put html here</p></en-note>';
note.content = content;


createNote(note)
// Finally, send the new note to Evernote using the createNote method
// The new Note object that is returned will contain server-generated
// attributes such as the new note's unique GUID.
function createNote(note) {
	noteStore.createNote(note, function(err, createdNote) {
		console.log();
		console.log("Creating a new note in the default notebook");
		console.log();
		console.log("Successfully created a new note with GUID: " + createdNote.guid);
	});
}

function updateNote(argument) {
	noteStore.updateNote(note, function(err, createdNote) {
		console.log();
		console.log("Creating a new note in the default notebook");
		console.log();
		// console.log("Successfully created a new note with GUID: " + createdNote.guid);
	});
}