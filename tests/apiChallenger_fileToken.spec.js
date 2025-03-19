import { test, expect } from '@playwright/test';
import { ChallengerService } from '../src/service/index';
import { Headers, Data,UUID} from '../src/builder/index';
import { errorMessage, types, userAgents, testData, URLs, method } from '../src/structures/index';
const fs = require('fs');

let challengerService;


test.describe('First Real Challenge', { tag: '@FirstChallenge' }, () => {

  test('2- get list of challengers ', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const header = new Headers().addToken().generate();
    //const response = await challengerService.getChallenges(header);
    const response = await challengerService.get(URLs.challenges, header)
    expect(response.status()).toBe(200);


  });
});

test.describe('GET Challenges', { tag: '@GetChallenges' }, () => {

  test('3-get todos', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const response = await challengerService.get(URLs.todos, headers, '', null);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.todos).toBeDefined();
    expect(body.todos.length).toBeGreaterThan(0);


  });

  test('4- get todo not plural', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const response = await challengerService.get(URLs.todo, headers, '', null);
    expect(response.status()).toBe(404);

  });

  test('5-get todos id', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const response = await challengerService.get(URLs.todos, headers, '', null);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.todos.length).toBeGreaterThan(0);//проверяем, что полученный массив не пустой
    const ids = body.todos.map(todo => todo.id);// получаем список всех id
    const id = ids[ids.length - 1];//запрос  по  последнему элементу
    let element = `/${id}`;


    const responseId = await challengerService.get(URLs.todos, headers, element, null);
    expect(responseId.status()).toBe(200);

    const bodyid = await responseId.json();
    expect(bodyid.todos.length).toBeGreaterThan(0);// проверяем,что полученный массив не пустой
    const todo = bodyid.todos.find(todo => todo.id === id);//находим наш элемент в полученном массиве
    expect(todo.id).toBe(id);// Проверяем, что элемент с id 10 существует

  });

  test('6-get todos id not exist', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const response = await challengerService.get(URLs.todos, headers, '', null);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.todos.length).toBeGreaterThan(0);//проверяем, что полученный массив не пустой
    const ids = body.todos.map(todo => todo.id);// получаем список всех id
    const id = ids.length + 3;//запрос  по  последнему элементу
    let element = `/${id}`;

    const responseId = await challengerService.get(URLs.todos, headers, element, null);
    expect(responseId.status()).toBe(404);

    const bodyErr = await responseId.json();

    // Проверяем, что errorMessages содержит определенное сообщение
    expect(bodyErr.errorMessages).toContain(errorMessage.todoNotFound(id));

  });

  test('7-get todos filtre', async ({ request }) => {


    challengerService = new ChallengerService(request);
    const headersNewObject = new Headers().addToken().generate();
    const dataNewObject = new Data().addTitle("create todo process payroll").addStatus(true).addDescription().generate();

    const responseNewObject = await challengerService.post(URLs.todos, headersNewObject, '', dataNewObject);
    expect(responseNewObject.status()).toBe(201);//объект с "doneStatus": true создан 
    let element = `?doneStatus=true`;
    const headers = new Headers().addToken().addAccept(types.applicationJson).addUserAgent(userAgents.userAgent).generate();
    const response = await challengerService.get(URLs.todos, headers, element, null);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.todos.length).toBeGreaterThan(0); //todo проверить что получили в отчете массив не пустой

  });

});

test.describe('HEAD Challenges', { tag: '@HeadChallenges' }, () => {

  test('8-get head challengers ', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const response = await challengerService.head(URLs.todos, headers, '', null);
    expect(response.status()).toBe(200);

  });
});

