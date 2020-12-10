import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../Constant.js";

class AboutUsDetails extends React.Component {
  state = {};

  componentDidMount() {
    this.getContactUsDetails();
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getContactUsDetails = (id) => {
    var that = this;
    // var data = new URLSearchParams();
    // this.setState({ isSaving: true });
    fetch(Constant.getAPI() + "/contactUsDetails", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        that.setState({
          contact_details: json,
          address: json.address,
          phoneNumber: json.phoneNumber,
          lat: json.lat,
          lng: json.lng,
          email: json.email,
          timings: json.timings,
          isSaving: false,
        });
      });
  };

  saveAboutUsDetails = () => {
    var that = this;
    var data = new URLSearchParams();
    this.setState({ isSaving: true });
    data.append("email", that.state.email);
    data.append("address", that.state.address);
    data.append("timings", that.state.timings);
    data.append("phoneNumber", that.state.phoneNumber);
    data.append("lat", that.state.lat);
    data.append("lng", that.state.lng);
    fetch(Constant.getAPI() + "/contactUsDetails", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          Swal.fire("Saved !", "Contact Details has been Saved", "success");
          that.getContactUsDetails();
          that.setState({ isSaving: false });
        } else {
          Swal.fire({
            title: "Something went wrong. Try again after some Time.!",
            icon: "error",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          });
        }
      });
  };

  onSave = () => {
    this.saveAboutUsDetails();
  };

  render() {
    return (
      <div className="main-body">
        <div className="page-wrapper">
          <div className="page-header">
            <div className="row align-items-end">
              <div className="col-lg-8">
                <div className="page-header-title">
                  <div className="d-inline">
                    <h4>Profile Details</h4>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="page-header-breadcrumb">
                  <ul className="breadcrumb-title">
                    <li className="breadcrumb-item">
                      <Link to="/">
                        <i className="feather icon-home"></i>{" "}
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">Profile Details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="page-body">
            <div className="row">
              <div className="col-sm-12">
                <div className="card card-border-primary">
                  <div className="card-block">
                    <div className="">
                      {this.state.isloading ? (
                        "Loading ..!"
                      ) : (
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-3">
                              <div
                                style={{
                                  width: "200px",
                                  height: "200px",
                                  background: "grey",
                                }}
                              >
                                img
                              </div>
                            </div>
                            <div className="col-sm-9">
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Type
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        Seller
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Seller Id
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        SELLEAME1233
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Business Name
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        Fortune Retails
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Contact Person
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        jamins Joe
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Mobile Number
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        78xxxxxx0
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Contact Number
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        78xxxxxx0
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Contact Number
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        78xxxxxx0
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Email
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        seller@fortune.com
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Address
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        B/N:14-14, BahvaNagar
                                        <br />
                                        Ahamdabaad ,Gujrat 2233111
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Location
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        Ahamd Gali
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Pincode
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        2233111
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      GST Details
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        799JHHHF7R
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Partner Since
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        78xxxxxx0
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Status
                                    </label>
                                    <div className="col-sm-9">
                                      <span
                                        className=""
                                        style={{
                                          background: "#66ff33",
                                          borderRadius: "15px",
                                          padding: "5px",
                                          fontSize: "12px",
                                          color: "white",
                                        }}
                                      >
                                        active
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row float-right p-3">
                            <Link
                              to="/about/profile-edit/"
                              className="btn btn-grd-disabled mr-2"
                            >
                              <i className="icofont icofont-save"></i> Edit
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUsDetails;
