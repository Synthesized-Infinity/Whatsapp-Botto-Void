import MessageHandler from '../Handlers/MessageHandler'
import BaseCommand from '../lib/BaseCommand'
import WAClient from '../lib/WAClient'
import { ISimplifiedMessage } from '../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler)
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!M.mentioned.length) return void M.reply(`Please tag the users you want to ${this.config.command}`)
        M.mentioned.forEach(async (user) => {
            const usr = this.client.contacts[user]
            const username = usr.notify || usr.vname || usr.name || user.split('@')[0]
            if (M.groupMetadata?.admins?.includes(user)) M.reply(`Skipping ${username} as they're already an admin`)
            else {
                await this.client.groupMakeAdmin(M.from, [user])
                M.reply(`Sucessfully Promoted ${username}`)
            }
        })
    }

    config = {
        adminonly: true,
        command: 'promote',
        description: 'promotes the mentioned users',
        category: 'admin',
        usage: `${this.client.config.prefix}admins`
    }
}
