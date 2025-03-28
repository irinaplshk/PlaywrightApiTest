const urls = '/todo';
import { Headers} from '../builder/builder.headers';
const headers = new Headers().addToken().generate();

export class TodoService {
   constructor(request) {
      this.request = request;
   }


   async getTodo() {
      
      const response = await this.request.get(urls, {headers: headers});
      return response;
   }

}

