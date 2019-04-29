import { Orchestration, EventDispatcher } from 'attiv';
import { Message } from 'amqplib';

class EventServiceProviderExample extends Orchestration {
  constructor() {
    super('OrchestrationRabbit');
  }

  @EventDispatcher.eventName(EventServiceProviderExample.AppListenersEventListener)
  static AppListenersEventListener(data: Message) {
    console.log(data);
  }
}

export default { EventServiceProviderExample };
