import chalk from 'chalk'
import { join } from 'path'
import BaseCommand from '../lib/BaseCommand'
import WAClient from '../lib/WAClient'
import { ICommand, IParsedArgs, ISimplifiedMessage } from '../typings'

export default class MessageHandler {
    commands = new Map<string, ICommand>()

    constructor(public client: WAClient) {}

    handleMessage = async (M: ISimplifiedMessage): Promise<void> => {
        if (M.WAMessage.key.fromMe || M.from.includes('status')) return void null
        if (M.chat === 'dm' || !M.groupMetadata) return void null
        const { args, groupMetadata, sender } = M
        if (!args[0] || !args[0].startsWith(this.client.config.prefix))
            return void this.client.log(
                `${chalk.blueBright('MSG')} from ${chalk.green(sender.username)} in ${chalk.cyanBright(
                    groupMetadata.subject
                )}`
            )
        const cmd = args[0].slice(this.client.config.prefix.length).toLowerCase()
        const command = this.commands.get(cmd)
        this.client.log(
            `${chalk.green('CMD')} ${chalk.yellow(`${args[0]}[${args.length - 1}]`)} from ${chalk.green(
                sender.username
            )} in ${chalk.cyanBright(groupMetadata.subject)}`
        )
        if (!command) return void M.reply('No Command Found! Try using one from the help list.')
        if (command.config?.adminonly && !M.sender.isAdmin)
            return void M.reply(`Only admins are allowed to use this command`)
        try {
            return void (await command.run(M, this.parseArgs(args)))
        } catch (err) {
            this.client.log(err.message, true)
        }
    }

    loadCommands = (): void => {
        this.client.log('Loading Commands...')
        const path = join(__dirname, '..', 'commands')
        const files = this.client.util.readdirRecursive(path)
        files.map((file) => {
            const filename = file.split('/')
            if (!filename[filename.length - 1].startsWith('_')) {
                //eslint-disable-next-line @typescript-eslint/no-var-requires
                const command: BaseCommand = new (require(file).default)(this.client, this)
                this.commands.set(command.config.command, command)
                this.client.log(`Loaded: ${chalk.green(command.config.command)} from ${chalk.green(file)}`)
                return command
            }
        })
        this.client.log(`Successfully Loaded ${chalk.greenBright(this.commands.size)} Commands`)
    }

    parseArgs = (args: string[]): IParsedArgs => {
        const slicedArgs = args.slice(1)
        return {
            args: slicedArgs,
            flags: slicedArgs.filter((arg) => arg.startsWith('--')),
            joined: slicedArgs.join(' ').trim()
        }
    }
}
