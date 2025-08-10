import React from 'react';
import { Modal } from '@mantine/core';

function NoteModal({ opened, onClose, note, classNames }) {
  if (!note) return null; 

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={note.title || "Note"}
      size="lg"
      centered
      classNames={classNames}
    >
      <div>
        <p>{note.text}</p>
        <small>Created: {new Date(note.date).toLocaleString()}</small>
      </div>
    </Modal>
  );
}

export default NoteModal;