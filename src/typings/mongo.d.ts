import { Document } from 'mongoose'
import { IGroup, IUser } from './'

export interface IGroupModel extends IGroup, Document {}

export interface IUserModel extends IUser, Document {}

export interface ISessionModel extends Document {
    ID: string
    session: ISession
}