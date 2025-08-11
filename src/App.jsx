import React, { useState, useEffect } from 'react'
import NoteForm from './components/NoteForm'
import NoteItem from './components/NoteItem'
import NoteModal from './components/NoteModal'
import './App.css'
import { useDisclosure } from '@mantine/hooks'

const CATEGORIES = [
  { value: 'Personal', label: 'Personal', color: '#BDECB6' }, 
  { value: 'Work', label: 'Work', color: '#A0D2EB' },      
  { value: 'Study', label: 'Study', color: '#FCD79B' },       
  { value: 'Other', label: 'Other', color: '#E9E9E9' },      
  { value: 'Shopping', label: 'Shopping', color: '#B0A8F2' }, 
  { value: 'Ideas', label: 'Ideas', color: '#E9A6A6' },     
  { value: 'Health', label: 'Health', color: '#A8F2D0' },     
  { value: 'Finance', label: 'Finance', color: '#D9D28B' },   
]

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes')
    return savedNotes ? JSON.parse(savedNotes ) : []
  })
  const [opened, { open, close }] = useDisclosure(false)
  const [selectedNote, setSelectedNote] = useState(null)

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])


  const addNote = (text, title, category) => {
    const newNote = {id: Date.now(), title, text, date: new Date(), category:category }
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
      <NoteForm addNote={addNote} categories={CATEGORIES} />
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
            <NoteForm key={selectedNote.id} initialNote={selectedNote} onUpdateNote={updateNote} onClose={close} categories={CATEGORIES}/>
          )
        }
      />
    </div>    
  )
}

export default App
