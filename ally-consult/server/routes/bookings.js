const express = require('express')
const Booking = require('../models/Booking')
const router = express.Router()

// POST - Create new booking
router.post('/', async (req, res) => {
  try {
    const { name, email, date, time } = req.body

    // Validation
    if (!name || !email || !date || !time) {
      return res.status(400).json({ 
        error: 'All fields are required' 
      })
    }

    // Check if date is in the past
    const bookingDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (bookingDate < today) {
      return res.status(400).json({
        error: 'Cannot book sessions in the past'
      })
    }

    // Check for duplicate bookings (same date/time)
    const existingBooking = await Booking.findOne({ date: bookingDate, time })
    if (existingBooking) {
      return res.status(409).json({
        error: 'This time slot is already booked. Please choose another time.'
      })
    }

    // Create booking
    const booking = await Booking.create({
      name,
      email,
      date: bookingDate,
      time
    })

    console.log('✅ New booking created:', booking._id)

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: {
        id: booking._id,
        name: booking.name,
        email: booking.email,
        date: booking.date,
        time: booking.time
      }
    })
  } catch (err) {
    console.error('❌ Booking error:', err)
    
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message)
      return res.status(400).json({ error: messages.join(', ') })
    }

    res.status(500).json({ 
      error: 'Failed to create booking. Please try again.' 
    })
  }
})

// GET - Fetch all bookings (for admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .select('-__v')
    
    res.json({ 
      success: true,
      count: bookings.length,
      bookings 
    })
  } catch (err) {
    console.error('❌ Fetch error:', err)
    res.status(500).json({ error: 'Failed to fetch bookings' })
  }
})

// GET - Fetch single booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).select('-__v')
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }

    res.json({ success: true, booking })
  } catch (err) {
    console.error('❌ Fetch error:', err)
    res.status(500).json({ error: 'Failed to fetch booking' })
  }
})

// DELETE - Cancel booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id)
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }

    res.json({ 
      success: true, 
      message: 'Booking cancelled successfully' 
    })
  } catch (err) {
    console.error('❌ Delete error:', err)
    res.status(500).json({ error: 'Failed to cancel booking' })
  }
})

module.exports = router