import nanoid from 'nanoid';

let notes = [];

const notesModel = {
  findAll: () => {
    return notes;
  },

  create: (title, text, category) => {
    const newNote = {
      id: nanoid(),
      title,
      text,
      category,
      date: new Date().toISOString(),
      updatedDate: null,
    };
    notes.push(newNote);
    return newNote;
  },

  findByIdAndUpdate: (id, title, text, category) => {
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      return null;
    }
    const updatedNote = {
      ...notes[noteIndex],
      title,
      text,
      category,
      updatedDate: new Date().toISOString(),
    };
    notes[noteIndex] = updatedNote;
    return updatedNote;
  },

  findByIdAndDelete: (id) => {
    const initialLength = notes.length;
    notes = notes.filter(note => note.id !== id);
    return notes.length < initialLength;
  }
};

export default notesModel;