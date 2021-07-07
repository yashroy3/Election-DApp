import React, { Component } from 'react';
import { NavLink,BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './index.css';
import Navbar from './Navbar';
import Aap from './aap.svg';
import Bjp from './bjp.png';
import Cong from './congress.svg';

class Voters extends Component {
    render(){
        return (
            <div>
                <Navbar/>
                { !this.props.voteProcess ? <div className="voted">Voting Process is currently Stopped !!</div> :
                    <div>
                        {this.props.voted?<div className="voted">User has already Voted !!</div>:
                            <div>
                                <div className="voterSection">
                                    <div className="InfoSection">
                                        <p>Name: {this.props.name}</p>
                                        <p>Age: {this.props.age}</p>
                                    </div>
                                    <div id="Clist">
                                        <table>
                                            <tr>
                                                <th>Election Symbol</th>
                                                <th>Party</th>
                                                <th>Candidate Name</th>
                                                <th>Vote</th>
                                            </tr>
                                            <tr className="party">
                                                <td><img src ={Bjp} width="50" height = "50"/></td>
                                                <td>Bharatiya Janata Party</td>
                                                <td>Narendra Modi</td>
                                                <td><button className="votebtn" onClick={()=>this.props.vote(1)}>Vote</button></td>
                                            </tr>
                                            <tr>
                                                <td><img src ={Aap} width="50" height = "50"/></td>
                                                <td> Indian National Congress</td>
                                                <td>Sonia Gandhi</td>
                                                <td><button className="votebtn" onClick={()=>this.props.vote(2)}>Vote</button></td>
                                            </tr>
                                            <tr>
                                                <td><img src ={Cong} width="50" height = "50"/></td>
                                                <td>Aam Aadmi Party</td>
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
        )
    }
}

export default Voters;