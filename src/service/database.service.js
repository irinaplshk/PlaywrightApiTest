const urls ='/challenger/database';
import { Headers} from '../builder/builder.headers';
const headers = new Headers().addToken().generate();

export class DatabaseService {
    constructor(request) {
       this.request = request;
    }
 
 
    createRequestOptions(urls, header, element = '', body = null) {
       const url = element ? `${urls}${element}` : `${urls}`;
       
       const options = {
          headers: header
       };
 
       if (body) {
          options.data = body;
       }
       
       return { url, options };
    }
    
    async getDatabase(header = headers , element = '', body = null) {
      
       const { url, options } = this.createRequestOptions(urls, header, element, body);
       const response = await this.request.get(url, options);
       return response;
    }
    async putDatabase(header = headers , element = '', body = null) {
      
      const { url, options } = this.createRequestOptions(urls, header, element, body);
      const response = await this.request.put(url, options);
      return response;
   }
 }
 
 