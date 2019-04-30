import { Orchestration, EventAttiv } from 'attiv';
import { Message } from 'amqplib';

export default class EventServiceProviderExample extends Orchestration {
  constructor() {
    super('StoreRabbitMQ');
    Orchestration.setSubscribes(new EventAttiv(this.AppListenersEventListener.bind(this), 'AppListenersEventListener'));
    Orchestration.setSubscribes(new EventAttiv(this.Teste.bind(this), 'Teste'));
    this.init();
  }

  async AppListenersEventListener(data: any): Promise<any> {
    console.log(`MENSAGEM RECEBIDA NA FILA E TRATADA ${JSON.stringify(data)}`);
  }

  async Teste(data: Message): Promise<any> {
    throw new Error('OPS :!');
  }
}
