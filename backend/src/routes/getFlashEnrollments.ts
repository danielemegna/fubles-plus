import { ServerResponse } from "http";
import WatchingMatch, { DesiredSide } from "../entities/WatchingMatch";
import { jsonResponseWith } from "../main";
import GetFlashEnrollmentsUsecase from "../usecase/GetFlashEnrollmentsUsecase";
import { Route, WebRequest } from "./types";

export default {
  shouldHandle: (request: WebRequest): boolean => {
    return request.method === 'GET' && request.url === '/users/55576/flash-enrollments';
  },
  handle: (request: WebRequest, response: ServerResponse): void => {
    const usecase = new GetFlashEnrollmentsUsecase();
    const result = usecase.run(55576);
    const responseBody = result.map(serialize);
    jsonResponseWith(200, responseBody, response);
  }
} as Route

function serialize(match: WatchingMatch): object {
  return {
    id: match.id,
    title: match.title,
    starting_at: serializeDate(match.starting_at),
    structure_name: match.structure_name,
    desired_side: serializeDesiredSide(match.desired_side)
  };
}

function serializeDesiredSide(desiredSide: DesiredSide): string {
  switch (desiredSide) {
    case DesiredSide.WHITE: return 'white'
    case DesiredSide.BLACK: return 'black'
    case DesiredSide.ANY: return 'any'
  }
}

function serializeDate(date: Date): string {
  return date.toISOString()
}
