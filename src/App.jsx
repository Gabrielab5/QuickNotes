import React, { useState, useEffect } from 'react'
import NoteForm from './components/NoteForm'
import NoteItem from './components/NoteItem'
import NoteModal from './components/NoteModal'
import './App.css'
import { useDisclosure } from '@mantine/hooks'
import { FaUser, FaBriefcase, FaGraduationCap, FaQuestionCircle, FaShoppingCart, FaLightbulb, FaHeartbeat, FaDollarSign } from 'react-icons/fa'

const CATEGORIES = [
  { value: 'Personal', label: 'Personal', color: '#BDECB6' , icon: <FaUser /> }, 
  { value: 'Work', label: 'Work', color: '#A0D2EB', icon: <FaBriefcase /> },      
  { value: 'Study', label: 'Study', color: '#FCD79B', icon: <FaGraduationCap /> },       
  { value: 'Other', label: 'Other', color: '#E9E9E9', icon: <FaQuestionCircle /> },      
  { value: 'Shopping', label: 'Shopping', color: '#B0A8F2', icon: <FaShoppingCart /> }, 
  { value: 'Ideas', label: 'Ideas', color: '#E9A6A6', icon: <FaLightbulb /> },     
  { value: 'Health', label: 'Health', color: '#A8F2D0', icon: <FaHeartbeat /> },     
  { value: 'Finance', label: 'Finance', color: '#D9D28B', icon: <FaDollarSign /> },   
]

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes')
    return savedNotes ? JSON.parse(savedNotes ) : []
  })
  const [opened, { open, close }] = useDisclosure(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')

  useEffect(() => {
    fetchNotes();
  }, [])

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/notes');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async (text, title, category) => {
    try{
      const response = await fetch('http://localhost:3001/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, title, category }),
      })
      const newNote = await response.json()
      setNotes([...notes, newNote])
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }

  const updateNote = async (updatedNote) => {
    try {
      await fetch(`http://localhost:3001/api/notes/${updatedNote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedNote),
      });
    setNotes(notes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    ));
    close(); 
    } catch (error) {
      console.error('Error updating note:', error);
    } 
  };

  const deleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await fetch(`http://localhost:3001/api/notes/${noteId}`, {
          method: 'DELETE',
        }); 
      setNotes(notes.filter((note => note.id !== noteId)))
      } catch (error){
        console.error('Error deleting note:', error);
      }
    }
  }

  const handleNoteClick = (note) => {
    setSelectedNote(note)
    open()
  }

  const getCategoryColor = (category) => {
    const foundCategory = CATEGORIES.find(cat => cat.value === category)
    return foundCategory ? foundCategory.color : '#d8d3d3ff'
  }

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'All' || note.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="app-container">
      <h1>QuickNotes</h1>
      <div className="filter-controls">
        <input 
          type="text" 
          placeholder="Search notes..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="category-buttons">
          <button 
            onClick={() => setFilterCategory('All')} 
            className={filterCategory === 'All' ? 'active' : ''}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat.value} 
              onClick={() => setFilterCategory(cat.value)}
              className={filterCategory === cat.value ? 'active' : ''}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      <NoteForm addNote={addNote} categories={CATEGORIES} />
      <div className="notes-grid">
        {filteredNotes.map((note) => (
          <NoteItem key={note.id} note={note} onDelete= { () => deleteNote(note.id)} onNoteClick={() => handleNoteClick(note)}/>
        ))}
      </div>
      <NoteModal 
        opened={opened}
        onClose={close}
        note={selectedNote}
        modalColor={selectedNote ? getCategoryColor(selectedNote.category) : '#eec8fb'}
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
