import { BaseRepositoryMongo, IRepositoryGeneric } from 'attiv';
import Exercise from '../../domain/excercise/entity/Exercise';

import exerciseModel from '../database/exerciseSchema';

export default class ExerciseRepository extends BaseRepositoryMongo<Exercise> implements IRepositoryGeneric<Exercise> {
  constructor({ DbContextMongo }) {
    super(exerciseModel);
  }
}
