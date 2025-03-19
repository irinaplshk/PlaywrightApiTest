//const URL = 'https://apichallenges.herokuapp.com';

export class ChallengerService {
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
   
   async postChallenger(urls) {
      console.log(urls);
      const response = await this.request.post(`${urls}`);
      return response;
   }

   async post(urls, header, element = '', body = null) {

      const { url, options } = this.createRequestOptions(urls, header, element, body);
      const response = await this.request.post(url, options);
      return response;
   }

   async head(urls, header, element = '', body = null) {

      const { url, options } = this.createRequestOptions(urls, header, element, body);
      const response = await this.request.head(url, options);
      return response;
   }

   async put(urls, header, element = '', body = null) {

      const { url, options } = this.createRequestOptions(urls, header, element, body);
      const response = await this.request.put(url, options);
      return response;
   }

   async patch(urls, header, element = '', body = null) {

      const { url, options } = this.createRequestOptions(urls, header, element, body);
      const response = await this.request.patch(url, options);
      return response;
   }

   async delete(urls, header, element = '', body = null) {

      const { url, options } = this.createRequestOptions(urls, header, element, body);
      const response = await this.request.delete(url, options);
      return response;
   }

   async get(urls, header, element = '', body = null) {
      const { url, options } = this.createRequestOptions(urls, header, element, body);
      
      const response = await this.request.get(url, options);
      return response;
   }

}

