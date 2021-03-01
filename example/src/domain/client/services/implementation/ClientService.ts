import { GenericImpl, IGeneric } from 'attiv';
import Client from '../../entity/Client';

export default class ClientService extends GenericImpl<Client> implements IGeneric<Client> {
  constructor({ clientRepository }) {
    super(clientRepository, Client);
  }
}
