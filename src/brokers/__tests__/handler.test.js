const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

jest.mock('@aws-sdk/client-dynamodb');

const handler = require('../handler');

describe('hadler', () => {
  it('should be true', async () => {
    // Arrange
    DynamoDBClient.mockImplementation(() => ({
      send: () => ({
        Item: {
          a: { S: 'a' },
          b: { S: 'b' },
        },
      }),
    }));

    // Act
    const response = await handler.getBrokers();
    console.log(response);

    // Assert
    expect(response.statusCode).toBe(200);
  });
});
