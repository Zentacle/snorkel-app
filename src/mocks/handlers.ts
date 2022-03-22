import { rest } from 'msw';
import config from 'react-native-config';

import type {
  RestRequest,
  PathParams,
  ResponseComposition,
  DefaultRequestBody,
  RestContext,
} from 'msw';

type Request = RestRequest<never, PathParams>;
type Response = ResponseComposition<DefaultRequestBody>;

const urlString = `${config.API_ENDPOINT}`;
export const handlers = [
  rest.get(
    `${urlString}/review/get`,
    (req: Request, res: Response, ctx: RestContext) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: [],
        }),
      );
    },
  ),
];
