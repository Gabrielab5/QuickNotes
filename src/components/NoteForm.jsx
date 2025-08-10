import React, { useState} from "react"

function NoteForm( {addNote}) {
    const [noteText, setNoteText ] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if( noteText.trim ()) {
            addNote(noteText)
            setNoteText('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="note-form">
            <textarea 
            placeholder=" Type you note here..."
            value= {noteText}
            onChange = { (e) => setNoteText(e.target.value)}
            rows = "5"
            ></textarea>
            <button type="submit">Add </button>
        </form>
    )
}
export default NoteForm