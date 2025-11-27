import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { sendFormNotificationEmail } from './lib/email.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware - CORS configuration
// Allow multiple origins for development and production
const allowedOrigins = [
  process.env.FRONTEND_URL, // Production URL (e.g., https://www.divisy.co)
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3005',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:3005',
].filter(Boolean) // Remove undefined values

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      callback(null, true)
    } else {
      // In production, only allow configured frontend URL
      if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'divisy-api' })
})

// Form submission endpoint
app.post('/api/submit-form', async (req, res) => {
  try {
    const { type, data } = req.body

    // Validate form type
    if (!['contact', 'job-application', 'recruiter-request'].includes(type)) {
      return res.status(400).json({ error: 'Invalid form type' })
    }

    // Generate submission ID
    const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Log submission
    console.log('Form submission received:', {
      type,
      timestamp: new Date().toISOString(),
      email: data.email || data.linkedinProfile || 'N/A',
      submissionId,
    })

    // Send email notification
    const emailResult = await sendFormNotificationEmail({
      type,
      data,
      submissionId,
    })

    if (!emailResult.success) {
      console.error('Failed to send email notification:', emailResult.error)
      // Continue processing even if email fails
    } else {
      console.log('Email notification sent successfully:', emailResult.id)
    }

    return res.json({
      success: true,
      message: 'Form submitted successfully',
      submissionId,
      emailSent: emailResult.success,
    })
  } catch (error) {
    console.error('Form submission error:', error)
    return res.status(500).json({
      error: 'Failed to submit form',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Divisy API server running on port ${PORT}`)
  console.log(`📧 Email service: ${process.env.RESEND_API_KEY ? 'Configured' : 'Not configured'}`)
})

