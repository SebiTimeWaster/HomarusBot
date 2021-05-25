const config = {
    // General configuration
    botToken: '', // the discord bot token
    commandPrefix: '!', // the prefix used for commands defined in the rule files
    adminChannelID: '', // the channel where administrative messages (responses.admin) will be sent to (Optional)
    rules: {
        // which rule files should be loaded on startup. order is important and as a rule of thumb it should be: policing, commands, everything else
        message: ['policing', 'help', 'various'],
        messageDelete: [],
    },
};

module.exports = config;
