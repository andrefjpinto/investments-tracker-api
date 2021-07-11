const {
  DynamoDBClient,
  GetItemCommand,
  QueryCommand,
} = require('@aws-sdk/client-dynamodb');

const getBrokers = async () => {
  const client = new DynamoDBClient({ region: 'eu-west-1' });

  const params = {
    TableName: 'investments-tracker',
    KeyConditionExpression: 'PK = :pk and begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': { S: 'u#1' },
      ':sk': { S: 'b#' },
    },
  };

  const data = await client.send(new QueryCommand(params));

  const brokers = data.Items.map((b) => ({
    id: '',
    name: b.Name.S,
    url: b.URL.S,
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(brokers, null, 2),
  };
};

const getBroker = async (event) => {
  const { id } = event.pathParameters;

  const client = new DynamoDBClient({ region: 'eu-west-1' });

  const params = {
    TableName: 'investments-tracker',
    Key: {
      PK: { S: 'u#1' },
      SK: { S: `b#${id}` },
    },
  };

  const data = await client.send(new GetItemCommand(params));

  if (data.Item) {
    const broker = {
      id: '',
      name: data.Item.Name.S,
      url: data.Item.URL.S,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(broker, null, 2),
    };
  }

  return {
    statusCode: 404,
  };
};

module.exports = {
  getBrokers,
  getBroker,
};
