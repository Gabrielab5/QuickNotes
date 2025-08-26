import React, { useState, useEffect} from "react"
import TextareaAutosize from 'react-textarea-autosize';
import { Select } from '@mantine/core'

function NoteForm( {addNote, initialNote, onUpdateNote, onClose , categories}) {
    const [noteTitle, setNoteTitle] = useState('')
    const [noteText, setNoteText] = useState('')
    const [noteCategory, setNoteCategory] = useState('')

    useEffect(() => {
        if (initialNote) {
            setNoteText(initialNote.text)
            setNoteTitle(initialNote.title)
            setNoteCategory(initialNote.category || '')
        }
       
    }, [initialNote]) 

    const resetForm = () => {
        setNoteTitle('')
        setNoteText('')
        setNoteCategory('')
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (noteText.trim() === '' && noteTitle.trim() === '') {
            alert('Add title and or text')
            return;
        }

        if (noteCategory === '' || noteCategory === 'SELECT CATEGORY') {
            alert('Choose category')
            return;
        }
        if (initialNote) {
            onUpdateNote({
                ...initialNote,
                title: noteTitle,
                text: noteText,
                category: noteCategory,
                updatedDate: new Date(),
            })
        } else if (noteText.trim() || noteTitle.trim()) {
            addNote(noteText, noteTitle, noteCategory)
            resetForm()
        }
    }

    const formClass = initialNote ? "note-form in-modal" : "note-form";

    const selectData = categories.map((cat) => ({
    value: cat.value,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px' }}>{cat.icon}</span>
        <span>{cat.label}</span>
      </div>
    ),
    }))

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
            <select data={selectData} value ={noteCategory} onChange = {(e) => setNoteCategory(e.target.value)} className="note-category-select" >
                <option value="" disabled>
                    Select Category...
                </option>
                {categories && categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                    <span style={{ marginRight: '8px' }}>{cat.icon}</span>
                    {cat.label}
                </option>
              ))}
            </select>
            <button type="submit">{initialNote ? 'Update Note' : 'Add Note'} </button>
        </form>
    )
}
export default NoteForm