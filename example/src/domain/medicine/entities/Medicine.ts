import * as validator from 'class-validator';
import { BaseEntity } from 'attiv';

export default class Medicine extends BaseEntity {
    public id: number;

    @validator.IsNotEmpty()
    @validator.MaxLength(100)
    public name: string;

    public createdAt: string;
    public updatedAt: string;
}
