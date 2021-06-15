import MessageHandler from '../Handlers/MessageHandler'
import { WAClient } from '../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from './'

export interface ICommand {
    client?: WAClient
    handler?: MessageHandler
    run(M: ISimplifiedMessage, parsedArgs: IParsedArgs): Promise<void | never> | void | never
    config: {
        adminonly?: boolean
        description?: string
        command: string
        id?: string
        category?: string
        usage?: string
        dm?: boolean
        baseXp?: number
    }
}
