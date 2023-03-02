import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Contract from "../../models/Contract";



class ContractService {
  constructor(
    private readonly docClient: DocumentClient,
    private readonly tableName: string
  ) {}

  async getAllContracts(): Promise<Contract[]> {
    const result = await this.docClient
      .scan({
        TableName: this.tableName,
      })
      .promise();

    return result.Items as Contract[];
  }

  async getContract(contractId: string): Promise<Contract> {
    const result = await this.docClient
      .get({
        TableName: this.tableName,
        Key: { contractId: contractId },
      })
      .promise();

    return result.Item as Contract;
  }

  async createContract(post: Contract): Promise<Contract> {
    await this.docClient
      .put({
        TableName: this.tableName,
        Item: post,
      })
      .promise();

    return post;
  }

  async updateContract(contractId: string, partialPost: Partial<Contract>): Promise<Contract> {
    const updated = await this.docClient
      .update({
        TableName: this.tableName,
        Key: { contractId: contractId },
        UpdateExpression:
          "set #title = :title, description = :description, active = :active",
        ExpressionAttributeNames: {
          "#title": "title",
        },
        ExpressionAttributeValues: {
          ":title": partialPost.title,
          ":description": partialPost.description,
          ":active": partialPost.active,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return updated.Attributes as Contract;
  }

  async deleteContract(contractId: string) {
    return this.docClient
      .delete({
        TableName: this.tableName,
        Key: { contractId: contractId },
      })
      .promise();
  }

 




}

export default ContractService;