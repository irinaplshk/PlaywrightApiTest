const urls = '/todos';
import { Headers} from '../builder/builder.headers';
const headers = new Headers().addToken().generate();

export class TodosService {
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
    
 
    async getTodos(header = headers , element = '', body = null) {
      
       const { url, options } = this.createRequestOptions(urls, header, element, body);
       const response = await this.request.get(url, options);
       return response;
    }
    async postTodos(header = headers , element = '', body = null) {
      
      const { url, options } = this.createRequestOptions(urls, header, element, body);
      const response = await this.request.post(url, options);
      return response;
   }
   async headTodos(header = headers, element = '', body = null) {
      
      const { url, options } = this.createRequestOptions(urls, header, element, body);
      const response = await this.request.head(url, options);
      return response;
   }
   async putTodos(header = headers, element = '', body = null) {
      
      const { url, options } = this.createRequestOptions(urls, header, element, body);
      const response = await this.request.put(url, options);
      return response;
   }
   async deleteTodos(header = headers, element = '', body = null) {
      
      const { url, options } = this.createRequestOptions(urls, header, element, body);
      const response = await this.request.delete(url, options);
      return response;
   }
 }
 
 