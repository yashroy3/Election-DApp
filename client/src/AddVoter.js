import React, { Component } from 'react';
import { NavLink,BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './addvoter.css';

class AddVoter extends Component {
    render(){
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
                    <div className="container">
                        <div className="container-fluid">
                            <Router>
                                <NavLink className="navbar-brand" exact to="/">
                                    Commission for Election
                                </NavLink>
                            </Router>
                        </div>
                    </div>
                </nav>
                <div className="addV">
                    <h2>Add Voter</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        this.props.addVoter(this.aadharid.value,this.name.value,this.age.value,this.password.value)
                    }}>
                        <input type="text" placeholder="Adhaar Id" 
                            ref={(input_1) => {this.aadharid=input_1}}
                        />
                        <br /><br />
                        <input type="text" placeholder="Name" 
                            ref={(input_2) => {this.name=input_2}}
                        />
                        <br /><br />
                        <input type="number" placeholder="Age" 
                            ref={(input_3) => {this.age=input_3}}
                        />
                        <br /><br />
                        <input type="password" placeholder="Password" 
                            ref={(input_4) => {this.password=input_4}}
                        />
                        <br/><br/>
                        <input className="addbtn" type="submit" value="Add" />
                    </form>
                </div>
            </div>
        )
    }
}

export default AddVoter;