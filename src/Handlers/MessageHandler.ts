import { join } from 'path'
import BaseCommand from '../lib/BaseCommand'
import WAClient from '../lib/WAClient'
import { ICommand, ISimplifiedMessage } from '../typings'

export default class MessageHandler {
    commands = new Map<string, ICommand>()

    constructor(public client: WAClient) {}

    handleMessage = (M: ISimplifiedMessage) => {
        if (M.chat === 'dm' || !M.groupMetadata) return
        const { sender, groupMetadata, type, args, content, mentioned } = M
        const admins = groupMetadata.participants.map((user) => user.jid)
        if (!args[0] || !args[0].startsWith(this.client.config.prefix)) return
        const cmd = args[0].slice(1).toLowerCase()
        const command = this.commands.get(cmd)
        if (!command) return void M.reply('Well....')
        return void command.run(M)
    }

    loadCommands = () => {
        this.client.log('LOADING COMMANDS')
        const path = join(__dirname, '..', 'commands')
        const files = this.client.util.readdirRecursive(path)
        files.map((file) => {
            const command: BaseCommand = new (require(file).default)(this.client)
            this.commands.set(command.title, command)
            this.client.log(`Loaded: ${command.title}`)
            return command
        })
    }
}
