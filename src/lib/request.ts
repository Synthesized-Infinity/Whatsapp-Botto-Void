import axios, { AxiosRequestConfig } from 'axios'

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

export const post = async <T>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    data: any,
    config?: AxiosRequestConfig
): Promise<T extends null ? { [key: string]: string | number | boolean } : T> => await axios.post(url, data, config)

export default request
