import { ServerResponse } from "http"
import { IncomingMessage } from "http"
import { logger } from "../logger"

export type Route = {
  handle: (req: WebRequest, resp: ServerResponse) => void,
  shouldHandle: (req: WebRequest) => boolean
}

export type WebRequestMethod = 'GET' | 'POST'

export class WebRequest {
  readonly method: WebRequestMethod
  readonly url: string
  readonly requestBody: any

  static from(request: IncomingMessage, receivedData: string): WebRequest {
    const requestBody = this.parseRequestBody(receivedData)
    const requestMethod = this.parseRequestMethod(request.method)
    return new WebRequest(requestMethod, request.url!, requestBody)
  }

  private constructor(method: WebRequestMethod, url: string, requestBody: any) {
    this.method = method
    this.url = url
    this.requestBody = requestBody
  }

  private static parseRequestBody(receivedData: string): any {
    if (!receivedData || receivedData == '')
      return undefined

    try {
      return JSON.parse(receivedData)
    } catch (error) {
      logger.error('Invalid not-empty request body', receivedData)
      return undefined
    }
  }

  static parseRequestMethod(method: string | undefined): WebRequestMethod {
    if(method === 'GET' || method === 'POST')
      return method

    throw new Error("Cannot recongnize method: " + method)
  }
}
