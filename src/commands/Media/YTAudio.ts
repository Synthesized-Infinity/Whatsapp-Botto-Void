import { MessageType, Mimetype } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import YT from '../../lib/YT'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler)
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined.trim()) return void M.reply('Please provide a Valid YT URL')
        const audio = new YT(joined, 'audio')
        if (!audio.validateURL()) return void M.reply(`Please provide a Valid YT URL`)
        const { videoDetails } = await audio.getInfo()
        M.reply(
            await audio.getThumbnail(),
            MessageType.image,
            Mimetype.jpeg,
            undefined,
            `🍥 *Title:* ${videoDetails.title}\n🕰️ *Duration:* ${videoDetails.lengthSeconds}\n🗒️ *Description:* ${videoDetails.description}`
        )
        M.reply(await audio.getBuffer(), MessageType.audio).catch(() => M.reply('An error occurred...'))
    }

    config = {
        command: 'yta',
        description: 'Downloads given YT Video and sends it as Audio',
        category: 'media',
        usage: `${this.client.config.prefix}ytv [URL]`,
        dm: true,
        baseXp: 20
    }
}
