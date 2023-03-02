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
      _event: APIGatewayEvent,
      _context: Context
    ): Promise<APIGatewayProxyResult> => {
      try {
        const users = await userService.userService.getAllUsers();
  
        return formatJSONResponse(200, users);
      } catch (err) {
        return formatJSONResponse(400, err);
      }
    }
  );