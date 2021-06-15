import axios from 'axios'

const request = async <T extends 'buffer' | 'json'>(
    url: string,
    type: T
): Promise<T extends 'json' ? { [key: string]: string | boolean | number } : Buffer> => {
    return (await axios.get(url, type === 'buffer' ? { responseType: 'arraybuffer' } : undefined)).data
}

export default request
