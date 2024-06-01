const express = require('express');
const router = express.Router();
const CharacterNote = require('../models/CharacterNote');

// Index - GET - /character-notes
router.get('/', async (req, res) => {
  try {
    const characterNotes = await CharacterNote.find();
    res.json(characterNotes);
  } catch (error) {
    console.error('Error fetching character notes:', error);
    res.status(500).json({ error: 'Failed to fetch character notes' });
  }
});

// Show - GET - /character-notes/:id
router.get('/:id', async (req, res) => {
  try {
    const characterNote = await CharacterNote.findById(req.params.id);
    if (!characterNote) {
      return res.status(404).json({ message: 'Character note not found' });
    }
    res.json(characterNote);
  } catch (error) {
    console.error('Error fetching character note by ID:', error);
    res.status(500).json({ error: 'Failed to fetch character note' });
  }
});

// Create - POST - /character-notes
router.post('/', async (req, res) => {
  try {
    const newCharacterNote = await CharacterNote.create(req.body);
    res.status(201).json(newCharacterNote);
  } catch (error) {
    console.error('Error creating character note:', error);
    res.status(500).json({ error: 'Failed to create character note' });
  }
});

// Update - PUT - /character-notes/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedCharacterNote = await CharacterNote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCharacterNote);
  } catch (error) {
    console.error('Error updating character note:', error);
    res.status(500).json({ error: 'Failed to update character note' });
  }
});

// Delete - DELETE - /character-notes/:id
router.delete('/:id', async (req, res) => {
  try {
    await CharacterNote.findByIdAndDelete(req.params.id);
    res.json({ message: 'Character note deleted successfully' });
  } catch (error) {
    console.error('Error deleting character note:', error);
    res.status(500).json({ error: 'Failed to delete character note' });
  }
});

module.exports = router;