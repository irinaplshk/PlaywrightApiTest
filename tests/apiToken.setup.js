import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { ChallengerService} from '../src/service/index';
import {URLs} from '../src/structures/index';


const tokenFile = 'playwright/.authtoken/token.json';
const tokenFilePrevious = 'playwright/.authtoken/tokenPrevious.json';
setup('get token ', async ({ request }) => {

    let  challengerService = new ChallengerService(request);
    const response = await challengerService.postChallenger(URLs.challenger);

    expect(response.status()).toBe(201);
    const headers = await response.headers();
    

   let  token = headers['x-challenger'];
   
    // Убедитесь, что директория существует
    const dir = path.dirname(tokenFile);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    // Сохраните токен в файл
    fs.writeFileSync(tokenFile, token);
    console.log(token);
});