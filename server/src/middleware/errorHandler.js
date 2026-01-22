export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation error', details: err.message });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (err.name === 'ForbiddenError') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Internal server error' });
};
