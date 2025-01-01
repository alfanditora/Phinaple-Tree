const roleAuthorization = (roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;

        if (!roles.includes(userRole)) {
            return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
        }

        next();
    };
};

module.exports = roleAuthorization;
