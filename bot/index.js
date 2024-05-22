const { BotFrameworkAdapter, MemoryStorage, ConversationState } = require('botbuilder');
const { BotActivityHandler } = require('./botActivityHandler');
require('dotenv').config();

const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const botActivityHandler = new BotActivityHandler(conversationState);

adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError]: ${error}`);
    await context.sendActivity(`Oops. Something went wrong!`);
    await conversationState.clear(context);
    await conversationState.saveChanges(context);
};

const restify = require('restify');
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await botActivityHandler.run(context);
    });
});

server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${server.name} listening to ${server.url}`);
});
