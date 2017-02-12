import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employee';
import EmployeeDetail from './employee_details';

const per_page = 4;

class EmployeeList extends Component {
    componentWillMount() {
        this.page = 1;
    }

    handleButtonClick() {
        Meteor.subscribe('employees', per_page * ++this.page);
    }
    render() {

        return (
            <div>
                <div className="employee-list">
                    {this.props.employees.map(employee =>
                        <EmployeeDetail key={employee._id} employee={employee}/>)}
                </div>
                <button onClick={this.handleButtonClick.bind(this)}
                        className="btn btn-primary">
                    Load More
                </button>
            </div>
        );
    }
};


export default createContainer( () => {
    Meteor.subscribe('employees', per_page);

    return { employees: Employees.find({}).fetch() };
    }, EmployeeList);