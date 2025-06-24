// authMiddleware.js
module.exports = (req, res, next) => {
    if (!req.session.customerId) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }
    next(); // If session exists, proceed to the next handler
  };
  