import { MessageType, Mimetype, WAMessage } from '@adiwajshing/baileys'
import { IExtendedGroupMetadata } from '.'

export interface ISimplifiedMessage {
    type: MessageType
    content: string | null
    args: string[]
    reply(
        content: string | Buffer,
        type?: MessageType,
        mime?: Mimetype,
        mention?: string[],
        caption?: string
    ): Promise<unknown>
    mentioned: string[]
    groupMetadata: IExtendedGroupMetadata | null
    chat: 'group' | 'dm'
    from: string
    sender: {
        jid: string
        username: string
        isAdmin: boolean
    }
    WAMessage: WAMessage
}
