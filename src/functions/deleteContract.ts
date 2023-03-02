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
      event: APIGatewayEvent,
      _context: Context
    ): Promise<APIGatewayProxyResult> => {
      const contractId: string = event.pathParameters.contractId;
      try {
        const contracts = await contractService.contractService.deleteContract(contractId);
  
        return formatJSONResponse(200, contracts);
      } catch (err) {
        return formatJSONResponse(400, err);
      }
    }
  );