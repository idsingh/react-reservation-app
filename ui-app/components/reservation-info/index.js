import React from 'react';
import { Link } from 'react-router-dom';
import DataService from "../../services/dataService";
import moment from 'moment';
import appConstants from '../../services/constants';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {details} = this.state;
        return (
            <div className="info-container">
                <div className="module-heading">
                    <Link to="/"> <span className="back-icon">&#8592;</span> Reservations</Link></div>
                <div className="clear"></div>
                {details ? (
                    <div className="reservation-details">
                        <div className="row">
                            <div className="label">Name</div>
                            <div className="value">{details.name}</div>
                        </div>
                        <div className="row">
                            <div className="label">Hotel Name</div>
                            <div className="value">{details.hotelName}</div>
                        </div>
                        <div className="row">
                            <div className="label">Arrival date</div>
                            <div className="value">{moment(details.arrivalDate).format(appConstants.momentDateFormat)}</div>
                        </div>
                        <div className="row">
                            <div className="label">Departure date</div>
                            <div className="value">{moment(details.departureDate).format(appConstants.momentDateFormat)}</div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
    componentWillMount() {
        DataService.get("/reservation/${urlData.reservationId}", {
            reservationId: this.props.match.params.reservationId
        }).then((response) => {
            this.setState({
                details: response.reservation
            });
        });
    }
}
