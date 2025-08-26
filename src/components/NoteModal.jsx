import React from 'react';
import { Modal } from '@mantine/core';

function NoteModal({ opened, onClose, note, formComponent , classNames, modalColor}) {
  if (!note) return null; 

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={null}
      size="lg"
      centered
      classNames={classNames}
      padding= {0}
      withCloseButton={false}
      style={{
        backgroundColor: modalColor,
        border: `1px solid ${modalColor}`, 
        borderRadius: '8px',
      }}
    >
     {formComponent}
    </Modal>
  );
}

export default NoteModal;