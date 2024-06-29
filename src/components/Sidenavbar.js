import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../Style/SidenavCss.css';

function SideNav() {
    return (
        <div className="sidebar">
            <div id='CompanyName' className='BOX'>
                <h2>Legal India</h2>
            </div>
            <hr className="divider"></hr> 
            <div id='list' className='BOX'>
                <ul>
                    <li>
                        <NavLink to="/" >
                            Leads
                        </NavLink>
                    </li>
                    <hr />
                    <li>
                        <NavLink to="/pages" >
                            Pages
                        </NavLink>
                    </li>
                    <hr />
                </ul>
            </div>
                   <hr className="divider"></hr> 
            <div className="logout-container">
                <button className="logout-button">
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
            </div>
        </div>
    );
}

export default SideNav;
