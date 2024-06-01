const express = require('express');
const router = express.Router();
const SavingThrow = require('../models/SavingThrow');

// Index - GET - /saving-throws
router.get('/', async (req, res) => {
  try {
    const savingThrows = await SavingThrow.find();
    res.json(savingThrows);
  } catch (error) {
    console.error('Error fetching saving throws:', error);
    res.status(500).json({ error: 'Failed to fetch saving throws' });
  }
});

// Show - GET - /saving-throws/:id
router.get('/:id', async (req, res) => {
  try {
    const savingThrow = await SavingThrow.findById(req.params.id);
    if (!savingThrow) {
      return res.status(404).json({ message: 'Saving throw not found' });
    }
    res.json(savingThrow);
  } catch (error) {
    console.error('Error fetching saving throw by ID:', error);
    res.status(500).json({ error: 'Failed to fetch saving throw' });
  }
});

// Create - POST - /saving-throws
router.post('/', async (req, res) => {
  try {
    const newSavingThrow = await SavingThrow.create(req.body);
    res.status(201).json(newSavingThrow);
  } catch (error) {
    console.error('Error creating saving throw:', error);
    res.status(500).json({ error: 'Failed to create saving throw' });
  }
});

// Update - PUT - /saving-throws/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedSavingThrow = await SavingThrow.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSavingThrow);
  } catch (error) {
    console.error('Error updating saving throw:', error);
    res.status(500).json({ error: 'Failed to update saving throw' });
  }
});

// Delete - DELETE - /saving-throws/:id
router.delete('/:id', async (req, res) => {
  try {
    await SavingThrow.findByIdAndDelete(req.params.id);
    res.json({ message: 'Saving throw deleted successfully' });
  } catch (error) {
    console.error('Error deleting saving throw:', error);
    res.status(500).json({ error: 'Failed to delete saving throw' });
  }
});

module.exports = router;