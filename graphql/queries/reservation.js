
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var reservationModel = require('../../models/reservation');
var reservationType = require('../types/reservation').reservationType;

// Query
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      reservations: {
        type: new GraphQLList(reservationType),
        resolve: function () {
          const reservations = reservationModel.find().exec()
          if (!reservations) {
            throw new Error('Error')
          }
          return reservations
        }
      }
    }
  }
});

