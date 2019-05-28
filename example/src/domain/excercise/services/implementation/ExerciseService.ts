import { GenericImpl, IGeneric } from 'attiv';
import Exercise from '../../entity/Exercise';

export default class ExerciseService extends GenericImpl<Exercise> implements IGeneric<Exercise> {
  constructor({ exerciseRepository }) {
    super(exerciseRepository, Exercise);
  }
}
