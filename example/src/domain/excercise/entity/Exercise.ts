import * as validator from 'class-validator';
import { BaseEntity } from 'attiv';

export default class Exercise extends BaseEntity {
  public id: string;

  @validator.MinLength(5)
  @validator.MaxLength(100)
  public title: string;

  @validator.IsNotEmpty()
  public description: string;

  public details: string;
}
