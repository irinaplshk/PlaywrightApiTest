const urls= '/challenges';
import { Headers} from '../builder/builder.headers';
const headers = new Headers().addToken().generate();

export class ChallengesService {
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
  
   async getChallenges( header = headers, element = '', body = null) {
      const { url, options } = this.createRequestOptions(urls, header, element, body);
      const response = await this.request.get(url, options);
      return response;
   }
   
}

