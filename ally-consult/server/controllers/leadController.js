const Lead = require('../models/Lead')
const sendEmail = require('../utils/sendEmail')

exports.createLead = async (req, res) => {
  try {
    const { name, email, message } = req.body

    const lead = await Lead.create({ name, email, message })

    // Email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: 'New Strategy Session Booking',
      html: `
        <h3>New Lead</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `
    })

    // Confirmation to client
    await sendEmail({
      to: email,
      subject: 'Your Strategy Session Request',
      html: `
        <p>Hello ${name},</p>
        <p>Thank you for booking a free strategy session with ALLY Consult.</p>
        <p>We will contact you shortly to confirm your session.</p>
      `
    })

    res.status(201).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Email failed' })
  }
}
