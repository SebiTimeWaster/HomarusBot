const fs = require('fs');
const Discord = require('discord.js');
const { log } = require('./utils/');
const { MessageHandler } = require('./handlers/');
const config = require('../../config') || require('../config');

const loadRules = (ruleNames, eventName) => {
    let rules = [];

    ruleNames.forEach((ruleName) => {
        const rulePath = `../rules/${eventName}.${ruleName}.js`;
        const rule = require(`../${rulePath}`) || require(rulePath);

        if (Array.isArray(rule)) rules.push(...rule);
        else if (typeof rule === 'object') rules.push(rule);
        else throw `Error: Unknown error loading rule file "./rules/${eventName}.${ruleName}.js"`;
    });

    return { rules };
};

try {
    const messageConfig = Object.assign({}, config, loadRules(config.rules.message, 'message'));
    const messageDeleteConfig = Object.assign({}, config, loadRules(config.rules.messageDelete, 'messageDelete'));
    const client = new Discord.Client();

    client.once('ready', log('The bot is up and running!', 0));
    if (messageConfig.rules.length) client.on('message', (messageObj) => new MessageHandler(messageConfig, messageObj).handle());
    if (messageDeleteConfig.rules.length) client.on('messageDelete', (messageObj) => new MessageHandler(messageDeleteConfig, messageObj).handle());

    client.login(config.botToken).catch(console.error);
} catch (e) {
    console.error(e);
}
