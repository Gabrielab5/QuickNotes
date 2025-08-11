import React, { useState} from "react"
import TextareaAutosize from 'react-textarea-autosize';

function NoteForm( {addNote, initialNote, onUpdateNote, onClose }) {
    const [noteText, setNoteText ] = useState(initialNote ? initialNote.text : '')
    const [noteTitle, setNoteTitle] = useState(initialNote ? initialNote.title : '');

    const handleSubmit = (e) => {
        e.preventDefault()

        if(initialNote){
            onUpdateNote({...initialNote, title: noteTitle, text:noteText, updatedDate: new Date(),})
        } else if(noteText.trim() || noteTitle.trim()) {
            addNote(noteText, noteTitle)
        }
           // Clear the form fields after submission only for new notes
        if (!initialNote) {
            setNoteTitle('');
            setNoteText('');
        }
    }

    const formClass = initialNote ? "note-form in-modal" : "note-form";

    return (
        <form onSubmit={handleSubmit} className={formClass}>
        {initialNote && <button className="close-form-button" onClick={onClose}>&times;</button>}
            <input
                type="text"
                placeholder="Title"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="note-title-input"
            />
            <TextareaAutosize 
                className="note-text-area"
                placeholder="Type you note here..."
                value= {noteText}
                onChange = { (e) => setNoteText(e.target.value)}
                minRows = {5}
            />
            <button type="submit">{initialNote ? 'Update Note' : 'Add Note'} </button>
        </form>
    )
}
export default NoteForm