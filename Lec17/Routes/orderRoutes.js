const express = require('express');
const router = express.Router();
const orderService = require('../Services/orderService');
const { validateOrder, isAdmin, isEditor } = require('../Middleware/validationMiddleware');

router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const result = orderService.getAllOrders(page, limit);
    res.json(result);
});

router.get('/search', (req, res) => {
    const { productName, status } = req.query;
    
    const result = orderService.searchOrders({ productName, status });
    res.json(result);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const order = orderService.getOrderById(id);
    
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
});

router.post('/', validateOrder, (req, res) => {
    const { productName, quantity, totalPrice, status } = req.body;
    
    const newOrder = orderService.createOrder({
        productName,
        quantity,
        totalPrice,
        status
    });
    
    res.status(201).json(newOrder);
});

router.put('/:id', (req, res, next) => {
    const admin = req.headers.admin;
    const editor = req.headers.editor;
    
    if (admin === 'admin') {
        isAdmin(req, res, next);
    } else if (editor === 'editor') {
        isEditor(req, res, next);
    } else {
        return res.status(403).json({ error: 'Access denied. Admin or Editor role required.' });
    }
}, (req, res) => {
    const id = parseInt(req.params.id);
    const admin = req.headers.admin;
    const editor = req.headers.editor;
    const { productName, quantity, totalPrice, status } = req.body;
    
    let updateData = {};
    
    if (admin === 'admin') {
        updateData = { productName, quantity, totalPrice, status };
    } else if (editor === 'editor') {
        if (!status) {
            return res.status(400).json({ error: 'Editors can only update status field' });
        }
        updateData = { status };
    }
    
    const updatedOrder = orderService.updateOrder(id, updateData);
    
    if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(updatedOrder);
});

router.delete('/:id', isAdmin, (req, res) => {
    const id = parseInt(req.params.id);
    const deleted = orderService.deleteOrder(id);
    
    if (!deleted) {
        return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ message: 'Order deleted successfully' });
});

module.exports = router;
