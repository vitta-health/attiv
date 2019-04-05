/**
 * HTTP ERROR
 */
export declare class APIError extends Error {
    status: number;
    constructor(message: any, status?: number);
}
