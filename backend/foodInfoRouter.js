const express = require('express');
const findAllergens = require('./findAllergens');
const router = express.Router();

router.get("", async (req, res) => {
    try {
        let foodItems = [{
            productName: "пшенная с маслом",
            productNameTranslation: "millet with butter",
            description: "millet porridge with butter",
        }];
        let result = await Promise.all(foodItems.map(async e => {
            const allergens = await findAllergens(e.productName);
            return {
                ...e,
                possibleAllergens: allergens
            };
        }));
        res.send(result);
    } catch (e) {
        console.error('Error fetching data:', e);
        res.status(500).send('Error fetching data');
    }
});

module.exports = router;