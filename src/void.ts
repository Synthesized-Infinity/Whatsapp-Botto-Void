import { existsSync, writeFileSync } from 'fs'
import { connected } from 'process'
import MessageHandler from './Handlers/MessageHandler'
import WAClient from './lib/WAClient'
import { ISimplifiedMessage } from './typings'

const client = new WAClient({
    name: process.env.NAME || 'Void',
    session: process.env.SESSION || 'Void',
    prefix: process.env.PREFIX || '!'
})

client.connect().then(async () => {
    client.log('CONNECTED')
    writeFileSync(`./SESSION_${client.config.session}.json`, JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
    const messageHandler = new MessageHandler(client)
    messageHandler.loadCommands()
    client.on('new-message', messageHandler.handleMessage)
})
