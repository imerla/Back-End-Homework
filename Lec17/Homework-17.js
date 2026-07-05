const express = require('express');
const app = express();
const orderRoutes = require('./Routes/orderRoutes');
const { logger } = require('./Middleware/loggerMiddleware');

app.use(express.json());

app.use(logger);

app.use('/orders', orderRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
