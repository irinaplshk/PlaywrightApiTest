import { test, expect } from '@playwright/test';
import { ChallengesService , ChallengerService, TodosService, TodoService,DatabaseService,HeartbeatService,SecretTokeneService} from '../src/service/index';
import { Headers, Data, UUID} from '../src/builder/index';
import { header,auth} from '../src/helpers/index';
const fs = require('fs');

let challengesService;
let todosService;
let todoService;
let challengerService ;
let databaseService;
let heartbeatService;
let secretTokeneService;

test.describe('First Real Challenge', { tag: '@getAllChallenge' }, () => {

  test('2- get list of challengers ', { tag: '@ChallengesService' }, async ({ request }) => {

    challengesService = new ChallengesService(request);
    const response = await challengesService.getChallenges();
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.challenges.length).toBeGreaterThan(0);

  });
});

test.describe('GET Challenges', { tag: '@GetChallenges' }, () => {

  test('3-get todos',{ tag: '@todosService' }, async ({ request }) => {
    todosService = new TodosService(request);
    const response = await todosService.getTodos();
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.todos.length).toBeGreaterThan(0);


  });

  test('4- get todo not plural',{ tag: '@todoService' }, async ({ request }) => {

    todoService = new TodoService(request);
    const response = await todoService.getTodo();
    expect(response.status()).toBe(404);

  });

  test('5-get todos id',{ tag: '@todosService' }, async ({ request }) => {

    todosService = new TodosService(request);
    const response = await todosService.getTodos();
    const body = await response.json();
    expect(body.todos.length).toBeGreaterThan(0);//проверяем, что полученный массив не пустой
    const ids = body.todos.map(todo => todo.id);// получаем список всех id
    const id = ids[ids.length - 1];//запрос  по  последнему элементу
    let element = `/${id}`;


    const responseId = await todosService.getTodos(undefined,element);
    expect(responseId.status()).toBe(200);

    const bodyid = await responseId.json();
    expect(bodyid.todos.length).toBeGreaterThan(0);// проверяем,что полученный массив не пустой
    const todo = bodyid.todos.find(todo => todo.id === id);//находим наш элемент в полученном массиве
    expect(todo.id).toBe(id);// Проверяем, что элемент с id 10 существует

  });

  test('6-get todos id not exist',{ tag: '@todosService' }, async ({ request }) => {

    todosService = new TodosService(request);
    const response = await todosService.getTodos();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.todos.length).toBeGreaterThan(0);//проверяем, что полученный массив не пустой
    const ids = body.todos.map(todo => todo.id);// получаем список всех id
    const id = ids.length + 23;//запрос  по  последнему элементу 23
   
    const responseId = await todosService.getTodos(undefined,`/${id}`);
    expect(responseId.status()).toBe(404);

    const bodyErr = await responseId.json();

    // Проверяем, что errorMessages содержит определенное сообщение
    expect(bodyErr.errorMessages).toContain(`Could not find an instance with todos/${id}`);

  });

  test('7-get todos filtre', { tag: '@todosService' },async ({ request }) => {


    todosService = new TodosService(request);
    const dataNewObject = new Data().addTitle(40).addStatus().addDescription(10).generate();
    
    const responseNewObject = await todosService.postTodos(undefined,undefined, dataNewObject);
    expect(responseNewObject.status()).toBe(201);//объект с "doneStatus": true создан 
    let element = `?doneStatus=true`;
    const response = await todosService.getTodos(undefined,element);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.todos.length).toBeGreaterThan(0); //todo проверить что получили в отчете массив не пустой
   
  });


});

test.describe('HEAD Challenges', { tag: '@HeadChallenges' }, () => {

  test('8-get head challengers ',{ tag: '@todosService' }, async ({ request }) => {

    todosService = new TodosService(request);
    const response = await todosService.headTodos();
    expect(response.status()).toBe(200);

  });
});

