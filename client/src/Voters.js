import React from 'react'
import { Link, NavLink} from 'react-router-dom'

function Voters() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
            <div className="container">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" exact to="/">
                        Commission for Election
                    </NavLink>
                </div>
            </div>
            </nav>
            <span class="d-block p-2 bg-dark text-white mt-3">Voter's Name:</span>
            <span class="d-block p-2 bg-dark text-white mt-3">Voter's Age:</span>
            <span class="d-block p-2 bg-dark text-white mt-3">Voter's Location:</span>
        </div>
    )
}

export default Voters
