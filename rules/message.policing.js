// police speech example
module.exports = {
    keywords: ['testword1', 'testword2', 'testword3'],
    wordBounds: false,
    deleteMessage: true,
    responses: {
        normal: { content: 'You said "%keyword%", which is not allowed.' },
        admin: { content: '%userMention% said "**_%keyword%_**" in %channel%\n**Complete message**: %message%' },
        normalIsPM: true,
    },
};
