"use strict";
const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-west-1" });

module.exports.getBrokers = async (event, context) => {
  const params = {
    TableName: "investments-tracker",
    Key: {
      PK: { S: "u#1" },
      SK: { S: "b#1" },
    },
  };

  const data = await client.send(new GetItemCommand(params));

  return {
    statusCode: 200,
    body: JSON.stringify(data.Item, null, 2),
  };
};
