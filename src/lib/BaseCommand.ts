import { ICommand, ISimplifiedMessage } from '../typings'
import WAClient from './WAClient'

export default class BaseCommand implements ICommand {
    title = ''
    constructor(public client: WAClient) {}

    run = (M: ISimplifiedMessage): Promise<void | never> | void | never => {
        throw new Error('run method should be defined')
    }
}
