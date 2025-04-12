import { FublesSDK } from 'fubles-plus-sdk';
import { ServerResponse } from "http";
import { icsResponse } from "../api";
import GenerateUserIcsCalendarUseCase from '../usecase/GenerateUserIcsCalendarUseCase';
import { Route, WebRequest } from "./types";

export default {
  shouldHandle: (request: WebRequest): boolean => {
    return request.method === 'GET' && request.url === '/users/55576/calendar';
  },
  handle: async (request: WebRequest, response: ServerResponse): Promise<void> => {
    const generateUserIcsCalendarUseCase = new GenerateUserIcsCalendarUseCase(
      new FublesSDK({
        id: 55576,
        bearerToken: process.env.FUBLES_BEARER_TOKEN!
      })
    )
    const icsFileContent = await generateUserIcsCalendarUseCase.run(55576)
    icsResponse(icsFileContent, response);
  }
} as Route
