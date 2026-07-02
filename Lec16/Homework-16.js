const express = require('express');
const productRoutes = require('./api/products/products.routes');

const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Products API' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
