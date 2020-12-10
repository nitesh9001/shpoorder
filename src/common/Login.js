import React from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { getUsers } from "../store/index.js";
import PropTypes from "prop-types";
import Recaptcha from "react-google-invisible-recaptcha";



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "superAdmin",
      isVerifed:false
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.onResolved = this.onResolved.bind(this);
  }
  
  componentDidMount() {
    if (this.props.isAuthUser === true) {
      this.props.history.push("#/");
      console.log("yes");
      localStorage.setItem("prev", true);
    } else {
      // localStorage.setItem("user",false)
      console.log("no");
    }
  }
  onResolved() {
    this.setState({
      isVerifed:true
    })
  }
  verifyCallback = (response) => {
    // Here you will get the final recaptchaToken!!!
    console.log(response, "<= your recaptcha token");
  };
  

  recaptchaLoaded = () => {
    // you will get a new token in verifyCallback
    this.recaptcha.execute();
    console.log("your recaptcha token");

  };
  
  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onLogin = (event) => {
    event.preventDefault();
    if(!this.state.isVerifed){
    Swal.fire({
      title: "Recaptcha Verification Failed",
      icon: "error",
      text: "",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    });
    // // window.location.href = "/dashboard";
    // window.location.reload();  
    }
    else{
    const username = this.state.username,
      password = this.state.password,
      role = this.state.role;
    if (
      username !== "" &&
      password !== "" &&
      username !== null &&
      password !== null &&
      username !== undefined &&
      password !== undefined
    ) {
      this.props.getUsers(username, password, role);
      // window.location.reload();
      if (this.props.loginData.isAuthUser !== "") {
        if (!localStorage.getItem("role")) {
          Swal.fire({
            title: "Incorrect Credentials",
            icon: "error",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          });
        } else {
          Swal.fire({
            title: "Login Successfully",
            icon: "success",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          });
          // window.location.href = "/dashboard";
          window.location.reload();
        }
      }
      window.location.reload();
    } else {
      Swal.fire({
        title: "Incorrect Credentials",
        icon: "error",
        text: "",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      });
      // window.location.href = "/dashboard";
    }
  }
  };
  onsucess = () => {
    // Swal.fire({
    //   title: "Login Successfully",
    //   icon: "success",
    //   text: "",
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Ok",
    // });
    // // window.location.href = "/dashboard";
    // window.location.reload();
  };

  render() {
    return (
      <section className="login-block">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <form className="md-float-material form-material">
                <div className="text-center">
                  <img
                    src="./assets/images/logo.png"
                    alt="Online Orders"
                    className="img_logo_shadow"
                  />
                </div>
                <div className="auth-box card card_login_shadow">
                  <div className="card-block">
                    <div className="row m-b-20">
                      <div className="col-md-12">
                        <h3
                          className="text-center"
                          style={{ color: "#c11d2f" }}
                        >
                          Sign In
                        </h3>
                      </div>
                    </div>
                    <div className="form-group form-primary">
                      <select
                        name="role"
                        className="form-control"
                        onChange={this.onInputChange}
                        value={this.state.role}
                      >
                        <option value="">Select Role</option>
                        <option value="admin">Super Admin</option>
                        <option value="seller">Seller</option>
                        <option value="hoAdmin">HO Admin</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group form-primary">
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        required=""
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.onInputChange}
                      />
                      <span className="form-bar"></span>
                    </div>
                    <div className="form-group form-primary">
                      <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        className="form-control"
                        required=""
                        placeholder="Password"
                        onChange={this.onInputChange}
                      />
                      <span className="form-bar"></span>
                    </div>
                    <div className="row m-t-30">
                      <div className="col-md-12">
                        <button
                          type="button"
                          onClick={this.onLogin}
                          className="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20"
                          // disabled={this.props.login.inLoading}
                        >
                          Sign in
                        </button>
                        {/* {this.props.loginData.isAuthUser
                          ? this.onsucess()
                          : null} */}
                        <Recaptcha
                          ref={(ref) => (this.recaptcha = ref)}
                          sitekey="6LcNfuwZAAAAAOTgLOq5E2v7eMRBGYVHR7gWUOTB"
                          onloadCallback={this.recaptchaLoaded}
                          onResolved={this.onResolved}
                          onLoaded={this.recaptchaLoaded}
                        />
                        {/* <ReCaptcha
                          sitekey="6LcNfuwZAAAAAOTgLOq5E2v7eMRBGYVHR7gWUOTB"
                          ref={(ref) => (this.recaptcha = ref)}
                          render="explicit"
                          onloadCallback={this.recaptchaLoaded}
                          verifyCallback={this.verifyCallback}
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginData: state.login,
  };
};
Login.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getUsers })(Login);
