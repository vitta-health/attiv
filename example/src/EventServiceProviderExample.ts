import { Orchestration, EventAttiv } from 'attiv';
import { Message } from 'amqplib';

export default class EventServiceProviderExample extends Orchestration {
  constructor() {
    super('OrchestrationRabbit');
    Orchestration.setSubscribes(new EventAttiv(this.AppListenersEventListener.bind(this), 'AppListenersEventListener'));
    Orchestration.setSubscribes(new EventAttiv(this.Teste.bind(this), 'Teste'));
    this.init();
  }

  async AppListenersEventListener(data: Message): Promise<any> {
    console.log(`MENSAGEM RECEBIDA NA FILA ${data.fields.routingKey} E TRATADA ${data.fields.deliveryTag} `);
  }

  async Teste(data: Message): Promise<any> {
    throw new Error('OPS :!');
  }
}
