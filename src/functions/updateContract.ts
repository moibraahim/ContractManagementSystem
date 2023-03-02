import {
    APIGatewayEvent,
    Handler,
    Context,
    APIGatewayProxyResult,
  } from "aws-lambda";
  import middify from "../core/middify";
  import formatJSONResponse from "../core/formatJsonResponse";
  import contractService from "../database/services";
  import UpdateContract from "../dtos/updateContractDto";
  
  export const handler: Handler = middify(
    async (
      event: APIGatewayEvent & UpdateContract,
      _context: Context
    ): Promise<APIGatewayProxyResult> => {
      const contractId: string = event.pathParameters.contractId;
      const { body } = event;
      try {
        const contracts = await contractService.contractService.updateContract(contractId, body);
  
        return formatJSONResponse(200, contracts);
      } catch (err) {
        return formatJSONResponse(400, err);
      }
    }
  );