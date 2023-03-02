# Serverless Offline TypeScript Contract Management System

## Project Overview

This is a serverless project that allows for the management of contracts in a TypeScript environment. It uses the Serverless Framework to create a REST API that interacts with a DynamoDB database. The project is designed to be run offline using the Serverless Offline plugin.


## Project architecture 

![Architicture](https://user-images.githubusercontent.com/60974619/222353859-0cfd8fa7-6720-482c-82dc-e0e616deb77f.png)


## Prerequisites

Before you can run this project, you must have the following software installed:

- Node.js v12.x or later
- npm or yarn package manager
- AWS CLI (if you want to deploy the project to AWS)

## Installation

1. Clone the repository to your local machine:
```cmd
git clone https://github.com/moibraahim/ContractManagementSystem.git
```


2. Install the project dependencies:

```cmd
cd contract-management-system

npm install -g serverless

npm install serverless-offline --save-dev



npm install

sls dynamodb install

```




## Usage

To run the project locally, you can use the following command, this will start a scrip to run serverless and dynamodb 

```cmd
npm start
```



This will start the project using the Serverless Offline plugin, which emulates the AWS Lambda environment and API Gateway on your local machine.

## Testing

The project comes with a suite of tests that can be run using the following command:


```cmd
npm test
```

This will run the tests using the Jest testing framework.

## Deployment

To deploy the project to AWS, you can use the following command, note: you have to configure your aws credentials in aws CLI 

```cmd
npm run deploy
```

## Testing Endpoints with Postman
This guide will provide instructions on how to test the endpoints of the application using Postman. Postman is a popular tool used for testing RESTful APIs.

Prerequisites

-Download and install Postman.

-In project directory type [ npm start] 



![image](https://user-images.githubusercontent.com/60974619/222350847-d44e846c-9800-4aee-9f6a-75e94e75362e.png)


![image](https://user-images.githubusercontent.com/60974619/222350964-1258dfce-994c-4ec3-802e-6cd3d207f887.png)


![image](https://user-images.githubusercontent.com/60974619/222351431-cf0729ea-90ed-4cc3-817a-a014ad9f7dce.png)

![image](https://user-images.githubusercontent.com/60974619/222351584-1768f03f-8202-48bb-8261-4bdba4bad9f0.png)


![image](https://user-images.githubusercontent.com/60974619/222351809-d4eb7a17-2513-4b87-a20d-3a49b6843c73.png)


![image](https://user-images.githubusercontent.com/60974619/222352221-17b6ba5d-9416-47db-a640-1d620c546898.png)


![image](https://user-images.githubusercontent.com/60974619/222352436-096e3439-afa8-4903-8e7d-cd2ac3cb193b.png)

![image](https://user-images.githubusercontent.com/60974619/222352607-f311afcc-a9b6-4304-a339-4fd563b98819.png)













## ---------------------------------------------------------------------------
# Project Documentation 
## formatJsonResponse.ts
This file exports a function named formatJSONResponse that takes in two parameters: statusCode and response. The purpose of this function is to format an HTTP response in a specific way so that it can be returned by an API endpoint. The function creates an object with two properties: statusCode and body. statusCode is set to the value of the statusCode parameter passed into the function, while body is set to a JSON stringified version of the response parameter. The function then returns this object as the response.

## middify.ts
This file exports a function named middify that takes in a single parameter: a handler function that conforms to the AWS Lambda Handler interface. The purpose of this function is to add middleware to the handler function using the middy library.

The middleware added to the handler function includes the middyJsonBodyParser middleware, which parses the request body as JSON, and the cors middleware, which adds CORS headers to the response. The function then returns the wrapped handler function with middleware applied

## contractService.ts
This file exports a class named ContractService. The purpose of this class is to provide an interface for performing CRUD (Create, Read, Update, Delete) operations on a DynamoDB table that stores Contract objects.

The constructor takes in two parameters: a DocumentClient instance and the name of the DynamoDB table. The class provides five methods for performing CRUD operations on the table:

getAllContracts(): retrieves all Contract objects in the DynamoDB table and returns them as an array of Contract objects.


getContract(contractId: string): retrieves a single Contract object from the DynamoDB table based on its contractId attribute and returns it as a Contract object.

createContract(post: Contract): creates a new Contract object in the DynamoDB table based on the post parameter passed into the method and returns it as a Contract object.


updateContract(contractId: string, partialPost: Partial<Contract>): updates a Contract object in the DynamoDB table based on its contractId attribute and the partialPost parameter passed into the method. This method uses the UpdateExpression property of the DynamoDB update() method to set the title, description, and active attributes of the object, and returns the updated object as a Contract object.


deleteContract(contractId: string): deletes a Contract object from the DynamoDB table based on its contractId attribute.
The methods use the DocumentClient instance passed into the constructor to interact with the DynamoDB table.


## index.ts
The index.ts file exports two services, contractService and userService, which are instantiated from the ContractService and UserService classes, respectively. These classes interact with DynamoDB using a DocumentClient instance provided by createDynamoDBClient in the db.ts file.

## userService.ts
The userService provides methods for creating a new user, getting all users, getting a user by ID, and validating a user's token. The createUser method puts a new item in the USERS_TABLE of DynamoDB, which stores the userId, username, and password properties of the user.

## createContract.ts
The createContract endpoint in createContract.ts uses the contractService to create a new contract item in the POSTS_TABLE of DynamoDB, which stores the contractId, title, description, userId, templateId, active, and createdAt properties of the contract. It first checks if the Authorization header is present and if the token is valid by validating the token with the userService.

## createUser.ts
The createUser endpoint in createUser.ts uses the userService to create a new user item in the USERS_TABLE of DynamoDB, which stores the userId, username, and password properties of the user. It generates a new UUID for the userId.

## deleteContract.ts
This file exports an AWS Lambda function that handles a DELETE request to delete a contract by ID. It imports a middify function to handle middleware for the Lambda function, formatJSONResponse to format the response object and contractService to handle the deletion of the contract from the database.

## getAllContract.ts
This file exports an AWS Lambda function that handles a GET request to retrieve all contracts. It imports a middify function to handle middleware for the Lambda function, formatJSONResponse to format the response object and contractService to retrieve all contracts from the database.

## getAllUser.ts
This file exports an AWS Lambda function that handles a GET request to retrieve all users. It imports a middify function to handle middleware for the Lambda function, formatJSONResponse to format the response object and userService to retrieve all users from the database.

## getContract.ts
This file exports an AWS Lambda function that handles a GET request to retrieve a contract by ID. It imports a middify function to handle middleware for the Lambda function, formatJSONResponse to format the response object and contractService to retrieve the contract by ID from the database.


## getUser.ts
This file exports an AWS Lambda function that handles a GET request to retrieve a user by ID. It imports a middify function to handle middleware for the Lambda function, formatJSONResponse to format the response object and userService to retrieve the user by ID from the database.


## updateContract.ts
his file exports an AWS Lambda function that handles a PUT request to update a contract by ID. It imports a middify function to handle middleware for the Lambda function, formatJSONResponse to format the response object and contractService to update the contract in the database. It also imports UpdateContract from ../dtos/updateContractDto to validate the input.


## Contract.ts
This file exports an interface Contract that describes the properties of a contract.

## User.ts
This file exports an interface User that describes the properties of a user.
