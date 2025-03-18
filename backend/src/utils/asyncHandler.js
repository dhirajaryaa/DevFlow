export const AsyncHandler = function (requestedFunc) {
  return (req, res, next) =>
    Promise.resolve(requestedFunc(req, res, next)).catch((err) => next(err));
};