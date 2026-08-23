import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

export const sendTokenResponse = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    success: true,
    token,
    data: user
  });
};

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
