#операционная система или другой образ
FROM mcr.microsoft.com/playwright:v1.50.1
#копируем папку с автотетами в наш будущий образ
COPY . .

RUN npm i
#установить браузеры и зависимости
RUN npx playwright install --with-deps
CMD ["npm","run","test"]