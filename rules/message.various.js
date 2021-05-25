// various small response examples
module.exports = [
    { keywords: ['ping'], responses: { normal: { content: 'pong' } }, dontStopChecking: true },
    { keywords: ['ping pong'], responses: { normal: { content: 'what?' } } },
    { keywords: ['good night'], responses: { normal: { content: 'Sleep tight!' } } },
    { keywords: ['haha'], reactions: ['😄'] },
    { keywords: ['\\!avatar'], startsWith: true, responses: (message) => ({ normal: { content: message.author.displayAvatarURL() } }) },
    {
        keywords: ['keyword1', 'keyword2', 'keyword3'],
        responses: (message) => {
            const responses = ['Response1: :smile: %userMention%.', 'Response2: %keyword%? Awesome!', 'Response3: Live is beautiful.'];
            const randNum = Math.floor(Math.random() * responses.length);

            return { normal: { content: responses[randNum] } };
        },
    },
];
