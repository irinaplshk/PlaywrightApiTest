const fs = require('fs');
const tokenFile = 'playwright/.authtoken/token.json';
const token = fs.readFileSync(tokenFile).toString();
//const token = '0ccd6fa4-57d5-4601-a7ce-b29787eb63ad'
export class Headers {
    constructor() {
        this.headers = {}; // Хранит только те свойства, которые были добавлены
    }

    addToken() {
        this.headers['x-challenger'] = token;
        return this;
    }
    addAccept(accept) {
        this.headers['Accept'] = accept;
        return this;
    }
    addUserAgent(userAgent) {
        this.headers['User-Agent'] = userAgent;
        return this;
    }
    addContent(contentType) {
        this.headers['Content-Type'] = contentType;
        return this;
    }
    addHttpMethod(text) {
        this.headers['X-HTTP-Method-Override'] = text;
        return this;
    }
    addAuth(text) {
        this.headers['Authorization'] = text;
        return this;
    }
    generate() {
        return this.headers;
    }
}