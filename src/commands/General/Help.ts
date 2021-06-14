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
            let text = `🗒️ *${this.client.config.name} Command List* 🗒️\n\n`
            const sortedKeys = Object.keys(categories).sort()
            for (const key of sortedKeys)
                text += `🌟 *${this.client.util.capitalize(key)} 🌟*\n\`\`\`${categories[key]
                    .map((command) => command.config?.command)
                    .join(',')}\`\`\`\n\n`
            return void M.reply(
                `${text}💠 *Note: Use ${this.client.config.prefix}help <command_name> to view the command info*`
            )
        }
        const command = this.handler.commands.get(parsedArgs.joined.toLowerCase())
        M.reply(
            !command
                ? 'No Command Found with ""'
                : `🍁 *Command:* ${command.config?.command}*\n🍀 *Category:* ${
                      command.config?.category || ''
                  }\n🌀 *Group Only:* ${!command.config.dm || 'true'}\n🎀 *Usage:* ${
                      command.config?.usage || ''
                  }\n\n*Description:* ${command.config?.description || ''}`
        )
    }

    config = {
        command: 'help',
        description: 'Displays the help menu or shows the info of the command provided',
        category: 'general',
        usage: `${this.client.config.prefix}help (command_name)`,
        dm: true
    }
}