test.describe('Creation Challenges with POST', { tag: '@CreationChallengesWithPOST' }, () => {

  test('9- create todos ',{ tag: '@todosService' }, async ({ request }) => {

    todosService = new TodosService(request);
    const data = new Data().addTitle(30).addStatus().addDescription(10).generate();

    const response = await todosService.postTodos(undefined, undefined, data);
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.title).toContain(data.title);///проверяем, что  новый объект создался корректным

  });

  test('10- post invalid todos: status ', { tag: '@todosService' }, async ({ request }) => {
    todosService = new TodosService(request);
    const data = new Data().addTitle(30).addStatus('test').addDescription().generate();
    
    const response = await todosService.postTodos(undefined,undefined, data);
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain(`Failed Validation: doneStatus should be BOOLEAN but was STRING`);// Проверяем, что errorMessages содержит определенное сообщение

  });

  test('11-post invalid todos:long title', { tag: '@todosService' }, async ({ request }) => {

    todosService = new TodosService(request);
    const data = new Data().addTitle(60).addStatus().addDescription(10).generate();
    const response = await todosService.postTodos(undefined,undefined, data);
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain('Failed Validation: Maximum allowable length exceeded for title - maximum allowed is 50');
    // Проверяем, что errorMessages содержит определенное сообщение

  });


  test('12-post invalid todos :long description', { tag: '@todosService' }, async ({ request }) => {

    todosService = new TodosService(request);
    const data = new Data().addTitle(40).addStatus().addDescription(210).generate();
    const response = await todosService.postTodos(undefined,undefined, data);
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain('Failed Validation: Maximum allowable length exceeded for description - maximum allowed is 200');// Проверяем, что errorMessages содержит определенное сообщение

  });

  test('13-post max out content: title : 50 and description :200 ', { tag: '@todosService' }, async ({ request }) => {

    todosService = new TodosService(request);
    const data = new Data().addTitle(50).addStatus().addDescription(200).generate();
    const response = await todosService.postTodos(undefined,undefined, data);
    expect(response.status()).toBe(201);

    const body = await response.json();
    
    expect(body.title.length).toBe(50);
    expect(body.description.length).toBe(200);

  });


  test('14 - post huge description: 5500 ',{ tag: '@todosService' }, async ({ request }) => {

    todosService = new TodosService(request);
    const data = new Data().addTitle(40).addStatus(true).addDescription(5500).generate();
    const response = await await todosService.postTodos(undefined,undefined, data);
    expect(response.status()).toBe(413);

    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain('Error: Request body too large, max allowed is 5000 bytes');
    // Проверяем, что errorMessages содержит определенное сообщение

  });

  test('15-payload contains an unrecognised field ',{ tag: '@todosService' }, async ({ request }) => {

    todosService = new TodosService(request);
    const data = new Data().addTitle(20).addStatus().addPriority(20).generate();

    const response = await todosService.postTodos(undefined,undefined, data);
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain("Could not find field: priority");
    // Проверяем, что errorMessages содержит определенное сообщение

  });
});

test.describe('Creation Challenges with PUT', { tag: '@CreationChallengesWithPUT' }, () => {

  test('16 - Cannot create todo with PUT due to Auto fields id',{ tag: '@todosService' }, async ({ request }) => {

    todosService = new TodosService(request);
    //const headers = new Headers().addToken().generate();
    const data = new Data().addTitle(20).addStatus().addDescription(10).generate();
    const id = `/66`;
    const response = await todosService.putTodos(undefined, id, data);
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain('Cannot create todo with PUT due to Auto fields id');// Проверяем, что errorMessages содержит определенное сообщение

  });
});

test.describe('Update Challenges with POST', { tag: '@UpdateChallengesWithPOST' }, () => {

  test('17- change title in exist todos ', { tag: '@todosService' }, async ({ request }) => {

    todosService = new TodosService(request);
    //const headers = new Headers().addToken().generate();
    const data = new Data().addTitle(30).generate();
    const id = 1;
    const response = await todosService.postTodos(undefined, `/${id}`, data);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.title).toContain(data.title);
    expect(body.id).toEqual(id);
  });

  test('18- change title in not exist todos ',{ tag: '@todosService' }, async ({ request }) => {

    todosService = new TodosService(request);
    const data = new Data().addTitle(30).generate();
    const id = 56;
    
    const response = await todosService.postTodos(undefined, `/${id}`, data);
    expect(response.status()).toBe(404);
    const body = await response.json();

    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain(`No such todo entity instance with id == ${id} found`);// Проверяем, что errorMessages содержит определенное сообщение

  });
});

