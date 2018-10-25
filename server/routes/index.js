import express from 'express';

import notesController from '../controllers/notesController';

const router = express.Router();

router.get("/notes", notesController.getAllNotes);
router.get("/note", notesController.getNote);
router.post("/note", notesController.postNote);
router.put("/note/:id", notesController.putNote);
router.delete("/note/:id", notesController.deleteNote);
router.options("/*", notesController.options);

export default router;
