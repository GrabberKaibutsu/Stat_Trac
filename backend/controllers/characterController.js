const express = require('express');
const router = express.Router();
const Character = require('../models/Character');

router.get('/:characterId', async (req, res) => {
    try {
      const { characterId } = req.params;
      const character = await Character.findById(characterId);
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
  router.post('/', async (req, res) => {
    try {
      const character = new Character(req.body);
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