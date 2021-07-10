const {
    DynamoDbSchema,
    DynamoDbTable,
} = require('@aws/dynamodb-data-mapper');

class Broker {
    Name;
    URL;

    constructor() { }
}

Object.defineProperties(Broker.prototype, {
    [DynamoDbTable]: {
        value: 'investments-tracker'
    },
    [DynamoDbSchema]: {
        value: {
            PK: {
                type: 'String',
                keyType: 'HASH',
            },
            SK: {
	              type: 'String',
	              keyType: 'RANGE'
            },
            EntityType: {type: 'String'}
        },
    },
});

module.exports = {
    Broker
};
