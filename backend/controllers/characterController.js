const express = require('express');
const router = express.Router();
const Character = require('../models/Character');

// Index - GET - /characters
router.get('/', async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).json({ error: 'Failed to fetch characters' });
  }
});

// Show - GET - /characters/:id
router.get('/:id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.json(character);
  } catch (error) {
    console.error('Error fetching character by ID:', error);
    res.status(500).json({ error: 'Failed to fetch character' });
  }
});

// Create - POST - /characters
router.post('/', async (req, res) => {
  try {
    const newCharacter = await Character.create(req.body);
    res.status(201).json(newCharacter);
  } catch (error) {
    console.error('Error creating character:', error);
    res.status(500).json({ error: 'Failed to create character' });
  }
});

// Update - PUT - /characters/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedCharacter = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCharacter);
  } catch (error) {
    console.error('Error updating character:', error);
    res.status(500).json({ error: 'Failed to update character' });
  }
});

// Delete - DELETE - /characters/:id
router.delete('/:id', async (req, res) => {
  try {
    await Character.findByIdAndDelete(req.params.id);
    res.json({ message: 'Character deleted successfully' });
  } catch (error) {
    console.error('Error deleting character:', error);
    res.status(500).json({ error: 'Failed to delete character' });
  }
});

module.exports = router;