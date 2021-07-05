import React,{Component} from 'react'
import { NavLink,BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Emblem from './emblem.svg';
import './home.css';

class Home extends Component {
    render(){
        return (
            <div>
                <header>
                    <img src ={Emblem} width="100px" height = "100px"/>
                        Election Commission of India
                </header>
                <div className="loginSection">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#43D6EA" className="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                    <h3>Log In</h3>
                    <form className="loginform" onSubmit={(e) => {
                        e.preventDefault()
                        this.props.login(this.aadharid.value,this.password.value)
                    }}>
                        <input type="text" placeholder="Adhaar Id" ref={(input_1) => {this.aadharid=input_1}}/><br/><br/>
                        <input type="password" placeholder="Password" ref={(input_2) => {this.password=input_2}}/><br/><br/>
                        <input type="submit" value="Log In" className="loginbtn"/>
                    </form>
                </div>
        </div>

        )
    }
}

export default Home;