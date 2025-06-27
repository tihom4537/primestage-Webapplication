// soundSystemRoutes.js
const express = require('express');
const router = express.Router();
const { getPackageByAudienceSize } = require('../controllers/audienceSoundEquip');

// GET endpoint for retrieving package by audience size
router.get('/packages/:audienceSize', (req, res) => {
    try {
        const { audienceSize } = req.params;
        const package = getPackageByAudienceSize(audienceSize);
        res.json(package);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get package details' });
    }
});

// POST endpoint for sound system price
router.post('/sound-system-price', (req, res) => {
    try {
        const { audience_size } = req.body;
        const package = getPackageByAudienceSize(audience_size);
        res.json({
            sound_system_price: package.price,
            equipment: package.equipment
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate sound system price' });
    }
});

module.exports = router;