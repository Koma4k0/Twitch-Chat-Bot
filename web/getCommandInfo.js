const fs = require('fs');
const path = require('path');

function getCommandInfo(directory) {
    try {
        const commandFiles = fs.readdirSync(directory).filter(file => file.endsWith('.js'));
        const commandsInfo = [];

        for (const file of commandFiles) {
            const command = require(path.join(directory, file));
            commandsInfo.push({ name: command.name, use: command.use, description: command.description });
        }

        return commandsInfo;
    } catch (error) {
        console.error('Error reading command files:', error);
        return [];
    }
}

module.exports = function getAllCommandsInfo() {
    const commandDirectories = [
        path.join(__dirname, '../commands'),
        path.join(__dirname, '../commands/Economy-Commands'),
        path.join(__dirname, '../commands/Fun-Commands'),
        path.join(__dirname, '../commands/Info-Commands'),
        path.join(__dirname, '../commands/Mod-Commands')
    ];

    const allCommandsInfo = [];

    for (const directory of commandDirectories) {
        const commandsInfo = getCommandInfo(directory);
        allCommandsInfo.push(...commandsInfo);
    }

    return allCommandsInfo;
};

