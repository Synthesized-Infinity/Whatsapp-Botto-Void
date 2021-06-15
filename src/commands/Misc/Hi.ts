import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler)
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        return void (await M.reply(`Hi ${M.sender.username}!`))
    }

    config = {
        command: 'hi',
        description: 'Well....',
        category: 'misc',
        usage: `${this.client.config.prefix}hi`,
        dm: true
    }
}
