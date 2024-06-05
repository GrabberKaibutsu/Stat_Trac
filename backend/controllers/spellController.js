const express = require('express');
const router = express.Router();
const Spell = require('../models/Spell'); 


// Get spell by ID
router.get('/:spellId', async (req, res) => {
  try {
    const { spellId } = req.params;
    const spell = await Spell.findById(spellId).populate('characterId');
    if (!spell) {
      return res.status(404).json({ message: 'Spell not found' });
    }
    res.json(spell);
  } catch (error) {
    console.error('Error fetching spell:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create new spell
router.post('/', validateJWT, async (req, res) => {
  try {
    const spell = new Spell(req.body);
    await spell.save();
    res.status(201).json(spell);
  } catch (error) {
    console.error('Error creating spell:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update spell by ID
router.put('/:spellId', validateJWT, async (req, res) => {
  try {
    const { spellId } = req.params;
    const spell = await Spell.findByIdAndUpdate(spellId, req.body, { new: true });
    if (!spell) {
      return res.status(404).json({ message: 'Spell not found' });
    }
    res.json(spell);
  } catch (error) {
    console.error('Error updating spell:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete spell by ID
router.delete('/:spellId', validateJWT, async (req, res) => {
  try {
    const { spellId } = req.params;
    const spell = await Spell.findByIdAndDelete(spellId);
    if (!spell) {
      return res.status(404).json({ message: 'Spell not found' });
    }
    res.json({ message: 'Spell deleted successfully' });
  } catch (error) {
    console.error('Error deleting spell:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;