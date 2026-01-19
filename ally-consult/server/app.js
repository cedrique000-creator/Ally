const express = require('express')
const cors = require('cors')
const bookingsRouter = require('./routes/bookings')

const app = express()

// CORS - Allow your frontend domain
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://ally-consult.vercel.app', // Add your actual frontend URL later
  /\.vercel\.app$/ // Allow all Vercel preview deployments
]

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.some(allowed => {
      if (allowed instanceof RegExp) return allowed.test(origin)
      return allowed === origin
    })) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logger (development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
  })
}

// Routes
app.use('/api/bookings', bookingsRouter)

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Ally Consult API',
    status: 'running',
    endpoints: {
      health: '/api/health',
      bookings: '/api/bookings'
    }
  })
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Ally Consult API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path 
  })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err)
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

module.exports = app