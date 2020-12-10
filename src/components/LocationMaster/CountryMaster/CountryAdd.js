import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../../Constant.js";
import ReactQuill from "react-quill";

class CountryAdd extends React.Component {
  state = {
    status: "Active",
    description: "",
  };

  componentDidUpdate(prevProps) {
    if (prevProps.country_id !== this.props.country_id) {
      this.setState({ country_id: this.props.country_id });
      this.getCountryDetails();
    }
    if (prevProps.language_id !== this.props.language_id) {
      if (this.props.country_id !== undefined) {
        this.getCountryDetails();
      }
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getCountryDetails = () => {
    var that = this;
    var data = {
      lCode: that.props.language_id,
      countryId: that.props.country_id,
    };
    fetch(Constant.getAPI() + "/country/describe", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          that.setState({
            country_data: json.data,
            name: json.data.name,
            currency: json.data.currency,
            status: json.data.status,
          });
        } else {
          that.setState({ country_data: {} });
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

  updateCountryData = () => {
    var that = this;
    this.setState({ isSaving: true });
    var data = {
      countryId: that.props.country_id,
      lCode: that.props.language_id,
      name: that.state.name,
      status: that.state.status,
      currency: that.state.currency,
    };

    fetch(Constant.getAPI() + "/country/edit", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          Swal.fire("Updated !", "Country has been Updated", "success");
          window.location.href = "#/country";
          that.setState({ isSaving: false });
        } else {
          that.setState({ isSaving: false });
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
  addCountryIOtherLanguage = () => {
    var that = this;
    // var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      payload: {
        name: that.state.name,
        status: that.state.status,
        currency: that.state.currency,
      },
    };

    fetch(
      Constant.getAPI() +
        "/country/addOtherLanguage/" +
        that.props.language_id +
        "/" +
        that.props.country_id,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("superadmin_auth"),
        },
        body: JSON.stringify(data),
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          Swal.fire("Added !", "country has been Added", "success");
          window.location.href = "#/country";
          that.setState({ isSaving: false });
        } else {
          that.setState({ isSaving: false });
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
  addCountry = () => {
    var that = this;
    // var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      lCode: that.props.language_id,
      name: that.state.name,
    };

    fetch(Constant.getAPI() + "/country/addOne", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          Swal.fire("Added !", "country has been Added", "success");
          window.location.href = "#/country";
          that.setState({ isSaving: false });
        } else {
          that.setState({ isSaving: false });
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
  onHandleDescriptionChange = (value) => {
    this.setState({ description: value });
  };
  onSaveData = () => {
    var that = this;
    // Swal.fire("Added !", "Country has been Added", "success");
    if (that.props.country_id !== undefined) {
      if (that.state.isNewLanguage === true) {
        that.addCountryIOtherLanguage();
      } else {
        that.updateCountryData();
      }
    } else {
      that.addCountry();
    }
  };
  render() {
    return (
      <div className="">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Country Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    
                    placeholder="Country Name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </div>
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Currency</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="currency"
                    id="currency"
                    placeholder="Currency"
                    onChange={this.handleChange}
                    value={this.state.currency}
                  />
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Country Currency</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="country_currency"
                    id="country_currency"
                    placeholder="Country Currency"
                    onChange={this.handleChange}
                    value={this.state.country_currency}
                  />
                </div>
              </div>
            </div> */}

            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Status</label>
                <div className="col-sm-9">
                  <select
                    name="status"
                    className="form-control"
                    value={this.state.status}
                    onChange={this.handleChange}
                  >
                    <option value="Active" name="Active">
                      Active
                    </option>
                    <option value="NOT_Active" name="NOT_Active">
                      InActive
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                  <ReactQuill
                    value={this.state.description}
                    onChange={this.onHandleDescriptionChange}
                    style={{ height: "200px", marginBottom: '5%' }}
                  />
                </div>
              </div>
            </div>
          </div> */}

          <div className="card-footer">
            <div className="row">
              <div className="text-right col-6 offset-6">
                <Link to="/country" className="btn btn-outline-secondary">
                  <i className="icofont icofont-rounded-double-left"></i>
                  Back
                </Link>
                {this.state.isSaving ? (
                  <button
                    className="btn hor-grd btn-grd-inverse offset-1"
                    disabled
                  >
                    Saving...!
                  </button>
                ) : (
                  <button
                    onClick={this.onSaveData}
                    className="btn hor-grd btn-grd-inverse offset-1"
                  >
                    <i className="ti-save"></i>Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CountryAdd;
