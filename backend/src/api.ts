import http, { IncomingMessage, ServerResponse } from 'http'
import { logger } from './logger'
import getFlashEnrollmentsRoute from './routes/getFlashEnrollments'
import getMatchesCalendarRoute from './routes/getMatchesCalendar'
import { Route, WebRequest } from './routes/types'

const routes: Route[] = [
  getFlashEnrollmentsRoute,
  getMatchesCalendarRoute
]

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

async function handle(webRequest: WebRequest, response: ServerResponse): Promise<void> {
  try {
    const route = routes.find((route) => route.shouldHandle(webRequest))
    if (!route) {
      logger.warn('Route not found!')
      textResponse(404, 'Route not found!', response)
      return
    }

    await route.handle(webRequest, response);
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
