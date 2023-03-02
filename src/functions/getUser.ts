import {
    APIGatewayEvent,
    Handler,
    Context,
    APIGatewayProxyResult,
  } from "aws-lambda";
  import middify from "../core/middify";
  import formatJSONResponse from "../core/formatJsonResponse";
  import userService from "../database/services";
  
  export const handler: Handler = middify(
    async (
      event: APIGatewayEvent,
      _context: Context
    ): Promise<APIGatewayProxyResult> => {
      const userId: string = event.pathParameters.userId;
      try {
        const user = await userService.userService.getUser(userId);
  
        return formatJSONResponse(200, user);
      } catch (err) {
        return formatJSONResponse(400, err);
      }
    }
  );