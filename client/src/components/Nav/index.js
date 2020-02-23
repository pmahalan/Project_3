import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthButton from "../AuthButton";


//I want to add some basic inline styling here, even though we are bringing in styles
const buttonStyle = {
	marginRight:10
};
class Nav extends Component {
  state = {
    open: false,
    width: window.innerWidth
  };

  updateWidth = () => {
    const newState = { width: window.innerWidth };

    if (this.state.open && newState.width > 991) {
      newState.open = false;
    }

    this.setState(newState);
  };

  toggleNav = () => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  render() {
    return (
      <nav className="navbar" id="loginnav">
        {/* <Link className="navbar-brand" to="/">
          Auth Plate
        </Link> */}
        <div className={`${this.state.open ? "" : "collapse "}navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              {/* <Link style={buttonStyle} className=" btn btn-secondary" to="/public">Public Page</Link> */}
              <Link style={buttonStyle} className="" to="/protected">Protected Page</Link>
              <Link style={buttonStyle} className=""to="/register">Register a New User</Link>
              <AuthButton/>
            </li>
          
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
