import createDynamoDBClient from "../db";
import ContractService from "./contractService";
import UserService from "./userService";

const { POSTS_TABLE } = process.env;

const contractService = new ContractService(createDynamoDBClient(), POSTS_TABLE);
const userService = new UserService(createDynamoDBClient());

export default{
    contractService,
    userService,
  }