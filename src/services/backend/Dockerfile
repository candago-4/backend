FROM node:18.19.0

WORKDIR /app

COPY ../../../package.json ../../../package-lock.json ./

RUN npm install

COPY . .

RUN npm install -g ts-node-dev

CMD ["npx ts-node-dev", "index.ts"]