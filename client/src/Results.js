import React, { Component } from "react";
import './Results.css';
import {Bar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
class Results extends Component{
    render(){

        const state1 = {
            
            labels: ['BJP','CONGRESS','AAP'],
            width:320,
            datasets: [
                {

                label: 'Votes',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: [this.props.candidates[0].voteCount,this.props.candidates[1].voteCount,this.props.candidates[2].voteCount]
                }
            ]
            
            }
            const state2 = {
                labels: ['Number of candidates Voted','Number of Candidates Not Voted'],
 
                datasets: [
                  {
                    label: 'Votes',
                    backgroundColor: [
                      '#B21F00',
                      '#C9DE00',
                      '#2FDE00',
                      '#00A6B4',
                      '#6800B4'
                    ],
                    hoverBackgroundColor: [
                    '#501800',
                    '#4B5000',
                    '#175000',
                    '#003350',
                    '#35014F'
                    ],
                    data: [this.props.actvote,this.props.votersCount - this.props.actvote]
                  }
                ]
              }

        return(
            <div>
                <div className='header' >
                    <h1 style={{fontSize:'40px'}}>Election Results</h1>
                </div>
                <div className='details'>
                    <div className='detailscontent'>
                        <a>Election Name: General Election</a>
                        <a style={{marginLeft:'6em'}}> Total Registered Vote: {this.props.votersCount}</a><br></br>
                        <a >Date: {Date().toLocaleString().slice(3,15)}</a>
                        <a style={{marginLeft:'12em'}} > Total Votes: {this.props.actvote}</a><br></br>
                        <a style={{marginLeft:'19.7em'}}>Invalid/Empty Votes: {this.props.votersCount-this.props.actvote}</a>
                    </div>
                </div>
                <div className='candidates' >
                    <h1 style={{fontSize:'35px'}}>Candidates</h1>
                </div>
        <table>
        
                <tr>
                <td></td>
                <td></td>
                <td></td>
               
            </tr>
                <tr>
                <td>{this.props.candidates[0].name}</td>
                <td>{this.props.candidates[1].name}</td>
                <td>{this.props.candidates[2].name}</td>
                
            </tr>
                <tr>
                <td>Votes: <b>{this.props.candidates[0].voteCount}</b></td>
                <td>Votes: <b>{this.props.candidates[1].voteCount}</b></td>
                <td>Votes: <b>{this.props.candidates[2].voteCount}</b></td>
                
            </tr>
        </table>
        <hr></hr>
            <div className='candidates' >
                    <h1 style={{fontSize:'35px'}}>Statistics</h1>
                    
                </div>
                 
                            <div style={{width: "70%",height: "60%",margin:"auto"}}>
                                <h1> Number Of Votes</h1>
                                <Bar
                                
                                data={state1}
                                options={{
                                    title:{
                                    display:true,
                                    text:'NUMBER OF VOTES',
                                    fontSize:20,
                                    },
                                    legend:{
                                    display:true,
                                    position:'right'
                                    }
                                }}
                                />
                            </div>
                            <hr></hr>
                            <div style={{width: "50%",height: "50%",margin:"auto"}}>
                                <h1 >Vote Count For Total Votes </h1>
                                <Doughnut
                                    data={state2}
                                    options={{
                                        title:{
                                        display:true,
                                        text:'Vote Count For Total Votes',
                                        fontSize:20,
                                        },
                                        legend:{
                                        display:true,
                                        position:'right'
                                        }
                                    }}
                                    />
                            
                            </div>

</div>

            
        );
        
    }
}
export default Results;