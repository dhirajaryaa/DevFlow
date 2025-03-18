export class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong!",
    data = null,
    success = false,
    isError = true,
    error = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.success = success;
    this.isError = isError;
    this.error = error;
  }
}
