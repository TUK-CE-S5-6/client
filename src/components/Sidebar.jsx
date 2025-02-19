import React from 'react';
import { Link } from 'react-router-dom';
import '../Layout.css'; 

function Sidebar() {
    return (
        <div className="sidebar-container">
            <div className="area"></div>
            <nav className="main-menu">
                <ul>
                    <li>
                        <Link to="/">
                            <i className="fa fa-home fa-2x"></i>
                            <span className="nav-text">
                                Home
                            </span>
                        </Link>
                    </li>
                    <li className="has-subnav">
                        <Link to="/videoviewer">
                            <i className="fa fa-globe fa-2x"></i>
                            <span className="nav-text">
                                video
                            </span>
                        </Link>
                    </li>
                    <li className="has-subnav">
                        <Link to="/stt">
                            <i className="fa fa-comments fa-2x"></i>
                            <span className="nav-text">
                                stt
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
