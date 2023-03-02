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
        const contract = await contractService.contractService.getContract(contractId);
  
        return formatJSONResponse(200, contract);
      } catch (err) {
        return formatJSONResponse(400, err);
      }
    }
  );