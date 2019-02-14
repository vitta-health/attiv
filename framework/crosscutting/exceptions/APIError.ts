/**
 * HTTP ERROR
 */
export class APIError extends Error {
  public status: number;

  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}
