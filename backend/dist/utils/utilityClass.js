class ErrorHandler extends Error {
    constructor(message, StatusCode) {
        super(message);
        this.message = message;
        this.StatusCode = StatusCode;
        this.StatusCode = StatusCode;
    }
}
export default ErrorHandler;
