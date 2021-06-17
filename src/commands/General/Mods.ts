import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler)
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!this.client.config.mods || !this.client.config.mods.length) return void M.reply('*[UNMODERATED]*')
        const filteredMap = this.client.config.mods.map((mod) => this.client.getContact(mod)).filter((user) => user)
        let text = ''
        filteredMap.forEach(
            (user, index) =>
                (text += `#${index + 1}\n🎫 *Username: ${
                    user.notify || user.vname || user.name || 'null'
                }*\n🍀 *Contact: https://wa.me/+${user?.jid?.split('@')[0]}*`)
        )
        return void M.reply(text)
    }

    config = {
        command: 'mods',
        description: "Displays the Moderators' contact info",
        category: 'general',
        usage: `${this.client.config.prefix}mods`
    }
}
