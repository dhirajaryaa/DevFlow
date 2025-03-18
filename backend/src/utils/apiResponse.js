export class ApiResponse {
  constructor(
    statusCode,
    message = "Successful",
    data = null,
    succuss = true,
    error = false
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.error = error;
    this.succuss = succuss;
  }
}
