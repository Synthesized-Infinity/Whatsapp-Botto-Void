import { MessageType, Mimetype, WAConnection as Base, WAMessage } from '@adiwajshing/baileys'
import chalk from 'chalk'
import moment from 'moment'
import { IConfig, ISimplifiedMessage } from '../typings'

export class WAClient extends Base {

    constructor(public config: IConfig) {
        super()

        this.on('chat-update', (update) => {
            if (!update.messages) return void null
            const messages = update.messages.all()
            if (!messages[0]) return void null 
            this.emit('new-message', messages[0])
        })

        this.on('CB:action,,call', async (json) => this.emit('call', json[2][0][1].from))
    }

    supportedMediaMessages = [
        MessageType.image,
        MessageType.video
    ]
    simplifyMessage = (M: WAMessage): ISimplifiedMessage => {
        const jid = M.key.remoteJid || ''
        const type = (Object.keys(M.message || {})[0] || '') as MessageType
        const content: string | null = ((type === MessageType.text) && M.message?.conversation) ? M.message.conversation : (this.supportedMediaMessages.includes(type)) ? this.supportedMediaMessages.map((type) => M.message?.[(type as MessageType.image | MessageType.video)]?.caption).filter((caption) => caption)[0] || '': null
        return {
            type,
            content,
            chat: (jid.endsWith('g.us')) ? 'group' : 'dm',
            reply: async (content: string | Buffer, type?: MessageType, caption?: string, mime?: Mimetype) => await this.sendMessage(jid, content, type || MessageType.text, { quoted: M, caption: caption }),
            mentioned: this.getMentionedUsers(M),
            from: jid,
            WAMessage: M
        }
   }

    log = (text: string, error?: boolean): void => {
        console.log(
            chalk[(error) ? 'green' : 'red']('[VOID]'),
            chalk.blue(moment(Date.now() * 1000).format('DD/MM HH:mm:ss')),
            chalk.yellow(text)
        )
    }

    getMentionedUsers = (M: WAMessage) => {
        const types = Object.values(MessageType)
        const maps = types.map((type) => M?.message?.[type as MessageType.extendedText]?.contextInfo?.mentionedJid || (M?.message?.[type as MessageType.extendedText]?.contextInfo?.participant) ? [M.message[type as MessageType.extendedText]?.contextInfo?.participant] : [])
        return maps.filter((map) => map.every((item) => item))[0] as string[]
    }

}