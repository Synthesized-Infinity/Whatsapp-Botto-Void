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
        const video = new YT(joined, 'video')
        if (!video.validateURL()) return void M.reply(`Please provide a Valid YT URL`)
        const { videoDetails } = await video.getInfo()
        M.reply(
            await video.getThumbnail(),
            MessageType.image,
            Mimetype.jpeg,
            undefined,
            `🍥 *Title:* ${videoDetails.title}\n🕰️ *Duration:* ${videoDetails.lengthSeconds}\n🗒️ *Description:* ${videoDetails.description}`
        )
        M.reply(await video.getBuffer(), MessageType.video).catch(() => M.reply('An error occured...'))
    }

    config = {
        command: 'ytv',
        description: 'Downloads given YT Video',
        category: 'media',
        usage: `${this.client.config.prefix}ytv [URL]`,
        dm: true
    }
}
