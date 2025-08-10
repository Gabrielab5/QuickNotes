import React from 'react'

function NoteItem({ note }) {
  const { text, date } = note
  const formattedDate = new Date(date).toLocaleString()

  return (
    <div className="note">
      <p>{text}</p>
      <small>{formattedDate}</small>
    </div>
  )
}

export default NoteItem