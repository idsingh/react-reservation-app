import React from 'react';
import DataService from '../../services/dataService';
import { Link } from 'react-router-dom';
import ValidateEnabledField from '../validation-field';
import moment from 'moment';
import toastr from 'toastr';

export default class extends React.Component {
    hotelList = [{
        name: "Hotel T1",
    }, {
        name: "Hotel T2",
    }, {
        name: "Hotel T3",
    }, {
        name: "Hotel T4",
    }];
    constructor(props) {
        super(props);
        this.state = {
            modelObject: {},
            validationObject: {},
            validationTime: null
        };
        this.onFieldChange = this.onFieldChange.bind(this);
    }
    render() {
        let config = this.state;
        return (
            <div className = "create-reservation" >
                <div className="module-heading" >Create Reservation </div>
                <div className = "clear" > </div>
                <div className="field-rows">
                    <div className = "input-field" >
                        <ValidateEnabledField onValueChange = { this.onFieldChange }
                                              config = {{
                                                  id: "name",
                                                  inputType: "TEXT",
                                                  isActive: true,
                                                  labelName: "Name",
                                                  fieldValue: config.modelObject["name"],
                                                  isMandatory: true,
                                                  validationTime: this.state.validationTime
                                              }} />
                    </div>
                    <div className = "input-field" >
                        <ValidateEnabledField onValueChange = { this.onFieldChange } config = {{
                            id: "hotelName",
                            className: "cp-react-select",
                            inputType: "DROPDOWN",
                            isActive: true,
                            labelName: "Hotel Name",
                            validationTime: this.state.validationTime,
                            isMandatory: true,
                            fieldValue: config.modelObject["hotelName"],
                            labelKey: "name",
                            valueKey: "name",
                            fieldOptions: this.hotelList
                        }} />
                    </div>
                    <div className = "input-field" >
                        <ValidateEnabledField onValueChange = { this.onFieldChange }
                                              config = {{
                                                  id: "arrivalDate",
                                                  inputType: "DATE",
                                                  isActive: true,
                                                  labelName: "Arrival Date",
                                                  fieldValue: config.modelObject["arrivalDate"],
                                                  validationTime: this.state.validationTime,
                                                  isMandatory: true,
                                                  additionalConfig: {
                                                      isOutsideRange: (currentDate) => {
                                                          let departureDate = config.modelObject["departureDate"];
                                                          let endDate = moment(departureDate);
                                                          if (departureDate) {
                                                              return !(currentDate <= endDate && currentDate >= moment());
                                                          } else {
                                                              return !(currentDate >= moment());
                                                          }
                                                      }
                                                  }
                                              }} />

                    </div>
                    <div className = "input-field">
                        <ValidateEnabledField onValueChange = { this.onFieldChange }
                                              config = {{
                                                  id: "departureDate",
                                                  inputType: "DATE",
                                                  isActive: true,
                                                  fieldValue: config.modelObject["departureDate"],
                                                  labelName: "Departure Date",
                                                  validationTime: this.state.validationTime,
                                                  isMandatory: true,
                                                  additionalConfig: {
                                                      isOutsideRange: (currentDate) => {
                                                          let firstDate = moment(config.modelObject["arrivalDate"]);
                                                          return currentDate < firstDate;
                                                      }
                                                  }
                                              }} />
                    </div>
                </div>
                <div className="form-actions">
                    <button className = "fk-button filled medium"
                            onClick = { this.saveData } > Save </button>
                    <Link to = '/'
                          className = "fk-button filled medium" > Cancel </Link>
                </div>
            </div>
        );
    }
    onFieldChange({ id, selectedValue, validationStatus }) {
        let { modelObject, validationObject } = this.state;
        modelObject[id] = selectedValue;
        validationObject[id] = validationStatus;
        this.setState({
            modelObject,
            validationObject
        });
    }
    saveData = () => {
        this.setState({
            validationTime: +new Date
        }, () => {
            let fieldKeys = Object.keys(this.state.validationObject);
            let validationStatus = fieldKeys.every(key => this.state.validationObject[key]);
            let postData = { ...this.state.modelObject };

            if (validationStatus) {
                var data = {
                    ...postData,
                    hotelName: postData.hotelName.name
                };
                DataService.post("/reservation", {}, {
                    data
                }).then(() => {
                    toastr.success("Reservation created successfully");
                    this.props.history.push("/");
                });
            }
        });
    }
}