test.describe('Creation Challenges with POST', { tag: '@CreationChallengesWithPOST' }, () => {

  test('9-post todos ', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const data = new Data().addTitle(testData.title).addStatus(true).addDescription().generate();

    const response = await challengerService.post(URLs.todos, headers, '', data);
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.title).toContain(testData.title);///проверяем, что  новый объект создался корректным

  });

  test('10- post invalid todos ', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const data = new Data().addTitle(testData.title).addStatus(testData.invalidDoneStatus).addDescription().generate();
    const response = await challengerService.post(URLs.todos, headers, '', data);
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain(errorMessage.validDoneStatus);// Проверяем, что errorMessages содержит определенное сообщение

  });

  test('11-post invalid todos:long status', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const data = new Data().addTitle(testData.tolongTitle).addStatus(true).addDescription().generate();
    const response = await challengerService.post(URLs.todos, headers, '', data);
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain(errorMessage.tooLongTitle);// Проверяем, что errorMessages содержит определенное сообщение

  });


  test('12-post invalid todos :long description', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const data = new Data().addTitle(testData.title).addStatus(true).addDescription(testData.toLongDescription).generate();
    const response = await challengerService.post(URLs.todos, headers, '', data);
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain(errorMessage.longDescription);// Проверяем, что errorMessages содержит определенное сообщение

  });

  test('13-post max out content', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const data = new Data().addTitle(testData.longTitle).addStatus(true).addDescription(testData.longDescription).generate();
    const response = await challengerService.post(URLs.todos, headers, '', data);
    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.title.length).toBe(50);
    expect(body.description.length).toBe(200);

  });


  test('14 - post content too long', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const data = new Data().addTitle(testData.title).addStatus(true).addDescription(testData.textHuge).generate();
    const response = await challengerService.post(URLs.todos, headers, '', data);
    expect(response.status()).toBe(413);

    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain(errorMessage.extraLong);// Проверяем, что errorMessages содержит определенное сообщение

  });

  test('15-post extra ', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const data = new Data().addTitle(testData.title).addStatus(true).addPriority(testData.priority).generate();

    const response = await challengerService.post(URLs.todos, headers, '', data);
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain(errorMessage.wrongField);// Проверяем, что errorMessages содержит определенное сообщение

  });
});

test.describe('Creation Challenges with PUT', { tag: '@CreationChallengesWithPUT' }, () => {

  test('16 - post PUT /todos/{id} (400)', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const data = new Data().addTitle(testData.title).addStatus(true).addDescription().generate();
    const id = `/${testData.notExistId}`;
    const response = await challengerService.put(URLs.todos, headers, id, data);
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain(errorMessage.notCreateToDo);// Проверяем, что errorMessages содержит определенное сообщение

  });
});

test.describe('Update Challenges with POST', { tag: '@UpdateChallengesWithPOST' }, () => {

  test('17- POST /todos/{id} (200) -17', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const data = new Data().addTitle(testData.updateTitle).generate();
    const id = `/${testData.existId}`;
    const response = await challengerService.post(URLs.todos, headers, id, data);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.title).toContain(testData.updateTitle);

  });

  test('18- POST /todos/{id} (404) ', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const data = new Data().addTitle(testData.updateTitle).generate();
    const id = `/${testData.notExistId}`;
    const response = await challengerService.post(URLs.todos, headers, id, data);

    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain(errorMessage.wrongTodoId(testData.notExistId));// Проверяем, что errorMessages содержит определенное сообщение

  });
});

