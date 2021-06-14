import { MessageType, Mimetype } from '@adiwajshing/baileys'
import { Sticker } from 'wa-sticker-formatter'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler)
    }

    run = async (M: ISimplifiedMessage, parsedArgs: IParsedArgs): Promise<void> => {
        let buffer;
        if (M.quoted?.message?.message?.imageMessage || M.quoted?.message?.message?.videoMessage) buffer = await this.client.downloadMediaMessage(M.quoted.message)
        if (M.WAMessage.message?.imageMessage || M.WAMessage.message?.videoMessage) buffer = await this.client.downloadMediaMessage(M.WAMessage)
        if (!buffer) return void M.reply(`You didn't provide any Image/Video to convert`)
        parsedArgs.flags.forEach((flag) => parsedArgs.joined = parsedArgs.joined.replace(flag, ''))
        const pack = parsedArgs.joined.split('|')
        const sticker = new Sticker(buffer,  {
            pack: pack[0],
            author: pack[1],
            crop: parsedArgs.flags.includes('--strech')
        })
        await sticker.build()
        await M.reply(await sticker.get(), MessageType.sticker, Mimetype.webp)
    }

    config = {
        command: 'sticker',
        description: 'Converts images/videos into stickers',
        category: 'utils',
        usage: `${this.client.config.prefix}sticker [(as caption | tag)[video | image]]`,
        dm: true
    }
}
