import React, { useState} from "react"
import TextareaAutosize from 'react-textarea-autosize';

function NoteForm( {addNote}) {
    const [noteText, setNoteText ] = useState('')
    const [noteTitle, setNoteTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        if(noteText.trim() || noteTitle.trim()) {
            addNote(noteText, noteTitle)
            setNoteText('')
            setNoteTitle('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="note-form">
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
            <button type="submit">Add </button>
        </form>
    )
}
export default NoteForm