const jwt = require('jsonwebtoken');
const supabase = require('../supabaseClient');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here_change_in_production');
    
    // Verify user exists in Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email')
      .eq('id', decoded.userId)
      .single();

    if (error || !user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
