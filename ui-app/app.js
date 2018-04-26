import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header';
import 'react-dates/initialize';
import './assets/styles/main.scss';
import 'react-select/dist/react-select.css';
import 'react-table/react-table.css'
import 'react-dates/lib/css/_datepicker.css';
import ListReservations from "./components/list-reservations";
import CreateReservation from "./components/create-reservation";
import ReservationInfo from "./components/reservation-info";

// appEnvironment is coming from webpack define plugin
export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="app-wrapper">
                <Header/>
                <div className="main-container">
                    <Switch>
                        <Route exact path="/" component={ListReservations}/>
                        <Route exact path="/app/reservation/create" component={CreateReservation}/>
                        <Route exact path="/app/reservation-details/:reservationId" component={ReservationInfo}/>
                    </Switch>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}
