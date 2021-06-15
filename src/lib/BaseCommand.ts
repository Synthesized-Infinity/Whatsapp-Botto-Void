import MessageHandler from '../Handlers/MessageHandler'
import { ICommand, IParsedArgs, ISimplifiedMessage } from '../typings'
import WAClient from './WAClient'

export default class BaseCommand implements ICommand {
    constructor(public client: WAClient, public handler: MessageHandler) {}

    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    run = (M: ISimplifiedMessage, parsedArgs: IParsedArgs): Promise<void | never> | void | never => {
        throw new Error('run method should be defined')
    }

    config: ICommand['config'] = {
        command: 'base',
        description: 'base',
        category: 'none',
        usage: 'none',
        dm: false,
        baseXp: 0
    }
}
