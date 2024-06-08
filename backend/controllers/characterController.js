const express = require('express');
const router = express.Router();
const Character = require('../models/Character');
const validateJWT = require('./validateJWT');

// Apply middleware to all routes
router.use(validateJWT);

// Get all characters for the logged-in user
router.get('/', async (req, res) => {
  try {
    const characters = await Character.find({ userId: req.user.userId });
    res.json(characters);
  } catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get character by ID
router.get('/:characterId', async (req, res) => {
  try {
    const character = await Character.findById(req.params.characterId);
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.json(character);
  } catch (error) {
    console.error('Error fetching character:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create new character
router.post('/new', async (req, res) => {
  try {
    const character = new Character({ ...req.body, userId: req.user.userId });
    await character.save();
    res.status(201).json(character);
  } catch (error) {
    console.error('Error creating character:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update character by ID
router.put('/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const character = await Character.findByIdAndUpdate(characterId, req.body, { new: true });
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.json(character);
  } catch (error) {
    console.error('Error updating character:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete character by ID
router.delete('/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const character = await Character.findByIdAndDelete(characterId);
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.json({ message: 'Character deleted successfully' });
  } catch (error) {
    console.error('Error deleting character:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;