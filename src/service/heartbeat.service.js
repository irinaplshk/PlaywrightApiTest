const urls = '/heartbeat';
import { Headers } from '../builder/builder.headers';
const headers = new Headers().addToken().generate();

export class HeartbeatService {
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
   async patchHertbeat() {

      const response = await this.request.patch(urls, { headers: headers });
      return response;
   }
   async deleteHertbeat() {

      const response = await this.request.delete(urls, { headers: headers });
      return response;
   }
   async getHertbeat() {


      const response = await this.request.get(urls, { headers: headers });
      return response;
   }
   async postHertbeat(header = headers, element = '', body = null) {

      const { url, options } = this.createRequestOptions(urls, header, element, body);
      const response = await this.request.get(url, options );
      return response;
   }
}