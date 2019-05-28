import { GenericController, IGenericController } from 'attiv';
import IExerciseService from '../../domain/excercise/services/interface/IExerciseService';

export default class ExerciseController extends GenericController<IExerciseService> implements IGenericController {
  constructor() {
    super('exerciseService');
  }

  public getRouter() {
    return super.getRouter();
  }
}