test.describe('Update Challenges with PUT', { tag: '@UpdateChallengesWithPOST' }, () => {

  test('19- PUT /todos/{id} full (200) ', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const id = `/${testData.existId}`;
    const data = new Data().addId(testData.existId).addTitle(testData.title).addStatus(false).addDescription().generate();

    const response = await challengerService.put(URLs.todos, headers, id, data);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toEqual(testData.existId);

  });

  test('20-PUT /todos/{id} partial (200)', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const id = `/${testData.existId}`;
    const data = new Data().addTitle(testData.updateTitle).generate();

    const response = await challengerService.put(URLs.todos, headers, id, data);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.title).toContain(testData.updateTitle);

  });


  test('21 - PUT /todos/{id} no title (400)', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const id = `/${testData.existId}`;
    const data = new Data().addDescription(testData.description).generate();

    const response = await challengerService.put(URLs.todos, headers, id, data);
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain(errorMessage.mandatoryField);// Проверяем, что errorMessages содержит определенное сообщение

  });

  test('22- PUT /todos/{id} no amend id (400)', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    const id = `/${testData.existId}`;
    const id2 = testData.existId2;
    const data = new Data().addId(id2).addTitle(testData.updateTitle).generate();

    const response = await challengerService.put(URLs.todos, headers, id, data);
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain(errorMessage.amendId(testData.existId, id2));// Проверяем, что errorMessages содержит определенное сообщение

  });

});

test.describe('DELETE Challenges', { tag: '@DeleteChallenges' }, () => {

  test('23 - DELETE /todos/{id} (200)', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();

    const id = `/${testData.existId}`;

    const response = await challengerService.delete(URLs.todos, headers, id, null);
    expect(response.status()).toBe(200);

    const responseId = await challengerService.get(URLs.todos, headers, id, null);
    expect(responseId.status()).toBe(404);

    const body = await responseId.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain(errorMessage.todoNotFound(testData.existId));// Проверяем, что errorMessages содержит определенное сообщение

  });
});

test.describe('Accept Challenges', { tag: '@AcceptChallenges' }, () => {

  test('25-GET /todos (200) XML', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.applicationXML).generate();
    const response = await challengerService.get(URLs.todos, headers, '', null);
    expect(response.status()).toBe(200);
    const headersResponse = await response.headers();
    const content = headersResponse['content-type'];
    expect(content).toBe(types.applicationXML);//проверяем, что ответ xml

  });

  test('26- GET /todos (200) JSON ', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.applicationJson).generate();
    const response = await challengerService.get(URLs.todos, headers, '', null);
    expect(response.status()).toBe(200);
    const headersResponse = await response.headers();
    const content = headersResponse['content-type'];
    expect(content).toBe(types.applicationJson);//проверяем, что ответ json

  });

  test('27- GET /todos (200) ANY ', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.any).generate();
    const response = await challengerService.get(URLs.todos, headers, '', null);
    expect(response.status()).toBe(200);
    const headersResponse = await response.headers();
    const content = headersResponse['content-type'];
    expect(content).toBe(types.applicationJson);//проверяем, что ответ json


  });

  test('28- GET /todos (200) XML pref ', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.applicationJsonXML).generate();
    const response = await challengerService.get(URLs.todos, headers, '', null);
    expect(response.status()).toBe(200);
    const headersResponse = await response.headers();
    const content = headersResponse['content-type'];

    let responseBody;

    if (content.includes('application/json')) {
      responseBody = await response.json();
      expect(responseBody).not.toEqual({});

    } else if (content.includes('application/xml')) {
      const responseBody = await response.text(); // Получаем тело ответа как текст
      expect(responseBody).not.toBe(undefined);
      expect(responseBody).not.toBe('');
      expect(responseBody.includes('<')).toBe(true);
      expect(responseBody.includes('</')).toBe(true);
    }

  });


  test('29 -GET /todos (200) no accep', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.noAccept).generate();
    const response = await challengerService.get(URLs.todos, headers, '', null);
    expect(response.status()).toBe(200);
    const headersResponse = await response.headers();
    const content = headersResponse['content-type'];
    expect(content).toBe(types.applicationJson);//проверяем, что ответ json


  });

  test('30-GET /todos (406)', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.noExist).generate();
    const response = await challengerService.get(URLs.todos, headers, '', null);
    expect(response.status()).toBe(406);
    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain(errorMessage.acceptNotExist);// Проверяем, что errorMessages содержит определенное сообщение

  });
});

