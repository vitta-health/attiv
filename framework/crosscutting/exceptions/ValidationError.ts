/**
 * VALIDATION ERROR
 */
export class ValidationError extends Error {
  public errors: any;

  constructor(errors: any, message: string) {
    super(message);
    this.errors = errors;
  }
}
