import React, { useState } from 'react'
import NoteForm from './components/NoteForm'
import NoteItem from './components/NoteItem'
import './App.css'
import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

function App() {
  const [notes, setNotes] = useState([])
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const addNote = (text, title) => {
    const newNote = {id: Date.now(), title, text, date: new Date(), }
    setNotes([...notes, newNote])
  }

  const deleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter((note => note.id !== noteId)))
    }
  }

  const handleNoteClick = (note) => {
    setSelectedNote(note)
    open()
  }

  return (
    <div className="app-container">
      <h1>QuickNotes</h1>
      <NoteForm addNote={addNote} />
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} onDelete= { () => deleteNote(note.id)} onNoteClick={() => handleNoteClick(note)}/>
        ))}
      </div>

       <Modal 
          opened={opened} 
          onClose={close} 
          size="lg"
          centered
          className= "modal"
        >
        {selectedNote && (
          <div>
            <p>{selectedNote.title}</p>
            <p>{selectedNote.text}</p>
            <small>Created: {new Date(selectedNote.date).toLocaleString()}</small>
          </div>
        )}
      </Modal>
    </div>

    
  )
}

export default App
