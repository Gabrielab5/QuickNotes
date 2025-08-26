import { Router } from 'express';
const router = Router();
import notesController from './notesController';

router.get('/', notesController.getNotes);
router.post('/', notesController.addNote);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

export default router;