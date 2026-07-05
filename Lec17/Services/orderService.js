const fs = require('fs');
const path = require('path');

const ordersFilePath = path.join(__dirname, '../orders.json');

let orders = [];
let nextId = 1;

function loadOrders() {
    try {
        const data = fs.readFileSync(ordersFilePath, 'utf8');
        orders = JSON.parse(data);
        if (orders.length > 0) {
            nextId = Math.max(...orders.map(order => order.id)) + 1;
        }
    } catch (error) {
        orders = [];
        nextId = 1;
    }
}

function saveOrders() {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), 'utf8');
}

loadOrders();

class OrderService {
    getAllOrders(page = 1, limit = 10) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        
        const paginatedOrders = orders.slice(startIndex, endIndex);
        
        return {
            data: paginatedOrders,
            page,
            limit,
            total: orders.length,
            totalPages: Math.ceil(orders.length / limit)
        };
    }

    getOrderById(id) {
        return orders.find(order => order.id === id);
    }

    createOrder(orderData) {
        const newOrder = {
            id: nextId++,
            ...orderData
        };
        
        orders.push(newOrder);
        saveOrders();
        return newOrder;
    }

    updateOrder(id, updateData) {
        const orderIndex = orders.findIndex(order => order.id === id);
        
        if (orderIndex === -1) {
            return null;
        }
        
        orders[orderIndex] = {
            ...orders[orderIndex],
            ...updateData
        };
        
        saveOrders();
        return orders[orderIndex];
    }

    deleteOrder(id) {
        const orderIndex = orders.findIndex(order => order.id === id);
        
        if (orderIndex === -1) {
            return false;
        }
        
        orders.splice(orderIndex, 1);
        saveOrders();
        return true;
    }

    searchOrders(searchParams) {
        const { productName, status } = searchParams;
        
        let filteredOrders = orders;
        
        if (productName) {
            filteredOrders = filteredOrders.filter(order => 
                order.productName.toLowerCase().includes(productName.toLowerCase())
            );
        }
        
        if (status) {
            filteredOrders = filteredOrders.filter(order => 
                order.status.toLowerCase() === status.toLowerCase()
            );
        }
        
        return filteredOrders;
    }
}

module.exports = new OrderService();
