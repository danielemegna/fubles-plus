import fs from 'fs';
import { ServerResponse } from "http";
import { icsResponse } from "../api";
import { Route, WebRequest } from "./types";

export default {
  shouldHandle: (request: WebRequest): boolean => {
    return request.method === 'GET' && request.url === '/users/55576/calendar';
  },
  handle: (request: WebRequest, response: ServerResponse): void => {
    // generate it if not present?
    const icsFileContent = fs.readFileSync(`./calendars/55576.ics`, 'utf8')
    icsResponse(icsFileContent, response);
  }
} as Route
