import { DocumentClient } from "aws-sdk/clients/dynamodb";
import User from "../../models/User";
//import * as jwt from 'jsonwebtoken';






class UserService {
    constructor(
      private readonly docClient: DocumentClient,
      //private readonly tableName: string
    ) {}
  
  
      
    async createUser(post: User): Promise<User> {
      await this.docClient
        .put({
          TableName: process.env.USERS_TABLE,
          Item: post,
        })
        .promise();
  
      return post;
    }

    async getAllUsers(): Promise<User[]> {
      const result = await this.docClient
        .scan({
          TableName: process.env.USERS_TABLE,
        })
        .promise();
  
      return result.Items as User[];
    }


    async getUser(userId: string): Promise<User> {
      const result = await this.docClient
        .get({
          TableName: process.env.USERS_TABLE,
          Key: { userId: userId },
        })
        .promise();
  
      return result.Item as User;
    }
    


    async validateToken(token: string): Promise<User | null> {
      try {
        // Verify the token and extract the payload
        //const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
  
        // Get the user from the database
        const result = await this.docClient
          .get({
            TableName: process.env.USERS_TABLE,
            Key: { userId: token },
          })
          .promise();
  
        const user = result.Item as User;
        return user;
      } catch (err) {
        console.error("Error validating token", err);
        return null;
      }
    }
  
   

  }
  
  export default UserService;