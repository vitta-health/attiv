import Server from './server';
class Application {
  server: Server;
  constructor({ server }) {
    this.server = server;
  }

  async start() {
    await this.server.start();
  }
}

export default Application;
