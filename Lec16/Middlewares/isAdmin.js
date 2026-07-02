const isAdmin = (req, res, next) => {
    const admin = req.headers.admin;
    
    if (!admin || admin !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admin role required.' });
    }
    
    next();
};

module.exports = isAdmin;
