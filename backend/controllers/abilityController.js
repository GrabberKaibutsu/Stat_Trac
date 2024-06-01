const express = require('express');
const router = express.Router();
const Ability = require('../models/Ability');

// Index - GET - /abilities
router.get('/', async (req, res) => {
  try {
    const abilities = await Ability.find();
    res.json(abilities);
  } catch (error) {
    console.error('Error fetching abilities:', error);
    res.status(500).json({ error: 'Failed to fetch abilities' });
  }
});

// Show - GET - /abilities/:id
router.get('/:id', async (req, res) => {
  try {
    const ability = await Ability.findById(req.params.id);
    if (!ability) {
      return res.status(404).json({ message: 'Ability not found' });
    }
    res.json(ability);
  } catch (error) {
    console.error('Error fetching ability by ID:', error);
    res.status(500).json({ error: 'Failed to fetch ability' });
  }
});

// Create - POST - /abilities
router.post('/', async (req, res) => {
  try {
    const newAbility = await Ability.create(req.body);
    res.status(201).json(newAbility);
  } catch (error) {
    console.error('Error creating ability:', error);
    res.status(500).json({ error: 'Failed to create ability' });
  }
});

// Update - PUT - /abilities/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedAbility = await Ability.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAbility);
  } catch (error) {
    console.error('Error updating ability:', error);
    res.status(500).json({ error: 'Failed to update ability' });
  }
});

// Delete - DELETE - /abilities/:id
router.delete('/:id', async (req, res) => {
  try {
    await Ability.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ability deleted successfully' });
  } catch (error) {
    console.error('Error deleting ability:', error);
    res.status(500).json({ error: 'Failed to delete ability' });
  }
});

module.exports = router;