test.describe('Update Challenges with PUT', { tag: '@UpdateChallengesWithPOST' }, () => {

  test('19- update an existing todo with id',{ tag: '@todosService' }, async ({ request }) => {

    todosService = new TodosService(request);
    const id = 5;
    const data = new Data().addId(id).addTitle(30).addStatus().addDescription(10).generate();

    const response = await todosService.putTodos(undefined, `/${id}`, data);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toEqual(id);
    expect(body.title).toEqual(data.title);
    expect(body.description).toEqual(data.description);
  });

  test('20-update title an existing todo without id', { tag: '@todosService' }, async ({ request }) => {

    todosService = new TodosService(request);
    const id = 5;
    const data = new Data().addTitle(40).generate();

    const response = await todosService.putTodos(undefined,`/${id}`, data);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.title).toContain(data.title);

  });


  test('21 -  Send a PUT request  with no title',{ tag: '@todosService' }, async ({ request }) => {

    todosService = new TodosService(request);
    const id = 5;
    const data = new Data().addDescription(50).generate();

    const response = await todosService.putTodos(undefined, `/${id}`, data);
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain('title : field is mandatory');
    // Проверяем, что errorMessages содержит определенное сообщение

  });

  test('22- Send a PUT request  with a different id in the url than in the payload',{ tag: '@todosService' }, async ({ request }) => {

    todosService = new TodosService(request);
    const id = 5;
    const id2 = 6;
    const data = new Data().addId(id2).addTitle(40).generate();

    const response = await todosService.putTodos(undefined, `/${id}`, data);
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain(`Can not amend id from ${id} to ${id2}`);// Проверяем, что errorMessages содержит определенное сообщение

  });

});

test.describe('DELETE Challenges', { tag: '@DeleteChallenges' }, () => {

  test('23 - Successfully delete a todo', { tag: '@todosService' }, async ({ request }) => {
    todosService = new TodosService(request);
    const id = 7;

    const response = await todosService.deleteTodos(undefined, `/${id}`);
    expect(response.status()).toBe(200);

    const responseId = await todosService.getTodos(undefined, `/${id}`);
    expect(responseId.status()).toBe(404);

    const body = await responseId.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain(`Could not find an instance with todos/${id}`);
    // Проверяем, что errorMessages содержит определенное сообщение

  });
});

