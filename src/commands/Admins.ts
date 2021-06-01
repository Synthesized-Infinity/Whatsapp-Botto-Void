import MessageHandler from '../Handlers/MessageHandler'
import BaseCommand from '../lib/BaseCommand'
import WAClient from '../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler)
    }

    run = async (M: ISimplifiedMessage, parsedArgs: IParsedArgs): Promise<void> => {
        return void (await M.reply(
            `Hey @admins @${M.sender.jid.split('@')[0]} says ${parsedArgs.joined || 'nothing'}`,
            undefined,
            undefined,
            [...(M.groupMetadata?.admins || []), M.sender.jid]
        ))
    }

    config = {
        command: 'admins',
        description: 'Tags all Admins 🎖️',
        category: 'general',
        usage: `${this.client.config.prefix}admins`
    }
}
