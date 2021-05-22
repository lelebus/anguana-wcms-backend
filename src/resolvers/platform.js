const platform = require('../services/platform');
const { ForbiddenError, ApolloError } = require('apollo-server');

module.exports = {
    Query: {
        getPlatformPrefs: async (_, __, {}) => { 
            return await platform.getDeliveryTiming()
                    .then(res => {
                        return res;
                    })
                    .catch(err => {
                        throw new ApolloError(err)
                    })
        }
    },
    Mutation: {
        setPlatformPrefs: async (_, args , { req }) => {
            if (req.userRole != 'ADMIN') {
                throw new ForbiddenError
            }

            return await platform.setDeliveryTiming(args.prefs)
                    .then(res => {
                        return true;
                    })
                    .catch(err => {
                        throw new ApolloError(err)
                    })
        }
    }
}