const validateOrder = (req, res, next) => {
    const { productName, quantity, totalPrice, status } = req.body;
    
    if (!productName) {
        return res.status(400).json({ error: 'productName is required' });
    }
    
    if (quantity > 10) {
        return res.status(400).json({ error: 'quantity cannot be greater than 10' });
    }
    
    if (totalPrice > 500) {
        return res.status(400).json({ error: 'totalPrice cannot be greater than 500' });
    }
    
    next();
};

const isAdmin = (req, res, next) => {
    const admin = req.headers.admin;
    
    if (!admin || admin !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admin role required.' });
    }
    
    next();
};

const isEditor = (req, res, next) => {
    const editor = req.headers.editor;
    const admin = req.headers.admin;
    
    if (!editor && !admin) {
        return res.status(403).json({ error: 'Access denied. Editor or Admin role required.' });
    }
    
    next();
};

module.exports = { validateOrder, isAdmin, isEditor };
