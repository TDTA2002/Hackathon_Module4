"use strict";
class KeepNote {
    constructor(note, id = Date.now() * Math.random()) {
        this.note = note;
        this.id = id;
    }
}
class NoteManager {
    constructor() {
        var _a;
        this.notes = [];
        let notesLocal = JSON.parse((_a = (localStorage.getItem("notes"))) !== null && _a !== void 0 ? _a : "[]");
        let notesTemp = [];
        for (let i in notesLocal) {
            notesTemp.push(new KeepNote(notesLocal[i].note, notesLocal[i].id));
        }
        this.notes = notesTemp;
        this.render();
    }
    createNote(newNote) {
        this.notes.push(newNote);
        localStorage.setItem("notes", JSON.stringify(this.notes));
        this.render();
    }
    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id != id);
        localStorage.setItem("notes", JSON.stringify(this.notes));
        this.render();
    }
    render() {
        let renderEl = document.getElementById("list-notes");
        let noteString = ``;
        this.notes.map((note, index) => {
            noteString += `
               
                <div class="title2">
                <div>${note.note}</div>
                <div class="delete">
                <span onclick="handleDeleteNote(${note.id})">
                <i style="color: orange;" class="fa-solid fa-trash"></i>
            </span>
                </div>
            </div>
            `;
        });
        renderEl.innerHTML = noteString;
    }
}
const notes = new NoteManager();
function addNewNote() {
    const noteInput = document.getElementById("note");
    const noteValue = noteInput.value;
    if (noteValue.trim() !== "") {
        const newNote = new KeepNote(noteValue);
        notes.createNote(newNote);
        noteInput.value = "";
        const snackbar = document.getElementById("snackbar");
        if (snackbar) {
            snackbar.classList.add("show");
            setTimeout(function () {
                snackbar.classList.remove("show");
            }, 2500);
        }
    }
}
function handleDeleteNote(id) {
    notes.deleteNote(id);
    const snackbar = document.getElementById("snackbardelete");
    if (snackbar) {
        snackbar.classList.add("show");
        setTimeout(function () {
            snackbar.classList.remove("show");
        }, 2500);
    }
}