test.describe('Content-Type Challenges', { tag: '@ContentTypeChallenges' }, () => {

  test('31 - POST /todos XML', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.applicationXML).addContent(types.applicationXML).generate();
    const data = new Data().addXML(testData.textXML).generate();

    const response = await challengerService.post(URLs.todos, headers, '', data);
    expect(response.status()).toBe(201);
    const headersResponse = await response.headers();
    const content = headersResponse['content-type'];
    expect(content).toBe(types.applicationXML);//проверяем, что ответ json
    const responseBody = await response.text(); // Получаем тело ответа как текст


    expect(responseBody).not.toBe('');
    expect(responseBody.includes('<')).toBe(true);
    expect(responseBody.includes('</')).toBe(true);

  });


  test('32 -POST /todos JSON ', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.applicationJson).addContent(types.applicationJson).generate();
    const data = new Data().addTitle(testData.title).addStatus(true).addDescription().generate();

    const response = await challengerService.post(URLs.todos, headers, '', data);
    expect(response.status()).toBe(201);

    const headersResponse = await response.headers();
    const content = headersResponse['content-type'];
    expect(content).toBe(types.applicationJson);//проверяем, что ответ json


  });


  test('33- POST /todos (415)', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.any).addContent(types.noExist).generate();
    const data = new Data().addTitle(testData.title).addStatus(true).addDescription().generate();

    const response = await challengerService.post(URLs.todos, headers, '', data);
    expect(response.status()).toBe(415);

    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain(errorMessage.unsupportedContentType(types.noExist));// Проверяем, что errorMessages содержит определенное сообщение

  });
});

test.describe('Fancy a Break? Restore your session', { tag: '@RestoreSession' }, () => {

  test('34 -GET /challenger/guid (existing X-CHALLENGER) ', async ({ request }) => {

    let challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    let token = headers['x-challenger']
    const response = await challengerService.get(URLs.challenger, headers, `/${token}`, null);

    expect(response.status()).toBe(200);
    const body = await response.json();
    //console.log(body);
    expect(body.challengeStatus.GET_RESTORABLE_CHALLENGER_PROGRESS_STATUS).toBeTruthy();

  });

  test('35 -PUT /challenger/guid RESTORE ', async ({ request }) => {

    let challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    let token = headers['x-challenger']
    const response = await challengerService.get(URLs.challenger, headers, `/${token}`, null);

    expect(response.status()).toBe(200);
    const body = await response.json();
    //console.log(body);
    expect(body.challengeStatus.GET_RESTORABLE_CHALLENGER_PROGRESS_STATUS).toBeTruthy();

    const responseStore = await challengerService.put(URLs.challenger, headers, `/${token}`, body);
    expect(response.status()).toBe(200);

  });
  
    test('36 -PUT /challenger/guid RESTORE ', async ({ request }) => {
  
      let  challengerService = new ChallengerService(request);
      const headers = new Headers().addToken().generate();
      let token = headers['x-challenger'];

      const tokenNew = new UUID().addUuid().generate();
      
      console.log(token);
      const response = await challengerService.get(URLs.challenger, headers,`/${token}`,null);
  
      expect(response.status()).toBe(200);
      const body = await response.json();
      
      expect(body.challengeStatus.GET_RESTORABLE_CHALLENGER_PROGRESS_STATUS).toBeTruthy();
  
      const payload = { ...body, xChallenger: tokenNew.uuid };//опдменяем на несуществующий uuid
      ///отправляем запрос с новый body и новым uuid
      const responseStore = await challengerService.put(URLs.challenger, headers,`/${tokenNew.uuid}`,payload);
      expect(responseStore.status()).toBe(201);
  
    });
  
  test('37 -GET /chanlenger/database/guid (200)', async ({ request }) => {

    let challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    let token = headers['x-challenger']
    const response = await challengerService.get(URLs.database, headers, `/${token}`, null);

    expect(response.status()).toBe(200);


  });

  test('38 -PUT /challenger/database/guid (Update)', async ({ request }) => {


    let challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    let token = headers['x-challenger']
    const response = await challengerService.get(URLs.database, headers, `/${token}`, null);

    expect(response.status()).toBe(200);
    const body = await response.json();
   
   const responseStore = await challengerService.put(URLs.database, headers, `/${token}`, body);
    expect(response.status()).toBe(200);

  });



});