test.describe('Accept Challenges', { tag: '@AcceptChallenges' }, () => {

  test('25-Request  with an `Accept` header of `application/xml` to receive results in XML format',{ tag: '@todosService' }, async ({ request }) => {
    todosService = new TodosService(request);
    const headers = new Headers().addToken().addAccept(header.applicationXML).generate();
    const response = await todosService.getTodos( headers);
    expect(response.status()).toBe(200);
    const headersResponse = await response.headers();
    const content = headersResponse['content-type'];
    expect(content).toBe(header.applicationXML);//проверяем, что ответ xml

  });

  test('26- Request  with an `Accept` header of `application/json` to receive results in JSON format', { tag: '@todosService' },async ({ request }) => {
    todosService = new TodosService(request);
    const headers = new Headers().addToken().addAccept(header.applicationJson).generate();
    const response = await todosService.getTodos(headers);
    expect(response.status()).toBe(200);
    const headersResponse = await response.headers();
    const content = headersResponse['content-type'];
    expect(content).toBe(header.applicationJson);//проверяем, что ответ json

  });

  test('27- Request `Accept` header of `*/*` to receive results in default JSON format',{ tag: '@todosService' }, async ({ request }) => {
    todosService = new TodosService(request);
    const headers = new Headers().addToken().addAccept(header.any).generate();
    const response = await todosService.getTodos(headers);
    expect(response.status()).toBe(200);
    const headersResponse = await response.headers();
    const content = headersResponse['content-type'];
    expect(content).toBe(header.applicationJson);//проверяем, что ответ json


  });

  test('28- Request  with an `Accept` header of `application/xml, application/json` to receive results in the preferred XML format',{ tag: '@todosService' }, async ({ request }) => {
    todosService = new TodosService(request);
    const headers = new Headers().addToken().addAccept(header.applicationJsonXML).generate();
    const response = await todosService.getTodos( headers);
    expect(response.status()).toBe(200);
    const headersResponse = await response.headers();
    const content = headersResponse['content-type'];

    let responseBody;

    if (content.includes(header.applicationJson)) {
      responseBody = await response.json();
      expect(responseBody).not.toEqual({});

    } else if (content.includes(header.applicationJsonXML)) {
      const responseBody = await response.text(); // Получаем тело ответа как текст
      expect(responseBody).not.toBe(undefined);
      expect(responseBody).not.toBe('');
      expect(responseBody.includes('<')).toBe(true);
      expect(responseBody.includes('</')).toBe(true);
    }

  });


  test('29 -Request with  no accept',{ tag: '@todosService' }, async ({ request }) => {
    todosService = new TodosService(request);
    const headers = new Headers().addToken().addAccept(header.noAccept).generate();
    const response = await todosService.getTodos(headers);
    expect(response.status()).toBe(200);
    const headersResponse = await response.headers();
    const content = headersResponse['content-type'];
    expect(content).toBe(header.applicationJson);//проверяем, что ответ json


  });

  test('30-Request with  not exist accept',{ tag: '@todosService' }, async ({ request }) => {
    todosService = new TodosService(request);
    const headers = new Headers().addToken().addAccept(header.noExist).generate();
    const response = await todosService.getTodos( headers);
    expect(response.status()).toBe(406);
    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain('Unrecognised Accept Type');// Проверяем, что errorMessages содержит определенное сообщение

  });
});

test.describe('Content-Type Challenges', { tag: '@ContentTypeChallenges' }, () => {

  test('31 - Request on the `/todos` end point to create a todo using Content-Type `application/xml`, and Accepting only XML ', { tag: '@todosService' },async ({ request }) => {
    todosService = new TodosService(request);
    const headers = new Headers().addToken().addAccept(header.applicationXML).addContent(header.applicationXML).generate();
    const data = new Data().addXML().generate();

    const response = await todosService.postTodos( headers,undefined, data);
    expect(response.status()).toBe(201);
    const headersResponse = await response.headers();
    const content = headersResponse['content-type'];
    expect(content).toBe(header.applicationXML);//проверяем, что ответ json
    const responseBody = await response.text(); // Получаем тело ответа как текст


    expect(responseBody).not.toBe('');
    expect(responseBody.includes('<')).toBe(true);
    expect(responseBody.includes('</')).toBe(true);

  });


  test('32 - Request on the `/todos` end point to create a todo using Content-Type `application/json`, and Accepting only JSON',{ tag: '@todosService' }, async ({ request }) => {
    todosService = new TodosService(request);
    const headers = new Headers().addToken().addAccept(header.applicationJson).addContent(header.applicationJson).generate();
    const data = new Data().addTitle(30).addStatus().addDescription(15).generate();

    const response = await todosService.postTodos( headers,undefined, data);
    expect(response.status()).toBe(201);

    const headersResponse = await response.headers();
    const content = headersResponse['content-type'];
    expect(content).toBe(header.applicationJson);//проверяем, что ответ json


  });


  test('33- Request on the `/todos` end point with an unsupported content type to generate a 415 status code',{ tag: '@todosService' }, async ({ request }) => {
    todosService = new TodosService(request);
    const headers = new Headers().addToken().addAccept(header.any).addContent(header.noExist).generate();
    const data = new Data().addTitle(30).addStatus().addDescription(20).generate();

    const response = await todosService.postTodos(headers, undefined, data);
    expect(response.status()).toBe(415);

    const body = await response.json();
    expect(body.errorMessages).toBeDefined();// Проверяем, что поле errorMessages определено
    expect(body.errorMessages).toContain(`Unsupported Content Type - ${header.noExist}`);// Проверяем, что errorMessages содержит определенное сообщение

  });
});

