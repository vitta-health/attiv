import { NotFoundError } from './NotFoundError';

/**
 * OBJECT NOT FOUND
 */
export class ObjectNotFoundError extends NotFoundError {
  public name = 'RecordNotFoundError';
}