test.describe('Mix Accept and Content-Type Challenges', { tag: '@MixAcceptContentTypeChallenges' }, () => {

  test('39- POST /todos XML to JSON ', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.applicationJson).addContent(types.applicationXML).generate();
    const data = new Data().addXML(testData.textXML).generate();

    const response = await challengerService.post(URLs.todos, headers, '', data);
    expect(response.status()).toBe(201);

    const headersResponse = await response.headers();
    const content = headersResponse['content-type'];
    expect(content).toBe(types.applicationJson);//проверяем, что ответ json

  });

  test('40- POST /todos JSON to XML ', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.applicationXML).addContent(types.applicationJson).generate();
    const data = new Data().addTitle(testData.title).addStatus(true).addDescription().generate();

    const response = await challengerService.post(URLs.todos, headers, '', data);
    expect(response.status()).toBe(201);

    const responseBody = await response.text(); // Получаем тело ответа как текст

    expect(responseBody).not.toBe('');
    expect(responseBody.includes('<')).toBe(true);
    expect(responseBody.includes('</')).toBe(true);


  });
});

test.describe('Status Code Challenges', { tag: '@StatusCodeChallenges' }, () => {

  test('41- DELETE /heartbeat ', async ({ request }) => {
    //получаем токен

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.any).generate();
    const response = await challengerService.delete(URLs.heartbeat, headers, '', null);
    expect(response.status()).toBe(405);

  });

  test('42- PATCH /heartbeat (500)', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.any).generate();
    const response = await challengerService.patch(URLs.heartbeat, headers, '', null);
    expect(response.status()).toBe(500);

  });
  /*test('43-TRACE /heartbeat (501))', async ({ page,request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addHttpMethod(method.httpMethodTrace).generate();
    console.log(headers );
    
    const response= await challengerService.post(URLs.heartbeat,headers, '', null);
    expect(response.status()).toBe(501);
    
  });*/

  test('44-GET /heartbeat (204)', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.any).generate();
    const response = await challengerService.get(URLs.heartbeat, headers, '', null);
    expect(response.status()).toBe(204);


  });
});

test.describe('HTTP Method Override Challenges', { tag: '@HttpMethodOverrideChallenges' }, () => {

  test('45- POST /heartbeat as DELETE (405)', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.any).addHttpMethod(method.httpMethodDelete).generate();
    const response = await challengerService.post(URLs.heartbeat, headers, '', null);
    expect(response.status()).toBe(405);

  });


  test('46 - POST /heartbeat as PATCH (500) ', async ({ request }) => {

    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.any).addHttpMethod(method.httpMethodPatch).generate();
    const response = await challengerService.post(URLs.heartbeat, headers, '', null);
    expect(response.status()).toBe(500);

  });


  test('47- POST /heartbeat as Trace (501)', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.any).addHttpMethod(method.httpMethodTrace).generate();
    const response = await challengerService.post(URLs.heartbeat, headers, '', null);
    expect(response.status()).toBe(501);

  });

});

test.describe('Authentication Challenges', { tag: '@AuthenticationChallenges' }, () => {

  test('48-POST /secret/token (401)', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.any).addAuth(testData.authorizationIncorrect).generate();
    const response = await challengerService.post(URLs.authetication, headers, '', null);
    expect(response.status()).toBe(401);

  });

  test('49-POST /secret/token (201)', async ({ request }) => {
    challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().addAccept(types.any).addAuth(testData.authorizationCorrect).generate();
    const response = await challengerService.post(URLs.authetication, headers, '', null);
    expect(response.status()).toBe(201);


  });
});




