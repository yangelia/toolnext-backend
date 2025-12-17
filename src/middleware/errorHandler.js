import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  if (createHttpError.isHttpError(err)) {
    return res.status(err.status).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    error: 'Internal server error',
  });
};
