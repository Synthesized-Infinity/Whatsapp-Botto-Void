import { config } from 'dotenv'

config()

import MessageHandler from './Handlers/MessageHandler'
import WAClient from './lib/WAClient'
import Server from './lib/Server'
import mongoose from 'mongoose'
import chalk from 'chalk'

if (!process.env.MONGO_URI) throw new Error('MONGO URL IS NOT PROVIDED')
const client = new WAClient({
    name: process.env.NAME || 'Void',
    session: process.env.SESSION || 'Void',
    prefix: process.env.PREFIX || '!',
    mods: (process.env.MODS || '').split(',').map((number) => `${number}@s.whatsapp.net`)
})

const messageHandler = new MessageHandler(client)
messageHandler.loadCommands()

const db = mongoose.connection

mongoose.connect(encodeURI(process.env.MONGO_URI), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
db.once('open', () => client.log(chalk.green('Connected to Database!')))

new Server(Number(process.env.PORT) || 4000, client)

const start = async () => {
    client.on('open', async () => {
        client.log(chalk.green('Connected to WhatsApp!'))
        await client.saveAuthinfo(client.config.session)
    })

    client.on('new-message', messageHandler.handleMessage)

    await client.connect()
}

client.getAuthInfo(client.config.session).then((session) => {
    if (session) client.loadAuthInfo(session)
    start()
})
