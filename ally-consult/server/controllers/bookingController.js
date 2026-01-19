const Booking = require('../models/Booking')

exports.createBooking = async (req, res) => {
  const { name, email, date, time } = req.body

  const exists = await Booking.findOne({ date, time })
  if (exists) return res.status(400).json({ error: 'Slot unavailable' })

  const booking = await Booking.create({ name, email, date, time })
  res.json(booking)
}

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find()
  res.json(bookings)
}
