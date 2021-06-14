import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ICommand, IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler)
    }

    run = async (M: ISimplifiedMessage, parsedArgs: IParsedArgs): Promise<void> => {
        if (!parsedArgs.joined) {
            const commands = this.handler.commands.keys()
            const categories: { [key: string]: ICommand[] } = {}
            for (const command of commands) {
                const info = this.handler.commands.get(command)
                if (!command) continue
                if (!info?.config?.category || info.config.category === 'dev') continue
                if (Object.keys(categories).includes(info.config.category)) categories[info.config.category].push(info)
                else {
                    categories[info.config.category] = []
                    categories[info.config.category].push(info)
                }
            }
            let text = `🎫 *${this.client.config.name} Command List* 🎫\n\n`
            const sortedKeys = Object.keys(categories).sort()
            for (const key of sortedKeys)
                text += `${this.emojis[sortedKeys.indexOf(key)]} *${this.client.util.capitalize(
                    key
                )}*\n❐ \`\`\`${categories[key].map((command) => command.config?.command).join(',')}\`\`\`\n\n`
            return void M.reply(
                `${text} 🗃️ *Note: Use ${this.client.config.prefix}help <command_name> to view the command info*`
            )
        }
        const key = parsedArgs.joined.toLowerCase()
        const command = this.handler.commands.get(key)
        M.reply(
            !command
                ? `No Command Found | "${key}"`
<<<<<<< HEAD
                : `🍁 *Command:* ${command.config?.command}\n🀄 *Category:* ${
=======
                : `🍁 *Command:* ${command.config?.command}*\n🍀 *Category:* ${
>>>>>>> 4f92a4af2bc714b6e65db1b1a171e24490cdf017
                      command.config?.category || ''
                  }\n🃏 *Group Only:* ${!command.config.dm || 'true'}\n🎀 *Usage:* ${
                      command.config?.usage || ''
                  }\n\n🔖 *Description:* ${command.config?.description || ''}`
        )
    }

    config = {
        command: 'help',
        description: 'Displays the help menu or shows the info of the command provided',
        category: 'general',
        usage: `${this.client.config.prefix}help (command_name)`,
        dm: true
    }

    emojis = ['👑', '🎴', '🔮', '🌀', '⚙️', '🍀']
}
