import * as validator from 'class-validator';
import { BaseEntity } from 'attiv';

export default class Client extends BaseEntity {
  public id: string;

  @validator.MinLength(5)
  @validator.MaxLength(100)
  public name: string;

  @validator.IsNotEmpty()
  public cpf: string;

  public age: number;
}
