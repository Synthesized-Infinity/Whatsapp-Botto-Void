import { Schema, model } from 'mongoose'
import { ISessionModel } from '../../typings'

const SessionSchema = new Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    session: {
        type: Object,
        required: false,
        unique: true
    }
})

export const session = model<ISessionModel>('session', SessionSchema)
