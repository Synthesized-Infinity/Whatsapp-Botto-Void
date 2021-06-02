import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler)
    }

    run = async (M: ISimplifiedMessage, parsedArgs: IParsedArgs): Promise<void> => {
        if (!this.client.config.mods?.includes(M.sender.jid)) return void null
        let out: string
        try {
            const output = eval(parsedArgs.joined) || 'Executed JS Sucessfully!'
            console.log(output)
            out = JSON.stringify(output)
        } catch (err) {
            out = err.message
        }
        return void (await M.reply(out))
    }

    config = {
        command: 'eval',
        description: 'Evaluates JavaScript ➕ ',
        category: 'dev',
        usage: `${this.client.config.prefix}eval`
    }
}
