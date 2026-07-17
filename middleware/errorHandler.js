const handleAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack); 

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    statusCode: statusCode,
    message: err.message || 'Internal Server Error.'
  });
};

module.exports = {
  handleAsync,
  globalErrorHandler
};
