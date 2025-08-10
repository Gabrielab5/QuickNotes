import React from 'react'

function NoteItem({ note , onDelete, onNoteClick}) {
  const { title, text, date } = note
  const formattedDate = new Date(date).toLocaleString()

  return (
    <div className="note"  onClick={onNoteClick}>
      {title && <h3>{title}</h3>} 
      <p>{text}</p>
      <div className= "note-footer">
        <small>{formattedDate}</small>
        <button className="delete-button" onClick ={onDelete}>x</button>
      </div>
    </div>
  )
}

export default NoteItem