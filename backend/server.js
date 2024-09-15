const express = require('express');
const cors = require('cors');
const foodInfoRouter = require('./foodInfoRouter')

const app = express();
app.use(cors());
const port = 8000;

app.use(express.json({ limit: '50mb' }))
app.use('/', foodInfoRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
