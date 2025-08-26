import notesModel from './notesModel';

const notesController = {
   getNotes: (req, res) => {
    const allNotes = notesModel.findAll();
    res.json(allNotes);
  },

  addNote: (req, res) => {
    const { title, text, category } = req.body;
    if (!text && !title) {
      return res.status(400).json({ error: 'Note must have a title or text' });
    }
    const newNote = notesModel.create(title, text, category);
    res.status(201).json(newNote);
  },

  updateNote: (req, res) => {
    const { id } = req.params;
    const { title, text, category } = req.body;

    if (!text && !title) {
      return res.status(400).json({ error: 'Note must have a title or text' });
    }

    const updatedNote = notesModel.findByIdAndUpdate(id, title, text, category);
    if (updatedNote) {
      res.json(updatedNote);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  },

  deleteNote: (req, res) => {
    const { id } = req.params;
    const deleted = notesModel.findByIdAndDelete(id);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  }
};

export default notesController;