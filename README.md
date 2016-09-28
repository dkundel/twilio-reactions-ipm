# Twilio IP Messaging Demo with Angular 2

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.15.

# Interesting Files

| File | Description |
| :----: | :------------: |
[server.js Lines 28-58](lib/server.js#L28-L58) | Exposes `/token` endpoint that generates a token for the client
[angular-cli.json](angular-cli.json#L23-L24) | Pull in client libraries
[typings.json](src/typings.json#L3-L4) | Uses the **currently experimental** TypeScript typings for the Twilio JS SDK
[messaging.service.ts](src/app/messaging.service.ts) | All interaction with the Twilio IP Messaging SDK
[=> getToken()](src/app/messaging.service.ts#L75) | Retrieves token from `/token` endpoint
[=> createClient()](src/app/messaging.service.ts#L79-L80) | Initializes client connection using the token
[=> getOrCreateChannel()](src/app/messaging.service.ts#L86-93) | Tries to get a specific channel or alternatively creates it
[=> joinChannel()](src/app/messaging.service.ts#L98) | Joins a given channel
[=> setupListenerChannel()](src/app/messaging.service.ts#L105) | Starts listening on incoming messages for that channel
[=> getWholeHistoryStats()](src/app/messaging.service.ts#L131) | Gets a paged list of historic messages
[=> getPagedContent()](src/app/messaging.service.ts#L140-L141) | Checks if another page of messages exists and fetches these

# Setup project

### 1. [Register for free at Twilio](https://www.twilio.com/try-twilio)

### 2. Get the Twilio configuration values:

| Config Value  | Description |
| :-------------  |:------------- |
Service Instance SID | Like a database for your IP Messaging data - [generate one in the console here](https://www.twilio.com/console/ip-messaging/services)
Account SID | Your primary Twilio account identifier - find this [in the console here](https://www.twilio.com/console/ip-messaging/getting-started).
API Key | Used to authenticate - [generate one here](https://www.twilio.com/console/ip-messaging/dev-tools/api-keys).
API Secret | Used to authenticate - [just like the above, you'll get one here](https://www.twilio.com/console/ip-messaging/dev-tools/api-keys).

### 3. Copy `.env.example` and fill in configuration values in `.env`
```bash
cp .env.example .env
```

### 4. Install Node dependencies
```bash
npm install
```

### 5. Build source and start server
Either run
```bash
npm start
```

Or run:
```bash
npm run build
node .
```

### 6. Navigate to `https://localhost:3000`

### 7. Do modifications as you like.

You can modify the title and emojis available in the `src/environments/environment.ts` file.

[Or how about writing a bot?](https://www.twilio.com/blog/2016/08/writing-a-bot-for-ip-messaging-in-node-js.html)

### We can’t wait to see what you build.

---

# Angular-CLI related

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

**IMPORTANT**:
This will only serve the UI. The IP Messaging will require an endpoint at `/token` which won't be given this way and will crash the application.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
