// various small response examples
export default [
    { keywords: ['ping'], responses: { normal: { content: 'pong' } }, dontStopChecking: true },
    { keywords: ['ping pong'], responses: { normal: { content: 'what?' } } },
    { keywords: ['good night'], responses: { normal: { content: 'Sleep tight!' } } },
    { keywords: ['haha'], reactions: ['😄'] },
    { keywords: ['\\!avatar'], startsWith: true, responses: (message) => ({ normal: { content: message.author.displayAvatarURL() } }) },
];
