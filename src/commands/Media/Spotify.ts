import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import Spotify from '../../lib/Spotify'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler)
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined.trim()) return void M.reply('Please provide a Valid YT URL')
        const track = new Spotify(joined)
        const info = await track.getInfo()
        if (info.error) return void M.reply(info.error)
        M.reply(
            await request(info?.cover_url as string, 'buffer'),
            MessageType.image,
            undefined,
            undefined,
            `🎧 *Title:* ${info.name || ''}\n🎤 *Artists:* ${(info.artists || []).join(',')}\n💽 *Album:* ${
                info.album_name
            }\n📆 *Release Date:* ${info.release_date || ''}`
        )
        M.reply(await track.getAudio(), MessageType.audio)
    }

    config = {
        command: 'spotify',
        description: 'Downloads given spotify track and sends it as Audio',
        category: 'media',
        usage: `${this.client.config.prefix}spotify [URL]`,
        dm: true,
        baseXp: 20
    }
}
