import { createWriteStream, readFile } from 'fs-extra'
import { tmpdir } from 'os'
import ytdl, { validateURL } from 'ytdl-core'

export default class YT {

    constructor(public url: string, public type: 'audio' | 'video') {
    }

    validateURL = (): boolean => validateURL(this.url)

    getInfo = async (): Promise<ytdl.videoInfo> => await ytdl.getInfo(this.url)

    getBuffer = async (filename = `${tmpdir()}/${Math.random().toString(36)}.${this.type === 'audio' ? 'mp3' : 'mp4'}`): Promise<Buffer> => {
        const stream = createWriteStream(filename)
        ytdl(this.url, { quality: (this.type === 'audio') ? 'highestaudio' : 'highest' }).pipe(stream)
        filename = await new Promise((resolve, reject) => {
            stream.on('finish', () => resolve(filename))
            stream.on('error', (err) => reject(err && console.log(err)))
        })
        return await readFile(filename)
    }
} 