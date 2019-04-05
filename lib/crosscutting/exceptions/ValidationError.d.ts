/**
 * VALIDATION ERROR
 */
export declare class ValidationError extends Error {
    errors: any;
    constructor(errors: any, message: string);
}
