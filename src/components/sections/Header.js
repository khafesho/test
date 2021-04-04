import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavItem from "../NavItem";

class Header extends Component {
    render() {
		const { auth : isAuthenticated } = this.props;
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">Project name</Link>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="mr-auto navbar-nav">
                            
                        </ul>
                        <div className="my-2 my-lg-0">
						{
                                isAuthenticated
                                    ? (
                                        <div>
                                           
                                            <button className="btn btn-warning" onClick={this.props.logout} style={{ marginLeft : 10}}>Logout</button>
											<Link className="btn btn-success" style={{ margin: '0 10px'}}>{ this.props.name }</Link>
											<Link className="btn btn-success" style={{ margin: '0 10px'}}>Birthday : { this.props.birthday }</Link>
											<Link className="btn btn-success" style={{ margin: '0 10px'}}>Gender : { this.props.gender }</Link>
                                        </div>
                                    ) : (
									 <>
                                        <Link className="btn btn-success" to="/login">Login</Link>
										<Link className="btn btn-success" to="/register" style={{ margin: '0 10px'}}>Register</Link>
									</>	
                                    )
                        }
                           
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
