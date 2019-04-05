declare const messages: {
    errorHandler: {
        NOT_FOUND: string;
        UNAUTHENTICATED: string;
        SERVER_ERROR: string;
        VALIDATION_ERROR: string;
        BUSINESS_ERROR: string;
        API_ERROR: string;
    };
    successHandler: {
        SUCCESS: string;
    };
    responseHandler: {
        EXIST_TRANSACTION_OPEN: string;
    };
    DbContexto: {
        NOT_TRANSACTION: string;
    };
};
export default messages;
