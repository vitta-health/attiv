import { Transaction } from 'sequelize';
export default class DbContext {
    private db;
    private transaction;
    private countTransaction;
    constructor({ db }: {
        db: any;
    });
    getTransaction(): Transaction;
    beginTransaction(): Promise<void>;
    commit(): void;
    rollback(): void;
}
