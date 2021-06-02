import { WAGroupMetadata } from '@adiwajshing/baileys'

export * from './message'
export * from './command'

export interface IConfig {
    name: string
    mods?: string[]
    prefix: string
    session: string
    mods: string[]
}

export interface IParsedArgs {
    args: string[]
    flags: string[]
    joined: string
}

export interface IExtendedGroupMetadata extends WAGroupMetadata {
    admins?: string[]
}
