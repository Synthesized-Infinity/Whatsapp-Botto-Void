import BaseCommand from '../lib/BaseCommand'
import WAClient from '../lib/WAClient'
import { ISimplifiedMessage } from '../typings'

export default class Hi extends BaseCommand {
    constructor(client: WAClient) {
        super(client)
    }

    run = async (M: ISimplifiedMessage) => {
        return void (await M.reply(`Hi ${M.sender.username}!`))
    }

    title = 'hi'
    description = 'Well'
}
