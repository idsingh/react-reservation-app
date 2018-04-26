
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var ReservationType = require('../types/reservation');
var ReservationModel = require('../../models/reservation');

exports.add = {
  type: ReservationType.reservationType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    hotelName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    arrivalDate: {
      type: new GraphQLNonNull(GraphQLString) ,
    },
    departureDate: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    const reservationModel = new ReservationModel(params);
    const newreservation = reservationModel.save();
    if (!newreservation) {
      throw new Error('Error');
    }
    return newreservation
  }
}