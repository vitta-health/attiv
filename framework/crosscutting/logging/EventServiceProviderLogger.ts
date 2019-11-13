import { Orchestration, StoreType } from 'attiv';

export default class EventServiceProviderAudditLogger extends Orchestration {
  constructor(storeType: StoreType) {
    super(storeType);
    this.init();
  }
}