test.describe('Fancy a Break? Restore your session', { tag: '@RestoreSession' }, () => {

  test('34 -Request on the `/challenger/{guid}` end point, with an existing challenger GUID', { tag: '@challengerService' },async ({ request }) => {

    let challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    let token = headers['x-challenger']
    const response = await challengerService.getChallenger(headers, `/${token}`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    //console.log(body);
    expect(body.challengeStatus.GET_RESTORABLE_CHALLENGER_PROGRESS_STATUS).toBeTruthy();

  });

  test('35 -Request `/challenger/{guid}`  with an existing challenger GUID to restore that challengers progress into memory.',{ tag: '@challengerService' }, async ({ request }) => {

    let challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    let token = headers['x-challenger']
    const response = await challengerService.getChallenger(headers, `/${token}`, null);

    expect(response.status()).toBe(200);
    const body = await response.json();
    
    expect(body.challengeStatus.GET_RESTORABLE_CHALLENGER_PROGRESS_STATUS).toBeTruthy();

    const responseStore = await challengerService.putChallenger( headers, `/${token}`, body);
    expect(response.status()).toBe(200);

  });
  
    test('36 -Issue a PUT request on the `/challenger/{guid}` end point, with a challenger GUID not currently in memory to restore that challengers progress into memory.',{ tag: '@challengerService' }, async ({ request }) => {
  
      challengerService = new ChallengerService(request);
      const headers = new Headers().addToken().generate();
      let token = headers['x-challenger'];//существующий токен

      const tokenNew = new UUID().addUuid().generate();//формируем новый токен
      
      console.log(token);
      const response = await challengerService.getChallenger(undefined,`/${token}`);
  
      expect(response.status()).toBe(200);
      const body = await response.json();
      
      expect(body.challengeStatus.GET_RESTORABLE_CHALLENGER_PROGRESS_STATUS).toBeTruthy();
  
      const payload = { ...body, xChallenger: tokenNew.uuid };//опдменяем на несуществующий uuid
      ///отправляем запрос с новый body и новым uuid
      const responseStore = await challengerService.putChallenger(undefined,`/${tokenNew.uuid}`,payload);
      expect(responseStore.status()).toBe(201);
  
    });
  
  test('37 -Request on the `/challenger/database/{guid}` end point, to retrieve the current todos database for the user.',{ tag: '@challengerService' },async ({ request }) => {

    let challengerService = new ChallengerService(request);
    const headers = new Headers().addToken().generate();
    let token = headers['x-challenger']
    const response = await challengerService.getChallenger(headers, `/${token}`);

    expect(response.status()).toBe(200);


  });

  test('38 -Request on the `/challenger/database/{guid}` end point, with a payload to restore the Todos database in memory.',{ tag: '@databaseService' }, async ({ request }) => {


    databaseService = new DatabaseService(request);
    const headers = new Headers().addToken().generate();
    let token = headers['x-challenger']
    const response = await databaseService.getDatabase(headers, `/${token}`);

    expect(response.status()).toBe(200);
    const body = await response.json();
   
   const responseStore = await databaseService.putDatabase( headers, `/${token}`, body);
    expect(response.status()).toBe(200);

  });



});


test.describe('Mix Accept and Content-Type Challenges', { tag: '@MixAcceptContentTypeChallenges' }, () => {

  test('39- Request on the `/todos` end point to create a todo using Content-Type `application/xml` but Accept `application/json`',{ tag: '@todosService' }, async ({ request }) => {

    todosService = new TodosService(request);
    const headers = new Headers().addToken().addAccept(header.applicationJson).addContent(header.applicationXML).generate();
    const data = new Data().addXML().generate();

    const response = await todosService.postTodos(headers,undefined, data);
    expect(response.status()).toBe(201);

    const headersResponse = await response.headers();
    const content = headersResponse['content-type'];
    expect(content).toBe(header.applicationJson);//проверяем, что ответ json

  });

  test('40- Request on the `/todos` end point to create a todo using Content-Type `application/json` but Accept `application/xml`',{ tag: '@todosService' }, async ({ request }) => {
    todosService = new TodosService(request);
    const headers = new Headers().addToken().addAccept(header.applicationXML).addContent(header.applicationJson).generate();
    const data = new Data().addTitle(25).addStatus().addDescription(10).generate();

    const response = await todosService.postTodos( headers,undefined, data);
    expect(response.status()).toBe(201);

    const responseBody = await response.text(); // Получаем тело ответа как текст

    expect(responseBody).not.toBe('');
    expect(responseBody.includes('<')).toBe(true);
    expect(responseBody.includes('</')).toBe(true);


  });
});

test.describe('Status Code Challenges', { tag: '@StatusCodeChallenges' }, () => {

  test('41- DELETE /heartbeat ',{ tag: '@heartbeatService' }, async ({ request }) => {
    
    heartbeatService = new HeartbeatService(request);
    const response = await heartbeatService.deleteHertbeat();
    expect(response.status()).toBe(405);

  });

  test('42- PATCH /heartbeat (500)',{ tag: '@heartbeatService' }, async ({ request }) => {
    heartbeatService = new HeartbeatService(request);
    const response = await heartbeatService.patchHertbeat();
    expect(response.status()).toBe(500);

  });
  

  test('44-GET /heartbeat (204)',{ tag: '@heartbeatService' }, async ({ request }) => {
    heartbeatService = new HeartbeatService(request);
    
    const response = await heartbeatService.getHertbeat();
    expect(response.status()).toBe(204);


  });
});

test.describe('HTTP Method Override Challenges', { tag: '@HttpMethodOverrideChallenges' }, () => {

  test('45- POST /heartbeat as DELETE (405)', { tag: '@heartbeatService' }, async ({ request }) => {
    heartbeatService = new HeartbeatService(request);
    const headers = new Headers().addToken().addHttpMethod(header.httpMethodDelete).generate();
    const response = await heartbeatService.postHertbeat(headers);
    expect(response.status()).toBe(405);

  });


  test('46 - POST /heartbeat as PATCH (500) ', { tag: '@heartbeatService' }, async ({ request }) => {

    heartbeatService = new HeartbeatService(request);
    const headers = new Headers().addToken().addHttpMethod(header.httpMethodPatch).generate();
    const response = await heartbeatService.postHertbeat(headers);
    expect(response.status()).toBe(500);

  });


  test('47- POST /heartbeat as Trace (501)', { tag: '@heartbeatService' }, async ({ request }) => {
    heartbeatService = new HeartbeatService(request);
    const headers = new Headers().addToken().addHttpMethod(header.httpMethodTrace).generate();
    
    const response = await heartbeatService.postHertbeat( headers);
    expect(response.status()).toBe(501);

  });

});

test.describe('Authentication Challenges', { tag: '@AuthenticationChallenges' }, () => {

  test('48-Request on the `/secret/token` end point and receive 401 when Basic auth username/password is not admin/password', { tag: '@secretTokeneService' }, async ({ request }) => {
    secretTokeneService = new SecretTokeneService(request);
    const headers = new Headers().addToken().addAuth(auth.authorizationIncorrect).generate();
    
    const response = await secretTokeneService.postToken(headers);
    expect(response.status()).toBe(401);

  });

  test('49-Request on the `/secret/token` end point and receive 201 when Basic auth username/password is admin/password', { tag: '@secretTokeneService' }, async ({ request }) => {
    secretTokeneService = new SecretTokeneService(request);
    const headers = new Headers().addToken().addAuth(auth.authorizationCorrect).generate();
    const response = await secretTokeneService.postToken( headers);
    expect(response.status()).toBe(201);


  });
});




