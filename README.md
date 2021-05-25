# HomarusBot

A reaction Bot for Discord Servers running on NodeJS that is configured (Programmed) in JavaScript, making it extremely flexible.

## General Info

This Bot is intended to:

- Be used by programmers and therefore has no configuration GUI or Website, all rules are defined in JavaScript code
- Be run on a Root Server hosted by the user itself

If you don't know what that means then this Bot is not for you.

I will give no support for code that is written by the user itself or concerns the underlying Discord.js project.

This Bot uses the framework Discord.js: [Discord.js](https://discord.js.org/#/)

[Discord.js Documentation](https://discord.js.org/#/docs/main/stable/general/welcome)

Only one Bot can run at a time with the same Bot Token, the start/stop scripts enforce that.

It is best to run the Bot on a Root Server for performance, but it can be run from a private computer.

### Where is what

| Where                                                     | What                                                  |
| --------------------------------------------------------- | ----------------------------------------------------- |
| config.js                                                 | The configuration of the Bot                          |
| [rules/README.md](rules/README.md)                        | Rules documentation, please read                      |
| start.&#65279;sh + stop.&#65279;sh + start-dev.&#65279;sh | Linux bash scripts to maintain the Server             |
| src/server.&#65279;js                                     | The underlying code that instantiates the Bot         |
| src/utils/                                                | General utils                                         |
| src/handlers                                              | The handlers for different types of Discord.js events |

See the [List of events](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate) for more information.

## Prerequisites

HomarusBot can be run on any OS, but Linux works best and the included shell scripts only work on Linux, with a bit of luck also on OSX.

On Linux or OSX "screen" needs to be installed to be able to use the included start/stop scripts.

NodeJS v14 or higher is needed.

## Installation

```bash
sudo apt install git screen nodejs npm # For distros that don't use apt see your distros help page.

cd  /home/directory/you/want/
git clone git@github.com:SebiTimeWaster/HomarusBot.git
cd HomarusBot
npm install
```

It is best to create a seperate user account to run the Bot on.

## Adding the Bot to a Discord Server

- [Setting up a bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).
- Open this url in your browser: `https://discordapp.com/oauth2/authorize?client_id=APPLICATION-ID&scope=bot&permissions=452672`

  "_APPLICATION-ID_" needs to be replaced with the Application ID that was generated under "Setting up a bot application".

- Configure your Bot in `config.js`, don't forget to add the Bot Token (Which is not the same as the Application ID!).

## Start / Stop

```bash
cd /home/directory/you/want/HomarusBot
./start.sh
./stop.sh
```

`start-dev.sh` runs the Bot directly in shell with a higher verbosity, only meant for development work.

`log/homarusbot.log` contains the logs from the running Bot or last run of the Bot (not used with `start-dev.sh`).

## Keeping dependencies up-to-date

```bash
cd /home/directory/you/want/HomarusBot
./stop.sh
npm update
./start.sh
```

## Including HomarusBot in your own GIT repository

It is possible to add HomarusBot to your GIT project without forking it, in a directory you see fit in your project run:

```bash
git submodule add git@github.com:SebiTimeWaster/HomarusBot.git
```

This adds HomarusBot as a subdirectory with its own .git configuration/namespace.

Now copy the `rules` directory and the `config.js` from the `HomarusBot` directory one directory above and start to change/use it, it is part of your repository.

You still need to run the `npm install` and other commands from the HomarusBot directory itself, but you can easily write scripts to do that for you.
