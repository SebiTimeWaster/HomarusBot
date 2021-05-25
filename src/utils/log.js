const verbosity = process.env.VERBOSITY || 0;

const log = (message, level) => () => {
    const nf = '2-digit';
    const date = new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', year: 'numeric', month: nf, day: nf, hour: nf, minute: nf, second: nf }).format(new Date());

    if (level <= verbosity) console.log(level < 2 ? `[${date}]` : '    ', message.replace('\n', ''));
};

module.exports = log;
