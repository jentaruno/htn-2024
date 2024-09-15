const express = require('express');
const router = express.Router();

router.get("", async (req, res) => {
    try {
        res.send("Bonsoir!");
    } catch (e) {
        console.error('Error fetching data:', e);
        res.status(500).send('Error fetching data');
    }
});

module.exports = router;