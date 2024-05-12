require('dotenv').config();

const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');

const { DynamoDB } = require('@aws-sdk/client-dynamodb');

const user_exists_in_usersTable = async (id) => {
  const DynamoDb = DynamoDBDocument.from(new DynamoDB());

  console.log(`looking for user [${id}] in table [${process.env.USER_TABLE}]`);
  const resp = await DynamoDb.get({
    TableName: process.env.USER_TABLE,
    Key: {
      id,
    },
  });

  expect(resp.Item).toBeTruthy();

  return resp.Item;
};

module.exports = {
  user_exists_in_usersTable,
};
