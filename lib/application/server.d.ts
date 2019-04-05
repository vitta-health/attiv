declare class Server {
    express: any;
    constructor({ router, containerMiddleware }: {
        router: any;
        containerMiddleware: any;
    });
    getExpress(): any;
    start(): Promise<{}>;
}
export default Server;
