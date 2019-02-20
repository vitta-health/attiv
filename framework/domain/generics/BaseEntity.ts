import * as validator from 'class-validator';
import { ValidationError } from '../../crosscutting/exceptions/ValidationError';
import messages from '../../crosscutting/messages/message';

export default abstract class BaseEntity {
  isValid() {
    const isValid = validator.validateSync(this, { validationError: { target: false }, forbidNonWhitelisted: true });
    if (isValid.length > 0) {
      throw new ValidationError(
        isValid.map(err => {
          return { variable: err.property, messages: err.constraints };
        }),
        messages.errorHandler.VALIDATION_ERROR
      );
    }
    return true;
  }
}
