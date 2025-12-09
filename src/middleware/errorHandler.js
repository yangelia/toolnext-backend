import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  if (createHttpError.isHttpError(err)) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
  });
};
