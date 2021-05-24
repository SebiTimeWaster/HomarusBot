// shows help to the user
export default {
    keywords: ['\\!help'],
    startsWith: true,
    responses: {
        normal: {
            embed: {
                title: 'The existing examples are:',
                fields: [
                    {
                        name: '"testword1", "testword2", "testword3"',
                        value: 'A forbidden word filter, deletes the users message, PMs the user and sends the users message to the admin channel',
                    },
                    { name: 'ping', value: 'Answers "pong"' },
                    { name: 'ping pong', value: 'Answers "what?"' },
                    { name: 'good night', value: 'Answers "Sleep tight!"' },
                    { name: 'haha', value: 'Adds an Emoji reaction to the users message' },
                    { name: '!avatar', value: 'Responds with the users avatar image' },
                    { name: '!help', value: 'Answers with this message' },
                ],
            },
        },
    },
};
