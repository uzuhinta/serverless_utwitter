require('dotenv').config();
const {
  CognitoIdentityProvider,
} = require('@aws-sdk/client-cognito-identity-provider');

const we_invoke_confirmUserSignup = async (username, name, email) => {
  const handler = require('../../functions/confirm-user-signup').handler;

  const context = {};
  const event = {
    version: '1',
    region: process.env.AWS_REGION,
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    userName: username,
    triggerSource: 'PostConfirmation_ConfirmSignUp',
    request: {
      userAttributes: {
        sub: username,
        'cognito:email_alias': email,
        'cognito:user_status': 'CONFIRMED',
        email_verified: 'false',
        name: name,
        email: email,
      },
    },
    response: {},
  };

  await handler(event, context);
};

const a_user_signs_up = async (password, name, email) => {
  const cognito = new CognitoIdentityProvider();

  const userPoolId = process.env.COGNITO_USER_POOL_ID;

  const clientId = process.env.WEB_COGNITO_USER_POOL_CLIENT_ID;

  const signUpResp = await cognito
    .signUp({
      ClientId: clientId,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'name',
          Value: name,
        },
      ],
    });

  const username = signUpResp.UserSub;
  console.log(`[${email}] - user has signup [${username}]`);

  await cognito
    .adminConfirmSignUp({
      UserPoolId: userPoolId,
      Username: username,
    });

  console.log(`[${email}] - confirm sign up`);

  return {
    username,
    name,
    email,
  };
};

module.exports = {
  we_invoke_confirmUserSignup,
  a_user_signs_up,
};
