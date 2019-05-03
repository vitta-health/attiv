import { Orchestration, EventAttiv, StoreType } from 'attiv';
import { Message } from 'amqplib';

export default class EventServiceProviderExample extends Orchestration {
  constructor() {
    super(StoreType.SQS);
    Orchestration.setSubscribes(
      new EventAttiv(this.AppListenersEventListener.bind(this), 'destiny-AppListenersEventListener'),
    );
    Orchestration.setSubscribes(new EventAttiv(this.Teste.bind(this), 'destiny-Teste'));
    this.init();
  }

  async AppListenersEventListener(data: any): Promise<any> {
    console.log(`AppListenersEventListener MENSAGEM RECEBIDA NA FILA E TRATADA ${JSON.stringify(data)}`);
  }

  async Teste(data: Message): Promise<any> {
    console.log(`Teste MENSAGEM RECEBIDA NA FILA E TRATADA ${JSON.stringify(data)}`);
  }
}
