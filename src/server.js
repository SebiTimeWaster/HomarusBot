import fs from 'fs';
import Discord from 'discord.js';
import { log } from './utils/index.js';
import { MessageHandler } from './handlers/index.js';
import config from '../config.js';

const loadRules = (ruleNames, eventName) => {
    let rules = [];

    ruleNames.forEach((ruleName) => {
        const rule = require(`../rules/${eventName}.${ruleName}.js`).default;

        if (Array.isArray(rule)) rules.push(...rule);
        else if (typeof rule === 'object') rules.push(rule);
        else throw `Error: Unknown error loading rule file "/rules/${eventName}.${ruleName}.js"`;
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

    client.login(config.botToken);
} catch (e) {
    console.error(e);
}
