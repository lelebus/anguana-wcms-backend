const { makeExecutableSchema } = require('graphql-tools');
const { fileLoader, mergeResolvers, mergeTypes } = require('merge-graphql-schemas');
const path = require('path');

const typesArray = fileLoader(path.join(__dirname, './types/'), { recursive: true, extensions: ['.gql'] });
const resolversArray = fileLoader(path.join(__dirname, './resolvers/'), { recursive: true, extensions: ['.js'] });
const typeDefs = mergeTypes(typesArray, {all: true});
const resolvers = mergeResolvers(resolversArray);

const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false,
    },
});

module.exports = executableSchema;
