import * as joi from 'joi';

/**
 * Este middleware (factory, na verdade) é o responsável por realizar a validação
 * dos formato dos dados recebidos. Recebe as regras e verifica se a request está de acordo.
 * Consegue verificar as propriedades params, body e query da request.
 * A validação é feita utilizando Joi.
 * Caso a validação falhe, é criado uma instancia do ValidationError, que é enviado
 * para o próximo handler.
 */
export function SchemaValidationJoin(payload, rules) {
  return joi.validate(payload, rules, {
    abortEarly: false,
    language: {
      root: 'value',
      key: '',
      any: {
        unknown: 'campo não permitido',
        invalid: 'contém um valor inválido',
        empty: 'não pode ser vazio',
        required: 'é obrigatório',
        allowOnly: 'o valor deve ser uma das opções: {{valids}}',
        default: 'erro',
      },
      alternatives: {
        base: 'não corresponde a nenhuma das opções válidas',
      },
      array: {
        base: 'deve conter mais de um valor',
        min: 'deve conter ao menos {{limit}} itens',
        max: 'deve conter no máximo {{limit}} itens',
        length: 'deve conter {{limit}} itens',
        unique: 'o {{pos}}º item está duplicado',
      },
      boolean: {
        base: 'deve ser booleano',
      },
      date: {
        base: 'formato inválido',
        format: 'deve ser uma string com um formato entre: {{format}}',
        strict: 'deve ser uma data válida',
        min: 'deve ser uma data pelo menos "{{limit}}"',
        max: 'deve ser uma data até "{{limit}}"',
      },
      number: {
        base: 'deve ser um número',
        min: 'deve ser maior ou igual que {{limit}}',
        max: 'deve ser menor ou igual que {{limit}}',
        less: 'deve ser menor que {{limit}}',
        greater: 'deve ser maior que {{limit}}',
        float: 'deve ser um número decimal',
        integer: 'deve ser um número inteiro',
        negative: 'deve ser um valor negativo',
        positive: 'deve ser um valor positivo',
        precision: 'deve ter no máximo {{limit}} casas decimais',
        multiple: 'deve ser um múltiplo de {{multiple}}',
        port: 'deve ser uma porta válida',
      },
      object: {
        allowUnknown: 'campo não permitido',
      },
      string: {
        base: 'deve ser uma string',
        min: 'deve ter no mínimo {{limit}} caracteres',
        max: 'deve ter até {{limit}} caracteres',
        length: 'deve ter {{limit}} caracteres',
        alphanum: 'deve conter apenas letras e números',
        token: 'deve conter apenas letras, números e os sinais _ e -',
        email: 'deve ser um endereço de e-mail válido',
        uri: 'deve ser uma URL válida',
        lowercase: 'deve conter apenas letras minúsculas',
        uppercase: 'deve conter apenas letras maiúsculas',
        trim: 'não deve haver espaços no começou o no fim',
        creditCard: 'deve ser um número de cartão de crédito válido',
        ip: 'deve ser um endereço de IP válido',
      },
    },
  });
}
