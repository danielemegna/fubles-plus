import http, { IncomingMessage, ServerResponse } from 'http'
import getFlashEnrollmentsRoute from './routes/getFlashEnrollments'
import getMatchesCalendar from './routes/getMatchesCalendar'
import { WebRequest } from './routes/types'
import { logger } from './logger'

export default function start() {

  logger.info('Starting the server at localhost:4321 ...')
  http.createServer((request: IncomingMessage, response: ServerResponse) => {
    logger.debug(`Received ${request.method} on ${request.url}`)
    let receivedData = ''
    request.on('data', chunk => receivedData += chunk)
    request.on('end', () => {
      const webRequest: WebRequest = WebRequest.from(request, receivedData)
      return handle(webRequest, response);
    })
  }).listen(4321)

}

function handle(webRequest: WebRequest, response: ServerResponse) {
  try {
    if (getFlashEnrollmentsRoute.shouldHandle(webRequest)) {
      getFlashEnrollmentsRoute.handle(webRequest, response);
      return
    }

    if (getMatchesCalendar.shouldHandle(webRequest)) {
      getMatchesCalendar.handle(webRequest, response);
      return
    }

    logger.warn('Route not found!')
    textResponse(404, 'Route not found!', response)
  } catch (error) {
    logger.error('Error during request handling!', error)
    emptyResponse(500, response)
  }
}

export function textResponse(statusCode: number, text: string, response: ServerResponse) {
  response.writeHead(statusCode, { 'Content-Type': 'text/plain', ...corsHeaders() })
  response.end(text)
}

export function jsonResponseWith(statusCode: number, body: object, response: ServerResponse) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json', ...corsHeaders() })
  response.end(JSON.stringify(body))
}

export function emptyResponse(statusCode: number, response: ServerResponse) {
  response.writeHead(statusCode, corsHeaders())
  response.end()
}

export function icsResponse(icsFileContent: string, response: ServerResponse) {
  response.writeHead(200, {
    'Content-Type': 'text/calendar; charset=utf-8',
    'Content-Disposition': 'attachment; filename="calendar.ics"',
    ...corsHeaders()
  })
  response.end(icsFileContent)
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
  }
}
