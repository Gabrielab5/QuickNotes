import React from 'react';
import { Modal } from '@mantine/core';

function NoteModal({ opened, onClose, note, formComponent , classNames}) {
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
    >
     {formComponent}
    </Modal>
  );
}

export default NoteModal;