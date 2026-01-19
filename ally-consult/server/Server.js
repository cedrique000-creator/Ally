const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = require('./app')

// Validate environment variables
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI not found in environment variables')
  console.error('Please create a .env file with MONGO_URI')
  process.exit(1)
}

const PORT = process.env.PORT || 5000
let server

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully')
    console.log(`   Database: ${mongoose.connection.name}`)
    console.log(`   Host: ${mongoose.connection.host}`)
    
    // Start server
    server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
      console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`)
      console.log(`   Health check: http://localhost:${PORT}/api/health`)
    })
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  })

// MongoDB event listeners
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected')
})

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB runtime error:', err)
})

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`)
  
  if (server) {
    server.close(async () => {
      console.log('✅ HTTP server closed')
      
      try {
        await mongoose.connection.close()
        console.log('✅ MongoDB connection closed')
        process.exit(0)
      } catch (err) {
        console.error('❌ Error during shutdown:', err)
        process.exit(1)
      }
    })
    
    // Force shutdown after 10 seconds
    setTimeout(() => {
      console.error('❌ Forced shutdown after timeout')
      process.exit(1)
    }, 10000)
  }
}

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

// Handle uncaught errors
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err)
  gracefulShutdown('uncaughtException')
})

process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err)
  gracefulShutdown('unhandledRejection')
})