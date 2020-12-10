import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../store/login/usersActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Header extends React.Component {
  Signout = () => {
    // localStorage.clear();
    this.props.logoutUser();

    window.location.href = "#/"
    window.location.reload();
  };

  render() {
    return (
      <nav className="navbar header-navbar pcoded-header noprint">
        <div className="navbar-wrapper">
          <div className="navbar-logo">
            <a className="mobile-menu" id="mobile-collapse" href="javascript:void(0)">
              <i className="feather icon-menu"></i>
            </a>
            <Link to="/" >
              {/* <img className="img-fluid img-40" src="./assets/images/logo.png" alt="Theme-Logo" /> */}
              <h5 className="text-primary">Online Order</h5>
            </Link>
            <a className="mobile-options">
              <i className="feather icon-more-horizontal"></i>
            </a>
          </div>
          <div className="navbar-container container-fluid">
            <ul className="nav-right">
              {/* {
                localStorage.getItem('superadmin_role') === "shop"
                  ?
                  <Link to={"/shops/add/" + localStorage.getItem('superadmin_uid')}>
                    <li className="user-profile header-notification">
                      <img src="./assets/images/user.png" className="img-radius" alt="User-Profile-Image" />
                      <span>{localStorage.getItem("superadmin_name")}</span>
                    </li>
                  </Link>
                  : */}
              <li className="user-profile header-notification">
                <img src="./assets/images/user.png" className="img-radius" alt="User_Image" />
                <span>{localStorage.getItem("superadmin_name")}</span>
              </li>
              {/* } */}
              <li>
                <Link className="px-2 py-1" style={{background:'#f2f2f2',borderRadius:'50%'}} to="/"  dataToggle="tooltip" title="Notification">

                  <i className="feather icon-bell"></i>
                </Link>
              </li>
              <li>
                <button className="btn bg-transparent" onClick={this.Signout} dataToggle="tooltip" title="Logout">
                  <i className="feather icon-log-out"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  users:PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  // auth: state.auth,
  users:state.users
});
export default connect(
  mapStateToProps,
  { logoutUser })(Header);
