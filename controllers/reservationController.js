var moment = require('moment'),
    reservationService = require('../services/reservationService'),
    reservationController = {
        /**
         * Get all the reservations
         * @param req
         * @param res
         * @returns {Object}
         */
        /**
         * Get All reservations example
         * localhost:3000/reservations
         *
         */
        /**
         * Filter Query Example
         * localhost:3000/reservations?departureDate=2018-04-22&hotelName=test4&arrivalDate=2018-04-20
         */
        getAll: function (req, res) {
            /*   GET /reservations?hotelName=X&arrivalDate=Y&departureDate=Z –
               Returns all reservations that match the search criteria */
            var filter = {};
            var obj = req.query;
            obj.hotelName ? (filter['hotelName'] = obj.hotelName.trim()) : '';
            obj.departureDate ? (filter['departureDate'] = {
                '$lte': moment(+obj.departureDate).endOf('day'),
                '$gte': moment(+obj.departureDate).startOf('day')
            }) : {};
            obj.arrivalDate ? (filter['arrivalDate'] = {
                '$lte': moment(+obj.departureDate).endOf('day'),
                '$gte': moment(+obj.arrivalDate).startOf('day')
            }) : {};

            return reservationService.getAll(filter).then(function (data, err) {
                if (!err) {
                    res.send({
                        reservations: data
                    });
                } else {
                    res.send({
                        error: err,
                        message: 'Unable to fetch reservations data'
                    });
                }
            }).catch((err) => {
                res.send({
                    error: err,
                    message: 'Unable to fetch reservations data'
                });
            });
        },

        /*
         * Get reservation by reservation id
         * @param req
         * @param res
         * @returns {Object}
         */
        getById: function (req, res) {
            return reservationService.getById(req.params.id).then(function (data, err) {
                if (!err) {
                    if (data.length === 1) {
                        res.send({
                            reservation: data[0]
                        });
                    } else {
                        res.send({
                            message: "No reservation exist"
                        });
                    }

                } else {
                    res.send({
                        error: err,
                        message: 'Unable to fetch Reservation Data'
                    });
                }
            });
        },

        /**
         * Create a reservation.
         * @param req
         * @param res
         * @returns {Promise|Promise.<TResult>|*}
         */
        create: function (req, res) {
            return reservationService.createReservation(req.body).then(function (data, err) {
                if (err) {
                    return res.send({
                        error: err,
                        message: 'unable to create Reservation'
                    });
                } else {
                    return res.send({
                        message: 'Reservation created successfully',
                        data: 'OK'
                    });
                }
            }).catch(function (err) {
                return res.send({
                    error: err,
                    message: 'unable to create Reservation'
                });
            });
        }

    };

module.exports = reservationController;
