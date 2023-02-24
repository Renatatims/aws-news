// imports aws-sdk package
const AWS = require('aws-sdk');

// modify the AWS config - region
AWS.config.update({
    region: 'us-east-2',
  });

// DynamoDB service object
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

//Params object - holds the schema and metadata of the table
const params = {
    TableName: 'Messages',
    KeySchema: [
      // Partition key
      { AttributeName: 'username', KeyType: 'HASH' },
      // Sort key - orders thoughts by most recent entry
      { AttributeName: 'createdAt', KeyType: 'RANGE' }, 
    ],
    AttributeDefinitions: [
      //String
      { AttributeName: 'username', AttributeType: 'S' }, 
      //Number
      { AttributeName: 'createdAt', AttributeType: 'N' }, 
    ],
    //Write and Read Capacity 
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };
