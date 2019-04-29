import { EventAttiv, Orchestration } from 'attiv';
import { Message } from 'amqplib';
import { eventNames } from 'cluster';

class EventServiceProviderExample extends Orchestration {
  constructor() {
    super();
  }

  //@eventNames('EventServiceProviderExample.AppListenersEventListener')
  static AppListenersEventListener(data: Message) {
    console.log(JSON.parse(data.content.toString('utf8')));
  }
}

Orchestration.setSubscribes(new EventAttiv(EventServiceProviderExample.AppListenersEventListener));

export default { EventServiceProviderExample };
