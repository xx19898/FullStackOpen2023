const {GraphQLError} = require('graphql');

function authorizeUser(contextValue) {
  if (contextValue === 'USER') return true;
  throw new GraphQLError('Not Authorized', {
    extensions: {
      code: 'BAD_REQUEST',
    },
  });
}


module.exports = {authorizeUser};
