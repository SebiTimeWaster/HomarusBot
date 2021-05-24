# How to define rules

In general it is a good idea to give complicated rules their own file and group multiple simple responses into one file.

## File name

A rule or an Array of rules are defined in a file which name must start with the event name it corresponds to ("message" or "messageDelete" at the moment), then the the name of the rule and it must be a ".js" file type:

```bash
message.daily-quote.js
```

The rules name (In the example above 'daily-quote') must be added to the rules Array in the general config file (config.js), otherwise it will not be loaded.

## File structure

A rule file must contain one or more rules in the following format:

```js
export default [{ ruleConfiguration }, { ruleConfiguration }];
```

or

```js
export default { ruleConfiguration };
```

## Rule configuration

The rule configuration Object literal can contain the following properties (All properties except "keywords" are optional, see [JSDoc](https://jsdoc.app/) for a format definiton):

```jsdoc
/**
 * @property {string[]}          keywords                 - Array of keywords (RegExp strings) that is compared with every event action that is emitted in channels the bot has access to
 *                                                          Always use lowercase characters, all messages are converted to lowercase before comparing
 *                                                          All control characters that are not meant to be part of a RegExp need to be escaped: "bla?" -> "bla\\?", "!bla" -> "\\!bla"
 * @property {boolean}           [wordBounds=true]        - If the keyword matching should respect (RegExp) word bounds or not
 * @property {boolean}           [startsWith=false]       - If the keyword should only match when on the beginning of the message
 * @property {string[]}          [allowedRoleIDs]         - If specified the user can only use this command when he has one of the specified roles
 * @property {string[]}          [allowedChannelIDs]      - If specified this rule can only be executed in the specified channels
 * @property {string[]}          [allowedCategoryIDs]     - If specified this rule can only be executed in the specified gategories of channels
 * @property {boolean}           [deleteMessage=false]    - Deletes the user message that matched
 * @property {(object|function)} [responses]              - An Object literal or a function that returns an Object literal as defined under "responses Object definition" below
 *                                                          If "responses" is a function see the "responses function definition" below
 * @property {string[]}          [reactions]              - The reactions (Emojis) to add to the users message:
 *                                                          For server emojis: ':spacex:'
 *                                                          For standard emojis the unicode emoji itself: '😄'
 *                                                          This behaviour differs from emojis added to responses!
 * @property {boolean}           [dontStopChecking=false] - Normally after the first rule match further rules are not checked, this overrides this behaviour if this rule matches
 */
```

"responses" function definition:

```jsdoc
/**
 * @param   {object} message     - The matched message Object https://discord.js.org/#/docs/main/stable/class/Message
 * @param   {string} keyword     - The keyword that matched
 * @param   {string} commandText - The text message part after the matched command (if applies, or empty string)
 * @returns {object}             - An Object literal as defined under "Responses Object definition" below
 */
```

"responses" Object definition:

```jsdoc
/**
 * @property {(object|object[])} [normal]           - The response the bot should answer with, an Object literal or an Array of Object literals containing a message
 *                                                    as described here: https://discord.js.org/#/docs/main/stable/typedef/MessageOptions
 *                                                    Most text fields support the following placeholders:
 *                                                      The keyword that matched: '%keyword%',
 *                                                      The channel it matched in: '%channel%'
 *                                                      The complete user message: '%message%'
 *                                                      The mention of the user that wrote the matched message: '%userMention%'
 *                                                      The message part after the matched command (If applies): '%commandText%'
 *                                                    As well as all discord identifiers:
 *                                                      For role mentions: '<@&83378240669788022992>'
 *                                                      For channel mentions: '<#772336557824879963796>'
 *                                                      For server emojis: '<a:a_hype:790297808846217332394>'
 *                                                      For standard emojis the name in colons: ':smile:'
 *                                                      or the unicode character: '😄'
 *                                                      This behaviour differs from the emojis added as reactions!
 * @property {(object|object[])} [error]            - Sends a message if the user is not allowed to use the rule due to channel or role restrictions, works exactly the same as the "normal" property
 * @property {(object|object[])} [admin]            - Sends a message to the admin channel as specified in "adminChannelID" in config.js, works exactly the same as the "normal" property
 * @property {boolean}           [normalIsPM=false] - If the normal message should be sent as a private message
 * @property {boolean}           [errorIsPM=false]  - If the error message should be sent as a private message
 */
```

Only one keyword match per rule and message is executed.

If a "command" is used as a keyword (E.g. "\\\\!stop" or "\\\\?stop" or something else that matches the "commandPrefix" config in config.js) it may be a good idea to set the "startsWith" property to true.

If you need an mention or emoji identifier to use in a response you can get them with one of these methods:

- If you have "Developer Options" on, right click the item and select "Copy ID"
- If you have not, Create a new message with the desired emoji/channel mention/role mention and before sending it add a backslash directly in front of it.

  After sending the message the corresponding unicode emoji or discord identifier appears as text in the channel.
