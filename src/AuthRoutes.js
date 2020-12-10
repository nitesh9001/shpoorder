import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const AuthRoutes = props => {
  const { isAuthUser} = props;
  if ( isAuthUser) return <Redirect to="/home" />;
  else if (!isAuthUser) return <Redirect to="/" />;

  return <Route {...props} />;
};

const mapStateToProps = ({ isAuthUser }) => ({
  isAuthUser
});

export default connect(mapStateToProps)(AuthRoutes);