// routes/optionRoutes.js - CRUD operation routes

const express = require('express');
const router = express.Router();
const OptionData = require('../models/OptionData');

// CREATE - Add a new option data record
router.post('/', async (req, res) => {
  try {
    const optionData = new OptionData(req.body);
    const savedData = await optionData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ - Get all option data records
router.get('/', async (req, res) => {
  try {
    const optionData = await OptionData.find();
    res.json(optionData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ - Get option data by Ticker
router.get('/ticker/:ticker', async (req, res) => {
  try {
    const optionData = await OptionData.find({ Ticker: req.params.ticker });
    if (!optionData.length) {
      return res.status(404).json({ message: 'No data found for this ticker' });
    }
    res.json(optionData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ - Get option data by Date
router.get('/date/:date', async (req, res) => {
  try {
    const optionData = await OptionData.find({ Date: req.params.date });
    if (!optionData.length) {
      return res.status(404).json({ message: 'No data found for this date' });
    }
    res.json(optionData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE - Update option data by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedData = await OptionData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedData) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(updatedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Delete option data by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedData = await OptionData.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE - Delete all option data for a specific Ticker
router.delete('/ticker/:ticker', async (req, res) => {
  try {
    const result = await OptionData.deleteMany({ Ticker: req.params.ticker });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No records found for this ticker' });
    }
    res.json({ message: `${result.deletedCount} records deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// AGGREGATE - Get sum of Open, High, Low, and Close for all records
router.get('/summary', async (req, res) => {
  try {
    const summary = await OptionData.aggregate([
      {
        $group: {
          _id: null,
          totalOpen: { $sum: '$Open' },
          totalHigh: { $sum: '$High' },
          totalLow: { $sum: '$Low' },
          totalClose: { $sum: '$Close' },
          count: { $sum: 1 }
        }
      }
    ]);
    
    if (summary.length === 0) {
      return res.status(404).json({ message: 'No data available' });
    }
    
    res.json({
      totalOpen: summary[0].totalOpen,
      totalHigh: summary[0].totalHigh,
      totalLow: summary[0].totalLow,
      totalClose: summary[0].totalClose,
      recordCount: summary[0].count
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;