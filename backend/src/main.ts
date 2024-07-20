import http, { IncomingMessage, ServerResponse } from 'http';
import WebRequest from './WebRequest';

console.log('Starting the server at localhost:4321 ...')

http.createServer((request: IncomingMessage, response: ServerResponse) => {
  console.log(`Received ${request.method} on ${request.url}`)
  let receivedData = ''
  request.on('data', chunk => receivedData += chunk)
  request.on('end', () => {
    const webRequest: WebRequest = WebRequest.from(request, receivedData)
    return handle(webRequest, response);
  })
}).listen(4321)

function handle(webRequest: WebRequest, response: ServerResponse) {
  try {
    console.log('Route not found!')
    textResponse(404, 'Route not found!', response)
  } catch (error) {
    console.log('Error during request handling!', error)
    emptyResponse(500, response)
  }
}

function textResponse(statusCode: number, text: string, response: ServerResponse) {
  response.writeHead(statusCode, { 'Content-Type': 'text/plain' })
  response.end(text)
}

function jsonResponseWith(statusCode: number, body: object, response: ServerResponse) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(body))
}

function emptyResponse(statusCode: number, response: ServerResponse) {
  response.writeHead(statusCode)
  response.end()
}
