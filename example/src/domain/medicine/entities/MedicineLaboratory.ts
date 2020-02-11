import { BaseEntity } from 'attiv';
import * as validator from 'class-validator';

export default class MedicamentoLaboratory extends BaseEntity {
    id: number;

    @validator.IsNotEmpty()
    @validator.IsNumber()
    @validator.Min(1)
    laboratoryId: number;

    @validator.IsNotEmpty()
    @validator.IsNumber()
    @validator.Min(1)
    medicineId: number;

    createdAt: string;
    updatedAt: string;
}
