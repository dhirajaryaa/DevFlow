export class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong!",
    errors = [],
    data = null,
    stack= ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.success = false;
    this.isError = true;
    this.errors = errors;
    if(stack){ 
      this.stack = stack
    }else{
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
