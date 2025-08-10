import React, { useState } from 'react'
import NoteForm from './components/NoteForm'
import NoteItem from './components/NoteItem'
import NoteModal from './components/NoteModal'
import './App.css'
import { useDisclosure } from '@mantine/hooks'

function App() {
  const [notes, setNotes] = useState([])
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const addNote = (text, title) => {
    const newNote = {id: Date.now(), title, text, date: new Date(), }
    setNotes([...notes, newNote])
  }

  const updateNote = (updatedNote) => {
    setNotes(notes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    ));
    close(); 
  };

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
      <NoteModal 
        opened={opened}
        onClose={close}
        note={selectedNote}
        classNames={{
          modal: 'custom-modal-wrapper',
          body: 'custom-modal-body',
        }}
        formComponent={
          selectedNote && (
            <NoteForm key={selectedNote.id} initialNote={selectedNote} onUpdateNote={updateNote} onClose={close}/>
          )
        }
      />
    </div>    
  )
}

export default App
