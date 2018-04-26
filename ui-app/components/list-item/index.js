import React from 'react';
import hotelImage from '../../assets/images/app-images/hotel_1.jpg';
import moment from 'moment';
import appConstants from '../../services/constants';

export default ({reservation, history}) => {
    return (
        <div className="row-entity" onClick={() => {
            history.push('/app/reservation-details/' + reservation._id);
        }}>
            <img src={hotelImage}/>
            <div className="info-row">
                <div className="info-label">Name: <span>{reservation.name}</span></div>
                <div className="info-label">Hotel Name: <span>{reservation.hotelName}</span>
                </div>
                <div className="info-label">Arrival Date:
                    <span>
                        {moment(reservation.arrivalDate).format(appConstants.momentDateFormat)}
                    </span>
                </div>
                <div className="info-label">Departure Date:
                    <span>{moment(reservation.departureDate).format(appConstants.momentDateFormat)}</span>
                </div>
            </div>
        </div>
    );
};
