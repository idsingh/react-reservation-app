import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import ValidateEnabledField from "../validation-field";
import moment from "moment";
import DataService from '../../services/dataService';
import ReservationListItem from '../list-item';
import appConstants from '../../services/constants';

export default class extends React.Component {
    gridColumns = [{
        Header: 'Name',
        accessor: 'name'
    }, {
        Header: 'Hotel Name',
        accessor: 'hotelName'
    }, {
        Header: 'Arrival Date',
        accessor: 'arrivalDate',
        Cell: props => {
            return <div>{moment(props.value).format(appConstants.momentDateFormat)}</div>
        }
    }, {
        Header: 'Departure Date',
        accessor: 'departureDate',
        Cell: props => {
            return <div>{moment(props.value).format(appConstants.momentDateFormat)}</div>
        }
    }];
    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            view: "grid",
            isAdmin: false,
            showLoader: false,
            modelObject: {},
            validationTime: null,
            validationObject: {},
            filters: []
        };
    }
    fetchReservations() {
        let { filters } = this.state;
        DataService.get("/reservations", {}, {
            params: filters
        }).then((response) => {
            this.setState({
                reservations: response.reservations
            });
        });
    }
    render() {
        let { modelObject, view } = this.state;
        return (
            <div className="reservation-container">
                <div className="module-heading">Reservations list</div>
                <div className="actions">
                    <Link to='/app/reservation/create' className="fk-button filled medium green">Create</Link>
                </div>
                <div className="clear"></div>
                <div className="filters">
                    <div className="input-field">
                        <ValidateEnabledField onValueChange={this.onFieldChange}
                                              config={{
                                                  id: "hotelName",
                                                  inputType: "TEXT",
                                                  isActive: true,
                                                  labelName: (
                                                      <div>
                                                          <i className="icon icon-hotel"></i>
                                                          Hotel Name
                                                      </div>
                                                  ),
                                                  fieldValue: modelObject["hotelName"],
                                                  validations: [{
                                                      validator: "validateContent",
                                                      validationMessage: "Allowed characters: 0-9a-zA-Z!@#$%^&*()"
                                                  }]
                                              }}/>
                    </div>
                    <div className="input-field">
                        <ValidateEnabledField onValueChange={this.onFieldChange}
                                              config={{
                                                  id: "arrivalDate",
                                                  inputType: "DATE",
                                                  isActive: true,
                                                  labelName: (
                                                      <div>
                                                          <i className="icon icon-arrival"></i>
                                                          Arrival Date
                                                      </div>
                                                  ),
                                                  fieldValue: modelObject["arrivalDate"],
                                                  additionalConfig: {
                                                    isOutsideRange: (currentDate) => {
                                                        let departureDate = modelObject["departureDate"];
                                                        let endDate = moment(departureDate);
                                                        if(departureDate) {
                                                            return !(currentDate <= endDate && currentDate >= moment());
                                                        } else {
                                                            return !(currentDate >= moment());
                                                        }
                                                    }
                                                }

                                              }}/>
                    </div>
                    <div className="input-field">
                        <ValidateEnabledField onValueChange={this.onFieldChange}
                                              config={{
                                                  id: "departureDate",
                                                  inputType: "DATE",
                                                  isActive: true,
                                                  labelName: (
                                                      <div>
                                                          <i className="icon icon-departure"></i>
                                                          Departure Date
                                                      </div>
                                                  ),
                                                  fieldValue: modelObject["departureDate"],
                                                  additionalConfig: {
                                                    isOutsideRange: (currentDate) => {
                                                        let firstDate = moment(modelObject["arrivalDate"]);
                                                        return currentDate < firstDate;
                                                    }
                                                }
                                              }}/>
                    </div>
                    <div className="action-row">
                        <button className="fk-button filled medium"
                                onClick={this.filterContent}>FILTER</button>
                    </div>
                </div>

                {this.state.reservations.length ? (
                    <div className="data-container">
                        <div className="options">
                            <i className={"icon icon-grid-layout " + (view === "grid" ? "selected": "")}
                               onClick={this.setView.bind(this, "grid")}></i>
                            <i className={"icon icon-table " + (view === "table" ? "selected": "")}
                               onClick={this.setView.bind(this, "table")}></i>
                        </div>
                        <div className="clear"></div>
                        {this.state.view === "grid" ? (
                            <div className="list-container">
                                {this.state.reservations.map((reservation, index) => {
                                    return <ReservationListItem reservation={reservation}
                                                                history={this.props.history}
                                                                key={index}/>;
                                })}
                                {this.state.reservations.length % 2 !== 0 ? (
                                    <div className="empty-entity"></div>
                                ): null}
                            </div>
                        ): (
                            <ReactTable
                                className="my-react-table -striped"
                                pageSizeOptions={[10, 20, 50, 100]}
                                defaultPageSize={20}
                                minRows={0}
                                data={this.state.reservations}
                                columns={this.gridColumns}
                                getTrProps={(state, rowInfo) => {
                                    return {
                                        onClick: (e) => {
                                            this.props.history.push('/app/reservation-details/' + rowInfo.original._id);
                                        },
                                        style: {
                                            cursor: "pointer"
                                        }
                                    }
                                }}/>
                        )}
                    </div>
                ): null}
            </div>
        );
    }
    onFieldChange = ({id, selectedValue, validationStatus}) => {
        let { modelObject, validationObject } = this.state;
        modelObject[id] = selectedValue;
        validationObject[id] = validationStatus;
        this.setState({
            modelObject,
            validationObject
        });
    }
    setView = (value) => {
        this.setState({
            view: value
        });
    }
    filterContent = () => {
        this.setState({
            validationTime: +new Date
        }, () => {
            let fieldKeys = Object.keys(this.state.validationObject);
            let validationStatus = fieldKeys.every(key => this.state.validationObject[key]);
            let postData = { ...this.state.modelObject };
            if(validationStatus) {
                let filters = {
                    ...postData
                };
                this.setState({
                    filters
                }, () => {
                    this.fetchReservations();
                })
            }
        });
    }
}
