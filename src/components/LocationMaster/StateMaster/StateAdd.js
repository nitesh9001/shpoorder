import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../../Constant.js";
import $ from "jquery";
import ReactQuill from "react-quill";

class StateAdd extends React.Component {
  state = {
    status: "Active",
    description: "",
  };

  componentDidUpdate(prevProps) {
    if (prevProps.State_id !== this.props.State_id) {
      this.setState({ State_id: this.props.State_id });
      this.getStateDetails();
    }
    if (prevProps.language_id !== this.props.language_id) {
      if (this.props.State_id !== undefined) {
        this.getStateDetails();
      }
      this.getCountryList();
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getStateDetails = () => {
    var that = this;
    var data = {
      lCode: that.props.language_id,
      StateId: that.props.State_id,
    };
    fetch(Constant.getAPI() + "/State/describe", {
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
            State_data: json.data,
            name: json.data.name,
            countryId: json.data.CountryId,
            status: json.data.status,
          });
        } else {
          that.setState({ State_data: [] });
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
  getCountryList = () => {
    var that = this;
    var data = {
      lCode: "en",
    };
    fetch(Constant.getAPI() + "/country/list", {
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
          that.setState({ country_data: json.data });
        } else {
          that.setState({ country_data: [] });
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
  updateStateData = () => {
    var that = this;
    this.setState({ isSaving: true });
    var data = {
      StateId: that.props.State_id,
      lCode: that.props.language_id,
      name: that.state.name,
      status: that.state.status,
      countryId: that.state.countryId,
    };

    fetch(Constant.getAPI() + "/State/edit", {
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
          Swal.fire("Updated !", "State has been Updated", "success");
          window.location.href = "#/State";
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
  addStateIOtherLanguage = () => {
    var that = this;
    // var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      payload: {
        name: that.state.name,
        status: that.state.status,
        countryId: that.state.countryId,
      },
    };

    fetch(
      Constant.getAPI() +
        "/governate/addOtherLanguage/" +
        that.props.language_id +
        "/" +
        that.props.State_id,
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
          Swal.fire("Added !", "State has been Added", "success");
          window.location.href = "#/State";
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
  addState = () => {
    var that = this;
    // var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      lCode: that.props.language_id,
      name: that.state.name,
      status: that.state.status,
      countryId: that.state.countryId,
    };

    fetch(Constant.getAPI() + "/State/addOne", {
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
          Swal.fire("Added !", "State has been Added", "success");
          window.location.href = "#/State";
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
  componentDidMount() {
    this.getCountryList();
  }
  onHandleDescriptionChange = (value) => {
    this.setState({ description: value });
  };
  onSaveData = () => {
    var that = this;
    // Swal.fire("Added !", "State has been Added", "success");

    if (that.props.State_id !== undefined) {
      if (that.state.isNewLanguage === true) {
        that.addStateIOtherLanguage();
      } else {
        that.updateStateData();
      }
    } else {
      that.addState();
    }
  };
  render() {
    return (
      <div className="">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  State Name
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    
                    placeholder="State Name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Select Country
                </label>
                <div className="col-sm-9">
                  <select
                    name="countryId"
                    className="form-control form-control-inverse"
                    onChange={this.handleChange}
                    value={this.state.countryId}
                  >
                    <option value="opt1">Select Country</option>
                    {this.state.country_data !== undefined &&
                    this.state.country_data !== null &&
                    this.state.country_data !== [] &&
                    this.state.country_data.length > 0
                      ? this.state.country_data.map((country_data) => (
                          <option value={country_data.id} key={country_data.id}>
                            {country_data.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </div>
            </div>
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

          <div className="row float-right p-3">
            {this.state.isSaving ? (
              <button className="btn btn-grd-disabled mr-2" disabled>
                Saving...!
              </button>
            ) : (
              <button
                onClick={this.onSaveData}
                className="btn btn-grd-disabled mr-2"
              >
                <i className="icofont icofont-save"></i> Save
              </button>
            )}
            <Link to={"/State"} className="btn btn-outline-dark">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default StateAdd;
