import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/dashboard/metrics
// @desc    Get dashboard metrics for rental properties
// @access  Private
router.get('/metrics', protect, async (req, res) => {
  try {
    // Mock data - replace with real data fetching later
    const metrics = {
      totalRevenue: 28450,
      occupancyRate: 78,
      totalBookings: 24,
      avgPricePerNight: 185.50,
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

// @route   GET /api/dashboard/pricing-suggestions
// @desc    Get AI-powered pricing suggestions
// @access  Private
router.get('/pricing-suggestions', protect, async (req, res) => {
  try {
    const suggestions = {
      currentPrice: 185.50,
      suggestedPrice: 195.75,
      confidence: 0.87,
      reasoning: 'Alta demanda nos finais de semana e feriados próximos',
      occupancyTrend: 'upward'
    };

    res.status(200).json({
      success: true,
      data: suggestions
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/dashboard/bookings
// @desc    Get recent bookings
// @access  Private
router.get('/bookings', protect, async (req, res) => {
  try {
    const bookings = [
      {
        id: 1,
        guestName: 'João Silva',
        checkIn: '2024-01-15',
        checkOut: '2024-01-20',
        nights: 5,
        totalPrice: 927.50,
        platform: 'Airbnb',
        status: 'confirmed'
      },
      {
        id: 2,
        guestName: 'Maria Santos',
        checkIn: '2024-01-22',
        checkOut: '2024-01-25',
        nights: 3,
        totalPrice: 556.50,
        platform: 'Booking.com',
        status: 'confirmed'
      }
    ];

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
