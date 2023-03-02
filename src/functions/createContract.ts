import {
  APIGatewayEvent,
  Handler,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import * as uuid from "uuid";
import middify from "../core/middify";
import formatJSONResponse from "../core/formatJsonResponse";
import contractService from "../database/services";
import CreateContract from "../dtos/createContractDto";
//import userService from "../database/services";

export const handler: Handler = middify(
  async (
    event: APIGatewayEvent & CreateContract,
    _context: Context
  ): Promise<APIGatewayProxyResult> => {
    const { title, description,userId,templateId } = event.body;

    try {


      // Check if the Authorization header is present
      const authorizationHeader = event.headers.Authorization;
      if (!authorizationHeader) {
        return formatJSONResponse(401, { message: "Unauthorized Header" });
      }

      // Check if the token is valid
      const token = authorizationHeader;
      //const passtoken = "3xxx1xxx4xxxx";
      //const headerValue = event.headers['Authorization'];
      //const user = await userService.userService.validateToken(token);
      
      if (token != userId) {
        return formatJSONResponse(401, { message: "Unauthorized" });
      }
      


      const contractId: string = uuid.v4();
      const contract = await contractService.contractService.createContract({
        
        contractId: contractId,
        title,
        description,
        userId,
        templateId,
        active: true,
        createdAt: new Date().toISOString(),
      });

      

      return formatJSONResponse(201, contract);
    } catch (err) {
      return formatJSONResponse(400, err);
    }
  }
);
