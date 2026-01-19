import { useState } from 'react'
import API_URL from '../config'

export default function BookSession() {
  const [data, setData] = useState({
    name: '',
    email: '',
    date: '',
    time: ''
  })
  const [msg, setMsg] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    setError(false)

    try {
      console.log('Submitting to:', `${API_URL}/api/bookings`)
      
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await res.json()
      console.log('Response:', result)
      
      if (!res.ok) {
        setError(true)
        setMsg(result.error || 'Something went wrong')
      } else {
        setError(false)
        setMsg('✅ Session booked successfully! We\'ll send confirmation to your email.')
        // Clear form on success
        setData({ name: '', email: '', date: '', time: '' })
      }
    } catch (err) {
      setError(true)
      setMsg('❌ Unable to connect to server. Please check if the backend is running.')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0]

  return (
    <section>
      <div className="container">
        <div className="form-wrapper">
          <h2>Book a Strategy Session</h2>
          <p>Choose a time that works for you. We'll discuss your goals and create a custom growth plan.</p>

          {/* Success/Error Messages */}
          {msg && (
            <div className={error ? 'form-error' : 'form-success'}>
              {msg}
            </div>
          )}

          <form onSubmit={submit}>
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input 
                id="name"
                type="text"
                placeholder="John Smith" 
                value={data.name}
                onChange={e => setData({ ...data, name: e.target.value })} 
                required
                disabled={loading}
                minLength={2}
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input 
                id="email"
                type="email"
                placeholder="john@company.com" 
                value={data.email}
                onChange={e => setData({ ...data, email: e.target.value })} 
                required
                disabled={loading}
              />
            </div>

            {/* Date & Time Grid */}
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="date">Preferred Date *</label>
                <input 
                  id="date"
                  type="date" 
                  value={data.date}
                  onChange={e => setData({ ...data, date: e.target.value })} 
                  required
                  disabled={loading}
                  min={today}
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Preferred Time *</label>
                <select 
                  id="time"
                  value={data.time}
                  onChange={e => setData({ ...data, time: e.target.value })}
                  required
                  disabled={loading}
                >
                  <option value="">Select a time</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-submit">
              <button 
                type="submit" 
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </button>
              <span className="form-note">
                Free • 30 minutes • No commitment required
              </span>
            </div>
          </form>

          {/* Debug info (remove in production) */}
          {process.env.NODE_ENV === 'development' && (
            <div style={{ marginTop: '2rem', padding: '1rem', background: '#f3f4f6', borderRadius: '8px', fontSize: '0.85rem' }}>
              <strong>Debug Info:</strong>
              <div>API URL: {API_URL}</div>
              <div>Environment: {import.meta.env.MODE}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}