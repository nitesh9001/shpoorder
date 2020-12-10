import React from "react";
import SuperAdminSideNavBar from "./SideNavBar/ForSuperAdmin";
import ForVendorSideNavBar from "./SideNavBar/ForVendor";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.loginData);
  }
  render() {
    return this.props.loginData.user.role === "seller" ? (
      <ForVendorSideNavBar />
    ) : this.props.loginData.user.role === "admin" ? (
      <SuperAdminSideNavBar />
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return {
    loginData: state.login,
  };
};
SideNavBar.propTypes = {
  login: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(SideNavBar);
