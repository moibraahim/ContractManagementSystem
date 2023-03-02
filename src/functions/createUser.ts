import {
    APIGatewayEvent,
    Handler,
    Context,
    APIGatewayProxyResult,
  } from "aws-lambda";
  import * as uuid from "uuid";
  import middify from "../core/middify";
  import formatJSONResponse from "../core/formatJsonResponse";
  import userService from "../database/services";
  import CreateUser from "../dtos/createUserDto";
  
  export const handler: Handler = middify(
    async (
      event: APIGatewayEvent & CreateUser,
      _context: Context
    ): Promise<APIGatewayProxyResult> => {
      const { username, password } = event.body;
  
      try {
        const userId: string = uuid.v4();
        const user = await userService.userService.createUser({
          userId: userId,
          username,
          password
        });
  
        return formatJSONResponse(201, user);
      } catch (err) {
        return formatJSONResponse(400, err);
      }
    }
  );