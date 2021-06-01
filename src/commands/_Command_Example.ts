import MessageHandler from '../Handlers/MessageHandler'
import BaseCommand from '../lib/BaseCommand'
import WAClient from '../lib/WAClient'
import { ISimplifiedMessage } from '../typings'

/**
 * Command Class
 */
export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler)
    }

    //eslint-disable-next-line
    run = async (M: ISimplifiedMessage): Promise<void> => {
    }

    config = {
        command: 'command_goes_here',
        description: 'command description',
        category: 'category',
        usage: `${this.client.config.prefix}command`
    }
}
