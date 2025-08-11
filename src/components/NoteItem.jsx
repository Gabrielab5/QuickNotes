import React from 'react'

function NoteItem({ note , onDelete, onNoteClick}) {
  const { title, text, date , updatedDate, category } = note
  const formattedDate = new Date(date).toLocaleString()
  const formattedUpdatedDate = updatedDate ? new Date(updatedDate).toLocaleString() : null;

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Personal': return '#BDECB6'
      case 'Work': return '#A0D2EB'
      case 'Study': return '#FCD79B'
      case 'Other': return '#E9E9E9'
      case 'Shopping': return '#B0A8F2'
      case 'Ideas': return '#E9A6A6'
      case 'Health': return '#A8F2D0'
      case 'Finance': return '#D9D28B'
      default: return '#d8d3d3ff'
    }
  }

  return (
    <div className="note"  onClick={onNoteClick} style={{ backgroundColor: getCategoryColor(category) }}>
      {category && <div className="note-category">{category}</div>}
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