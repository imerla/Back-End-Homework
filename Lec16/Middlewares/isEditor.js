const isEditor = (req, res, next) => {
    const editor = req.headers.editor;
    const admin = req.headers.admin;
    
    if (!editor && !admin) {
        return res.status(403).json({ error: 'Access denied. Editor or Admin role required.' });
    }
    
    next();
};

module.exports = isEditor;
