module.exports = class HttpError {
    constructor(msg, errCode) {
        this.message = msg;
        this.code = errCode;
    }
}