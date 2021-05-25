const { log, getOptParam } = require('../utils/');

class MessageHandler {
    constructor(config, messageObj) {
        this.config = config;
        this.adminChannel = messageObj.client.channels.cache.get(this.config.adminChannelID);
        this.messageObj = messageObj;
        this.message = this.messageObj.content.toLowerCase().trim();
    }

    doesKeywordMatch(keyword, wordBounds, startsWith) {
        const regeExp = `${startsWith ? '^' : ''}${wordBounds && !startsWith ? '\\b' : ''}${keyword}${wordBounds ? '\\b' : ''}`;

        return this.message.match(new RegExp(regeExp, 'm')); // REGEXP!
    }

    userHasRights(map) {
        const allowedRoleIDs = getOptParam(map.allowedRoleIDs, []);
        const allowedChannelIDs = getOptParam(map.allowedChannelIDs, []);
        const allowedCategoryIDs = getOptParam(map.allowedCategoryIDs, []);
        const roleAllowed = allowedRoleIDs.length === 0 || this.messageObj.member.roles.cache.some((role) => allowedRoleIDs.includes(role.id));
        const channelAllowed = allowedChannelIDs.length === 0 || allowedChannelIDs.includes(this.messageObj.channel.id.toString());
        const categoryAllowed = allowedCategoryIDs.length === 0 || allowedCategoryIDs.includes(this.messageObj.channel.parentID.toString());

        return roleAllowed && (channelAllowed || categoryAllowed);
    }

    textReplacements(response, keyword, commandText) {
        const properties = response.embed ? ['embed.description', 'embed.footer', 'embed.title', 'content'] : ['content'];

        properties.forEach((property) => {
            if (response[property]) {
                response[property] = response[property]
                    .replace('%message%', this.messageObj.content)
                    .replace('%channel%', this.messageObj.channel.toString())
                    .replace('%keyword%', keyword)
                    .replace('%userMention%', this.messageObj.member.toString())
                    .replace('%commandText%', commandText);
            }
        });
    }

    handleResponses(rawResponses, keyword, isAllowedToUse) {
        let responses = getOptParam(rawResponses, {});
        const commandText = this.messageObj.content.startsWith(this.config.commandPrefix) ? this.message.replace(new RegExp(`^${this.config.commandPrefix}[a-z]+`), '').trim() : ''; // REGEXP!
        const sendResponses = (responses, sendAsPM, type) => {
            if (!Array.isArray(responses)) responses = [responses];
            responses.forEach((response) => this.sendResponse(response, keyword, sendAsPM, type, commandText));
        };

        if (typeof responses === 'function') responses = responses(this.messageObj, keyword, commandText);

        if (responses.normal && isAllowedToUse) sendResponses(responses.normal, responses.normalIsPM, 'normal');
        if (responses.error && !isAllowedToUse) sendResponses(responses.error, responses.errorIsPM, 'error');
        if (responses.admin && isAllowedToUse) sendResponses(responses.admin, false, 'admin');
    }

    sendResponse(response, keyword, sendAsPM, type, commandText) {
        sendAsPM = getOptParam(sendAsPM, false);
        this.textReplacements(response, keyword, commandText);

        const target = type === 'admin' ? this.adminChannel : this.messageObj[sendAsPM ? 'author' : 'channel'];
        const logMessage = `Sent message ${type === 'admin' ? 'into admin channel' : sendAsPM ? 'as PM' : 'into channel'}: "${response.content || 'embed'}"`;

        target.send(response).then(log(logMessage, 2)).catch(console.error);
    }

    sendEmoji(keyword, reactions) {
        reactions.forEach((reaction) => {
            const reactionEmoji = this.messageObj.guild.emojis.cache.find((emoji) => `:${emoji.name}:` === reaction) || reaction;

            this.messageObj
                .react(reactionEmoji)
                .then(log(`Reacted with "${reaction}".`, 2))
                .catch(console.error);
        });
    }

    handle() {
        if (this.messageObj.author.bot) return;

        this.config.rules.some((map) => {
            const wordBounds = getOptParam(map.wordBounds, true);
            const startsWith = getOptParam(map.startsWith, false);
            const hasMatched = map.keywords.some((keyword) => {
                if (!this.doesKeywordMatch(keyword, wordBounds, startsWith)) return false;

                const isAllowedToUse = this.userHasRights(map);
                const channelName = this.messageObj.channel.name;
                const userTag = this.messageObj.member.user.tag;

                log(`Found keyword "${keyword}" in channel "${channelName}" by user "${userTag}"${!isAllowedToUse ? ' but user is not allowed to use it' : ''}.`, 1)();

                if (map.responses) this.handleResponses(map.responses, keyword, isAllowedToUse);
                if (isAllowedToUse) {
                    if (map.reactions) this.sendEmoji(keyword, map.reactions);
                    if (getOptParam(map.deleteMessage, false)) this.messageObj.delete().then(log('Deleted user message.', 2)).catch(console.error);
                }

                return true;
            });

            return getOptParam(map.dontStopChecking, false) ? false : hasMatched;
        });
    }
}

module.exports = MessageHandler;
