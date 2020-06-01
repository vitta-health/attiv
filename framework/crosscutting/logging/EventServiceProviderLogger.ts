import Orchestration from '../events/orchestration';
import StoreType from '../events/storeTypes';

export default class EventServiceProviderAudditLogger extends Orchestration {
  constructor(storeType: StoreType) {
    super(storeType);
    this.init();
  }
}
