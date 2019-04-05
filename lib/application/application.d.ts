import Server from './server';
declare class Application {
    server: Server;
    constructor({ server }: {
        server: any;
    });
    start(): Promise<void>;
}
export default Application;
