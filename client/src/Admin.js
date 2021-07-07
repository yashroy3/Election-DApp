import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Results from "./Results";
import Home from "./Home";
import AddVoter from './AddVoter';
import './Admin.css';
import Aap from './aap.svg';
import Bjp from './bjp.png';
import Cong from './congress.svg';
import Emblem from './emblem.svg';


class Admin extends Component{
    render(){
        return(
            <div>
                <Router>
                    { this.props.viewresult ? 
                        <Results 
                            votersCount={this.props.votersCount}
                            actvote={this.props.actvote}
                            candidates={this.props.candidates}
                        /> : <div>
                            {this.props.addVoterPage ? 
                            <AddVoter
                                addVoter={this.props.addVoter}
                            />:
                        <div>
                            <div className='admin'>
                                <div className='sidebar'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#fff" className="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                                    <p className='para'>Admin</p>
                                    {!this.props.voteProcess ? <button className='sidebutton' onClick={this.props.startvoting} >Activate Election</button> :
                                        <button className='sidebutton' onClick={this.props.stopvoting} >Deactivate Election</button>
                                    }
                                    <Link to='/results'><button className="sidebutton" onClick={this.props.viewResult} >Results</button></Link>
                                    <button className="sidebutton" onClick={this.props.add}>Add Voters</button>
                                    <Link to='/vote'><button className="sidebutton" >Vote</button></Link>
                                </div>
                            </div>
                        </div>}
                        </div>
                    }
                    <switch>
                        <Route
                            path='/addvoter' render={(props) => 
                                <AddVoter 
                                    addVoter={this.props.addVoter} 
                                    {...props}
                                />}
                        />
                        <Route
                            path='/vote' render={() => 
                                <div className='adminvote'>
                                    { !this.props.voteProcess ? <div className="adminvoted">Voting Process is currently Stopped !!</div> :
                                        <div>
                                            {this.props.voted?<div className="adminvoted">User has already Voted !!</div>:
                                                <div>
                                                    <div className="voterSection">
                                                        <div id="Clist">
                                                            <table>
                                                                <tr>
                                                                    <th>Election Symbol</th>
                                                                    <th>Party</th>
                                                                    <th>Candidate Name</th>
                                                                    <th>Vote</th>
                                                                </tr>
                                                                <tr>
                                                                    <td><img src ={Bjp} width="50" height = "50"/></td>
                                                                    <td>{this.props.candidates[0].name}</td>
                                                                    <td>Narendra Modi</td>
                                                                    <td><button className="votebtn" onClick={()=>this.props.vote(1)}>Vote</button></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><img src ={Aap} width="50" height = "50"/></td>
                                                                    <td>{this.props.candidates[1].name}</td>
                                                                    <td>Sonia Gandhi</td>
                                                                    <td><button className="votebtn" onClick={()=>this.props.vote(2)}>Vote</button></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><img src ={Cong} width="50" height = "50"/></td>
                                                                    <td>{this.props.candidates[2].name}</td>
                                                                    <td>Arvind Kejriwal </td>
                                                                    <td><button className="votebtn" onClick={()=>this.props.vote(3)}>Vote</button></td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            }
                        />
                    </switch>
                </Router>
            </div>
        );
    }
}
export default Admin;