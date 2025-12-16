const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/animals.json');

// Helper functions
const readData = () => {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET all animals
router.get('/', (req, res) => {
    try {
        const animals = readData();
        res.json(animals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read animals data' });
    }
});

// GET single animal
router.get('/:id', (req, res) => {
    try {
        const animals = readData();
        const animal = animals.find(a => a.id === req.params.id);
        if (!animal) {
            return res.status(404).json({ error: 'Animal not found' });
        }
        res.json(animal);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read animal data' });
    }
});

// POST new animal
router.post('/', (req, res) => {
    try {
        const animals = readData();
        const newAnimal = {
            id: Date.now().toString(),
            ...req.body
        };
        animals.push(newAnimal);
        writeData(animals);
        res.status(201).json(newAnimal);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create animal' });
    }
});

// PUT update animal
router.put('/:id', (req, res) => {
    try {
        const animals = readData();
        const index = animals.findIndex(a => a.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Animal not found' });
        }
        animals[index] = { ...animals[index], ...req.body };
        writeData(animals);
        res.json(animals[index]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update animal' });
    }
});

// DELETE animal
router.delete('/:id', (req, res) => {
    try {
        const animals = readData();
        const index = animals.findIndex(a => a.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Animal not found' });
        }
        const deleted = animals.splice(index, 1);
        writeData(animals);
        res.json(deleted[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete animal' });
    }
});

module.exports = router;
