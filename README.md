# Serverless Offline TypeScript Contract Management System

## Project Overview

This is a serverless project that allows for the management of contracts in a TypeScript environment. It uses the Serverless Framework to create a REST API that interacts with a DynamoDB database. The project is designed to be run offline using the Serverless Offline plugin.

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
npm install
```


## Configuration

The project comes with default configuration settings that should work out-of-the-box for local development. However, you may want to modify these settings for production deployment. Here's how to do it:

1. Create a `.env` file in the root directory of the project.
2. Add the following variables to the file:
```cmd
NODE_ENV=development
DB_TABLE=contracts
AWS_REGION=us-east-1
```


Note that you may want to change the `DB_TABLE` variable to a different name that is more appropriate for your use case.

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



