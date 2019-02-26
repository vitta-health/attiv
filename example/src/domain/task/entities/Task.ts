import * as validator from 'class-validator';
import { BaseEntity } from 'attiv';

export default class Task extends BaseEntity {
  public id: number;

  @validator.MinLength(5)
  @validator.MaxLength(100)
  public title: string;

  @validator.IsNotEmpty()
  public description: string;

  @validator.ValidateIf(o => o.ready === true)
  @validator.IsEmail()
  @validator.IsNotEmpty()
  public email: string;

  public ready: boolean;

  public createdAt: string;
  public updatedAt: string;
}
