const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

router.get('/:skillId', async (req, res) => {
    try {
      const { skillId } = req.params;
      const skill = await Skill.findById(skillId).populate('characterId');
      if (!skill) {
        return res.status(404).json({ message: 'Skill not found' });
      }
      res.json(skill);
    } catch (error) {
      console.error('Error fetching skill:', error);
      res.status(500).json({ message: error.message });
    }
  });
  
  // Create new skill
  router.post('/', async (req, res) => {
    try {
      const skill = new Skill(req.body);
      await skill.save();
      res.status(201).json(skill);
    } catch (error) {
      console.error('Error creating skill:', error);
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update skill by ID
  router.put('/:skillId', async (req, res) => {
    try {
      const { skillId } = req.params;
      const skill = await Skill.findByIdAndUpdate(skillId, req.body, { new: true });
      if (!skill) {
        return res.status(404).json({ message: 'Skill not found' });
      }
      res.json(skill);
    } catch (error) {
      console.error('Error updating skill:', error);
      res.status(500).json({ message: error.message });
    }
  });
  
  // Delete skill by ID
  router.delete('/:skillId', async (req, res) => {
    try {
      const { skillId } = req.params;
      const skill = await Skill.findByIdAndDelete(skillId);
      if (!skill) {
        return res.status(404).json({ message: 'Skill not found' });
      }
      res.json({ message: 'Skill deleted successfully' });
    } catch (error) {
      console.error('Error deleting skill:', error);
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;