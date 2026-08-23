import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/dashboard/metrics
// @desc    Get dashboard metrics
// @access  Private
router.get('/metrics', protect, async (req, res) => {
  try {
    // Mock data - replace with real data fetching later
    const metrics = {
      totalSales: 15250,
      totalProducts: 48,
      averageTicket: 318.75,
      monthlyGrowth: 23,
      lastUpdated: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      data: metrics
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/dashboard/sales
// @desc    Get sales data
// @access  Private
router.get('/sales', protect, async (req, res) => {
  try {
    const salesData = [
      { date: '2024-01-01', amount: 1200 },
      { date: '2024-01-02', amount: 1900 },
      { date: '2024-01-03', amount: 1500 },
      { date: '2024-01-04', amount: 2200 },
      { date: '2024-01-05', amount: 1800 }
    ];

    res.status(200).json({
      success: true,
      data: salesData
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
