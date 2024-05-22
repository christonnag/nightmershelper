const { ActivityHandler } = require('botbuilder');

class BotActivityHandler extends ActivityHandler {
    constructor(conversationState) {
        super();
        if (!conversationState) throw new Error('Missing parameter. conversationState is required');

        this.conversationState = conversationState;

        this.onMessage(async (context, next) => {
            const text = context.activity.text;
            await context.sendActivity(`You said: ${text}`);
            // Here you would integrate with MS Copilot
            // Assuming MS Copilot has an endpoint you can call
            // const response = await fetchFromCopilot(text);
            // await context.sendActivity(response);
            await next();
        });
    }
}

module.exports.BotActivityHandler = BotActivityHandler;
