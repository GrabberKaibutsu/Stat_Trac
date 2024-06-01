const express = require('express');
const router = express.Router();
const Spell = require('../models/Spell');

// Index - GET - /spells
router.get('/', async (req, res) => {
  try {
    const spells = await Spell.find();
    res.json(spells);
  } catch (error) {
    console.error('Error fetching spells:', error);
    res.status(500).json({ error: 'Failed to fetch spells' });
  }
});

// Show - GET - /spells/:id
router.get('/:id', async (req, res) => {
  try {
    const spell = await Spell.findById(req.params.id);
    if (!spell) {
      return res.status(404).json({ message: 'Spell not found' });
    }
    res.json(spell);
  } catch (error) {
    console.error('Error fetching spell by ID:', error);
    res.status(500).json({ error: 'Failed to fetch spell' });
  }
});

// Create - POST - /spells
router.post('/', async (req, res) => {
  try {
    const newSpell = await Spell.create(req.body);
    res.status(201).json(newSpell);
  } catch (error) {
    console.error('Error creating spell:', error);
    res.status(500).json({ error: 'Failed to create spell' });
  }
});

// Update - PUT - /spells/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedSpell = await Spell.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSpell);
  } catch (error) {
    console.error('Error updating spell:', error);
    res.status(500).json({ error: 'Failed to update spell' });
  }
});

// Delete - DELETE - /spells/:id
router.delete('/:id', async (req, res) => {
  try {
    await Spell.findByIdAndDelete(req.params.id);
    res.json({ message: 'Spell deleted successfully' });
  } catch (error) {
    console.error('Error deleting spell:', error);
    res.status(500).json({ error: 'Failed to delete spell' });
  }
});

module.exports = router;