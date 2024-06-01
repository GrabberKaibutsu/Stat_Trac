const express = require('express');
const router = express.Router();
const Feature = require('../models/Feature');

// Index - GET - /features
router.get('/', async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (error) {
    console.error('Error fetching features:', error);
    res.status(500).json({ error: 'Failed to fetch features' });
  }
});

// Show - GET - /features/:id
router.get('/:id', async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    res.json(feature);
  } catch (error) {
    console.error('Error fetching feature by ID:', error);
    res.status(500).json({ error: 'Failed to fetch feature' });
  }
});

// Create - POST - /features
router.post('/', async (req, res) => {
  try {
    const newFeature = await Feature.create(req.body);
    res.status(201).json(newFeature);
  } catch (error) {
    console.error('Error creating feature:', error);
    res.status(500).json({ error: 'Failed to create feature' });
  }
});

// Update - PUT - /features/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedFeature = await Feature.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFeature);
  } catch (error) {
    console.error('Error updating feature:', error);
    res.status(500).json({ error: 'Failed to update feature' });
  }
});

// Delete - DELETE - /features/:id
router.delete('/:id', async (req, res) => {
  try {
    await Feature.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feature deleted successfully' });
  } catch (error) {
    console.error('Error deleting feature:', error);
    res.status(500).json({ error: 'Failed to delete feature' });
  }
});

module.exports = router;