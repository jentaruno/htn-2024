const express = require('express');
const foodInfoRouter = require('./foodInfoRouter')

const app = express();
const port = 8000;

app.use('/get-food-info', foodInfoRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});