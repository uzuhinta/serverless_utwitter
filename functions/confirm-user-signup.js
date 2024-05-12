const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');

const { DynamoDB } = require('@aws-sdk/client-dynamodb');

const DocumentClient = DynamoDBDocument.from(new DynamoDB());
const Chance = require('chance');
const chance = new Chance();
const { USER_TABLE } = process.env;

module.exports.handler = async (event) => {
  const name = event.request.userAttributes['name'];
  const suffix = chance.string({
    length: 8,
    casing: 'upper',
    alpha: true,
    numeric: true,
  });
  const screenName = `${name.replace(/[^a-zA-Z0-9]/g, '')}${suffix}`;

  const user = {
    id: event.userName,
    name,
    screenName,
    createdAt: new Date().toJSON(),
    followersCount: 0,
    followingCount: 0,
    tweetsCount: 0,
    likesCount: 0,
  };
  if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
    await DocumentClient.put({
      TableName: USER_TABLE,
      Item: user,
      ConditionExpression: 'attribute_not_exists(id)',
    });
    return event;
  } else {
    return event;
  }
};
