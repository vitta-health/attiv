import { Orchestration, EventAttiv, StoreType, Metadata, container } from 'attiv';
import { Message } from 'amqplib';

export default class EventServiceProviderExample extends Orchestration {
  constructor() {
    super(StoreType.BASE);
    Orchestration.setSubscribes(
      new EventAttiv(this.AppListenersEventListener.bind(this), 'destiny-AppListenersEventListener'),
    );
    Orchestration.setSubscribes(new EventAttiv(this.Teste.bind(this), 'destiny-Teste'));
    this.init();
  }

  async AppListenersEventListener(data: Metadata): Promise<any> {
    console.log(`AppListenersEventListener MENSAGEM RECEBIDA NA FILA E TRATADA ${JSON.stringify(data)}`);
  }

  async Teste(data: Metadata): Promise<any> {
    console.log(`Teste MENSAGEM RECEBIDA NA FILA E TRATADA ${JSON.stringify(data)}`);
  }
}
