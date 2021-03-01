import { GenericController, IGenericController } from 'attiv';
import IClientService from '../../domain/client/services/interface/IClientService';

export default class ClientController extends GenericController<IClientService> implements IGenericController {
  constructor() {
    super('clientService');
  }

  public getRouter() {
    return super.getRouter();
  }
}
