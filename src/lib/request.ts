import axios from 'axios'

const request = async <T extends 'buffer' | 'json', R>(
    url: string,
    type: T
): Promise<
    R extends { [k: string]: string | number | boolean }
        ? R
        : T extends 'json'
        ? { [key: string]: string | boolean | number }
        : Buffer
> => {
    return (await axios.get(url, type === 'buffer' ? { responseType: 'arraybuffer' } : undefined)).data
}

export default request
