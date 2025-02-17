export class BadRequest extends Error {
  statusCode: number;
  errors?: any;

  constructor(message?: string, errors?: any) {
    super(message);
    this.name = 'BadRequest';
    this.statusCode = 400; // Mã lỗi HTTP 400
    this.errors = errors;
  }
}
export class NotFound extends Error {
  statusCode: number;
  errors?: any;

  constructor(message?: string, errors?: any) {
    super(message);
    this.name = 'NotFound';
    this.statusCode = 404; // Mã lỗi HTTP 400
    this.errors = errors;
  }
}