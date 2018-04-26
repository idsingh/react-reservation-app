

var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;


exports.reservationType = new GraphQLObjectType({
  name: 'reservation',
  fields: function () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      name: {
        type: GraphQLString
      },
      hotelName: {
        type: GraphQLString
      },
      departureDate: {
        type: GraphQLString
      },
      arrivalDate: {
        type: GraphQLString,
        defaultValue: Date.now
      }
    }
  }
});

