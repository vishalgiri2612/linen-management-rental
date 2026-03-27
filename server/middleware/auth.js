import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).send({ error: 'Please authenticate. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_default_secret_key');
    req.user = decoded; 
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate. Invalid token.' });
  }
};

export default auth;
