import {
    APIGatewayEvent,
    Handler,
    Context,
    APIGatewayProxyResult,
  } from "aws-lambda";
  import middify from "../core/middify";
  import formatJSONResponse from "../core/formatJsonResponse";
  import contractService from "../database/services";
  
  export const handler: Handler = middify(
    async (
      _event: APIGatewayEvent,
      _context: Context
    ): Promise<APIGatewayProxyResult> => {
      try {
        const contracts = await contractService.contractService.getAllContracts();
  
        return formatJSONResponse(200, contracts);
      } catch (err) {
        return formatJSONResponse(400, err);
      }
    }
  );