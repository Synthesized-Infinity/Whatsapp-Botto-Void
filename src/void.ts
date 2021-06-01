import { config } from 'dotenv'

config()

import { writeFileSync } from 'fs'
import MessageHandler from './Handlers/MessageHandler'
import WAClient from './lib/WAClient'
import Server from './lib/Server'

const client = new WAClient({
    name: process.env.NAME || 'Void',
    session: process.env.SESSION || 'Void',
    prefix: process.env.PREFIX || '!',
    mods: (process.env.MODS || '').split(',').map((number) => `${number}@s.whatsapp.net`)
})

new Server(Number(process.env.PORT) || 4000, client)

client.connect().then(async () => {
    client.log('CONNECTED')
    writeFileSync(`./${client.config.session}_session.json`, JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
    const messageHandler = new MessageHandler(client)
    messageHandler.loadCommands()
    client.on('new-message', messageHandler.handleMessage)
})
