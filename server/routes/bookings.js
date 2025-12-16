const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/bookings.json');

// Helper functions
const readData = () => {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET all bookings
router.get('/', (req, res) => {
    try {
        const bookings = readData();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read bookings data' });
    }
});

// GET single booking
router.get('/:id', (req, res) => {
    try {
        const bookings = readData();
        const booking = bookings.find(b => b.id === req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read booking data' });
    }
});

// POST new booking
router.post('/', (req, res) => {
    try {
        const bookings = readData();
        const newBooking = {
            id: 'B' + Date.now().toString().slice(-6),
            createdAt: new Date().toISOString().split('T')[0],
            ...req.body
        };
        bookings.push(newBooking);
        writeData(bookings);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

// PUT update booking
router.put('/:id', (req, res) => {
    try {
        const bookings = readData();
        const index = bookings.findIndex(b => b.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        bookings[index] = { ...bookings[index], ...req.body };
        writeData(bookings);
        res.json(bookings[index]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update booking' });
    }
});

// DELETE booking
router.delete('/:id', (req, res) => {
    try {
        const bookings = readData();
        const index = bookings.findIndex(b => b.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        const deleted = bookings.splice(index, 1);
        writeData(bookings);
        res.json(deleted[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete booking' });
    }
});

module.exports = router;
