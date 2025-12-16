const express = require('express');
const cors = require('cors');
const path = require('path');

const animalsRoutes = require('./routes/animals');
const bookingsRoutes = require('./routes/bookings');
const ticketsRoutes = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/animals', animalsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/tickets', ticketsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Zoo Backend API is running' });
});

app.listen(PORT, () => {
  console.log(`🦁 Zoo Backend Server running on http://localhost:${PORT}`);
});
