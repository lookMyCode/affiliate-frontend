export interface IRes {
  statusCode: number
  statusText: string
  message?: string
  data?: any
}

export interface IEnvironment {
  production: boolean
  apiURL: string
}

export interface ILink {
  _id: string
  _autorId: string
  clicks: Date[]
  created: Date
  name: string
  originalLink: string
  shortLink: string
}