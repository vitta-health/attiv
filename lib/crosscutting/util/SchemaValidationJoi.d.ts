import * as joi from 'joi';
/**
 * Este middleware (factory, na verdade) é o responsável por realizar a validação
 * dos formato dos dados recebidos. Recebe as regras e verifica se a request está de acordo.
 * Consegue verificar as propriedades params, body e query da request.
 * A validação é feita utilizando Joi.
 * Caso a validação falhe, é criado uma instancia do ValidationError, que é enviado
 * para o próximo handler.
 */
export declare function SchemaValidationJoin(payload: any, rules: any): joi.ValidationResult<any>;
