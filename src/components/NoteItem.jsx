import React from 'react'

function NoteItem({ note , onDelete}) {
  const { text, date } = note
  const formattedDate = new Date(date).toLocaleString()

  return (
    <div className="note">
      <p>{text}</p>
    <div className= "note-footer">
      <small>{formattedDate}</small>
      <button className="delete-button" onClick ={onDelete}>x</button>
    </div>
    </div>
  )
}

export default NoteItem