import { readdirSync, statSync } from 'fs'
import { join } from 'path'

export default class {
    readdirRecursive = (directory: string): string[] => {
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
    }

    capitalize = (text: string): string => `${text.charAt(0).toUpperCase()}${text.slice(1)}`
}
