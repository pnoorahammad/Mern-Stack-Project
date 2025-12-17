const jwt = require('jsonwebtoken');
const User = require('../models/UserMock');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here_change_in_production');
    const userData = await User.findById(decoded.userId);
    
    if (!userData) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    // Remove password from user object
    const user = { ...userData };
    delete user.password;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;

