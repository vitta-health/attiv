# Descrição

Implementanção generica para manipulação de filas e/ou eventos. Atualmente temos uma versão inicial usando um orquestrador para RabbitMQ e um orquestrador de eventos básico que pode ser utilizado pelas aplicações que não precisam se comunicar com alguma base externa

### Pré-condições

- Atualizar o framework para versão mais recente

### Exemplo de uso

- Criar um arquivo como no projeto de example, chamado EventProviderRabbit por exemplo.
- Extender a classe do Orquestrador
- Setar os métodos que serão usados para tratar o retorno da fila
- **_importante_**: Os métodos da que serão usados para tratar os dados deve retornar uma `Promise` conforme o exemplo
- Chmar o método init() após configurar os métodos
- Cadastrar no orquestrador o ser provedor de eventos

#### 1º Método - RabbitMQ:

```javascript
import { Orchestration, EventAttiv } from 'attiv';
import { Message } from 'amqplib';

export default class EventServiceProviderExample extends Orchestration {
  constructor() {
    // Setando qual fila padrão será usada, nesse caso precisamos
    // preencher a variavel de ambiente RABBITMQ_HOST para realizar
    // a conexão
    super('OrchestrationRabbit');

    //Setando o callback das mensagens recebidas no Rabbit e definindo
    // o nome da fila que será criada.
    Orchestration.setSubscribes(new EventAttiv(this.AppListenersEventListener.bind(this), 'AppListenersEventListener'));
    Orchestration.setSubscribes(new EventAttiv(this.Teste.bind(this), 'Teste'));

    //Inicializa a configuração
    this.init();
  }

  // Neste método iremos receber a mensagem enviada, exibir um log
  // e na sequencia marcar a mensagem como lida (essa marcação de sucesso é feita automaticamente)
  async AppListenersEventListener(data: Message): Promise<any> {
    console.log(`MENSAGEM RECEBIDA NA FILA ${data.fields.routingKey} E TRATADA ${data.fields.deliveryTag} `);
  }

  //Neste método iremos receber a mensagem enviada, porém durante o tratamento da mensagem tivemos uma excessão, com isso a mensagem não será removida da fila e será lida posteriormente.
  async Teste(data: Message): Promise<any> {
    throw new Error('OPS :!');
  }
}
```

#### 2º Método - Base:

Importante resaltar que no exemplo abaixo, a finalidade é deixar o controle do que será feito com os dados inteiramente para a aplicação, sem utilizar nenhuma base pronta

```javascript
import { Orchestration, EventAttiv } from 'attiv';
import { Message } from 'amqplib';

export default class EventServiceProviderExample extends Orchestration {
  constructor() {
    // Neste exemplo não é necessário setar nenhuma configuração adicional, porque o disparo dos eventos será tratado somente pela aplicação
    super('OrchestrationBase');

    //Setando o callback dos eventos recebidos e definindo
    // como esse evento irá chamar no fluxo da aplicação.
    Orchestration.setSubscribes(new EventAttiv(this.AppListenersEventListener.bind(this), 'AppListenersEventListener'));
    Orchestration.setSubscribes(new EventAttiv(this.Teste.bind(this), 'Teste'));

    //Inicializa a configuração
    this.init();
  }

  // Neste método iremos receber a mensagem disparada pelo evento, e exibir no log.
  async AppListenersEventListener(data: Message): Promise<any> {
    console.log(`MENSAGEM RECEBIDA NA FILA ${data.fields.routingKey} E TRATADA ${data.fields.deliveryTag} `);
  }

  //Neste método iremos receber a mensagem disparada pelo evento,e dispara uma excessão.
  async Teste(data: Message): Promise<any> {
    throw new Error('OPS :!');
  }
}
```
