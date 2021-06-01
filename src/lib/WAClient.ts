import { MessageType, Mimetype, WAConnection as Base, WAMessage } from '@adiwajshing/baileys'
import chalk from 'chalk'
import { existsSync, readdirSync, statSync } from 'fs'
import moment from 'moment'
import { join } from 'path'
import { IConfig, IExtendedGroupMetadata, ISimplifiedMessage } from '../typings'

export default class WAClient extends Base {
    constructor(public config: IConfig) {
        super()
        this.logger.level = 'fatal'
        const sessionFile = `./SESSION_${this.config.session}.json`

        existsSync(sessionFile) && this.loadAuthInfo(sessionFile)

        this.on('chat-update', (update) => {
            if (!update.messages) return void null
            const messages = update.messages.all()
            if (!messages[0]) return void null
            this.emitNewMessage(this.simplifyMessage(messages[0]))
        })

        this.on('CB:action,,call', async (json) => this.emit('call', json[2][0][1].from))
    }

    emitNewMessage = async (M: Promise<ISimplifiedMessage>): Promise<void> => void this.emit('new-message', await M)

    supportedMediaMessages = [MessageType.image, MessageType.video]

    simplifyMessage = async (M: WAMessage): Promise<ISimplifiedMessage> => {
        const jid = M.key.remoteJid || ''
        const chat = jid.endsWith('g.us') ? 'group' : 'dm'
        const type = (Object.keys(M.message || {})[0] || '') as MessageType
        const user = chat === 'group' ? M.participant : jid
        const info = this.getContact(user)
        const groupMetadata: IExtendedGroupMetadata | null = chat === 'group' ? await this.groupMetadata(jid) : null
        if (groupMetadata) groupMetadata.admins = groupMetadata.participants.map((user) => user.jid)
        const sender = {
            jid: user,
            username: info.notify || info.vname || info.name || 'User',
            isAdmin: groupMetadata && groupMetadata.admins ? groupMetadata.admins.includes(user) : false
        }
        const content: string | null =
            type === MessageType.text && M.message?.conversation
                ? M.message.conversation
                : this.supportedMediaMessages.includes(type)
                ? this.supportedMediaMessages
                      .map((type) => M.message?.[type as MessageType.image | MessageType.video]?.caption)
                      .filter((caption) => caption)[0] || ''
                : null
        return {
            type,
            content,
            chat,
            sender,
            args: content?.split(' ') || [],
            reply: async (
                content: string | Buffer,
                type?: MessageType,
                mime?: Mimetype,
                mention?: string[],
                caption?: string
            ) =>
                await this.sendMessage(jid, content, type || MessageType.text, {
                    quoted: M,
                    caption: caption,
                    mimetype: mime,
                    contextInfo: { mentionedJid: mention }
                }),
            mentioned: this.getMentionedUsers(M),
            from: jid,
            groupMetadata,
            WAMessage: M
        }
    }

    log = (text: string, error?: boolean): void => {
        console.log(
            chalk[error ? 'red' : 'green']('[VOID]'),
            chalk.blue(moment(Date.now() * 1000).format('DD/MM HH:mm:ss')),
            chalk.yellowBright(text)
        )
    }

    getMentionedUsers = (M: WAMessage): string[] => {
        const types = Object.values(MessageType)
        const maps = types.map((type) =>
            M?.message?.[type as MessageType.extendedText]?.contextInfo?.mentionedJid ||
            M?.message?.[type as MessageType.extendedText]?.contextInfo?.participant
                ? [M.message[type as MessageType.extendedText]?.contextInfo?.participant]
                : []
        )
        return maps.filter((map) => map.every((item) => item))[0] as string[]
    }

    //eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getContact = (jid: string) => {
        return this.contacts[jid] || {}
    }

    util = {
        readdirRecursive: (directory: string): string[] => {
            const results: string[] = []

            const read = (path: string): void => {
                const files = readdirSync(path)

                for (const file of files) {
                    const dir = join(path, file)
                    if (statSync(dir).isDirectory()) read(dir)
                    else results.push(dir)
                }
            }
            read(directory)
            return results
        },

        capitalize: (text: string): string => `${text.charAt(0).toUpperCase()}${text.slice(1)}`
    }
}
