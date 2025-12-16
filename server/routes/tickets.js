const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/tickets.json');

// Helper functions
const readData = () => {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET all tickets
router.get('/', (req, res) => {
    try {
        const tickets = readData();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read tickets data' });
    }
});

// GET single ticket
router.get('/:id', (req, res) => {
    try {
        const tickets = readData();
        const ticket = tickets.find(t => t.id === req.params.id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket type not found' });
        }
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read ticket data' });
    }
});

// POST new ticket type
router.post('/', (req, res) => {
    try {
        const tickets = readData();
        const newTicket = {
            id: req.body.id || Date.now().toString(),
            ...req.body
        };
        tickets.push(newTicket);
        writeData(tickets);
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create ticket type' });
    }
});

// PUT update ticket type
router.put('/:id', (req, res) => {
    try {
        const tickets = readData();
        const index = tickets.findIndex(t => t.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Ticket type not found' });
        }
        tickets[index] = { ...tickets[index], ...req.body };
        writeData(tickets);
        res.json(tickets[index]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update ticket type' });
    }
});

// DELETE ticket type
router.delete('/:id', (req, res) => {
    try {
        const tickets = readData();
        const index = tickets.findIndex(t => t.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Ticket type not found' });
        }
        const deleted = tickets.splice(index, 1);
        writeData(tickets);
        res.json(deleted[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete ticket type' });
    }
});

module.exports = router;
