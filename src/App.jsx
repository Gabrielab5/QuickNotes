import React, { useState } from 'react'
import NoteForm from './components/NoteForm';
import NoteItem from './components/NoteItem';
import './App.css'

function App() {
  const [notes, setNotes] = useState([])

  const addNote = (text, title) => {
    const newNote = {id: Date.now(), title, text, date: new Date(), }
    setNotes([...notes, newNote])
  }

  const deleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter((note => note.id !== noteId)))
    }
  }

  return (
    <div className="app-container">
      <h1>QuickNotes</h1>
      <NoteForm addNote={addNote} />
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} onDelete= { () => deleteNote(note.id)}/>
        ))}
      </div>
    </div>
  )
}

export default App
