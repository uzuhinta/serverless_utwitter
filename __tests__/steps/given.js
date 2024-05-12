const change = require('chance').Chance();

const a_random_user = () => {
  const firstName = change.first({ nationality: 'en' });
  const lastName = change.first({ nationality: 'en' });
  const suffix = change.string({
    length: 4,
    pool: 'abcdefghiklmnopqrstuvwxyz',
  });
  const name = `${firstName} ${lastName} ${suffix}`;
  const password = change.string({ length: 8 });
  const email = `${firstName}-${lastName}-${suffix}@utwitter.com`;

  return {
    name,
    password,
    email,
  };
};

module.exports = {
  a_random_user,
};
