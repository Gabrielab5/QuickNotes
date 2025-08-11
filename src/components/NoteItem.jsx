import React from 'react'

function NoteItem({ note , onDelete, onNoteClick}) {
  const { title, text, date , updatedDate } = note
  const formattedDate = new Date(date).toLocaleString()
  const formattedUpdatedDate = updatedDate ? new Date(updatedDate).toLocaleString() : null;

  return (
    <div className="note"  onClick={onNoteClick}>
      {title && <h3>{title}</h3>} 
      <p>{text}</p>
      <div className= "note-footer">
         <div className="note-dates">
        <small>Created: {formattedDate}</small>
         {formattedUpdatedDate && <small>Updated: {formattedUpdatedDate}</small>}
        </div>
        <button className="delete-button" onClick ={(e) => { e.stopPropagation(); onDelete(); }}>x</button>
      </div>
    </div>
  )
}

export default NoteItem