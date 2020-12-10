import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../../Constant.js";

class AreaAdd extends React.Component {
  state = {
    status: "Active",
    description: "desc",
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.language_id !== undefined) {
      if (prevProps.area_id !== this.props.area_id) {
        this.setState({ area_id: this.props.area_id });
        this.getAreaDetails();
      }
      if (this.props.language_id !== prevProps.language_id) {
        if (this.props.area_id !== undefined) {
          this.getAreaDetails();
        }
        this.getStateList();
      }
      if (this.state.country_id !== prevState.country_id) {
        this.getStateList();
      }
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getAreaDetails = () => {
    var that = this;
    var data = {
      lCode: that.props.language_id,
      areaId: that.props.area_id,
    };
    fetch(Constant.getAPI() + "/area/describe", {
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
            area_data: json.data,
            name: json.data.name,
            governateId: json.data.GovernateId,
            status: json.data.status,
          });
        } else {
          that.setState({ area_data: [] });
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

  updateAreaData = () => {
    var that = this;
    var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      areaId: that.props.area_id,
      lCode: that.props.language_id,
      name: that.state.name,
      status: that.state.status,
      StateId: that.state.governateId,
    };

    fetch(Constant.getAPI() + "/area/edit", {
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
          Swal.fire("Updated !", "Area has been Updated", "success");
          window.location.href = "#/area";
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
  addAreaIOtherLanguage = () => {
    var that = this;
    // var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      payload: {
        name: that.state.name,
        status: that.state.status,
        governateId: that.state.governateId,
      },
    };

    fetch(
      Constant.getAPI() +
        "/area/addOtherLanguage/" +
        that.props.language_id +
        "/" +
        that.props.area_id,
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
          Swal.fire("Added !", "Area has been Added", "success");
          window.location.href = "#/area";
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
  addArea = () => {
    var that = this;
    // var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      lCode: that.props.language_id,
      name: that.state.name,
      status: that.state.status,
      StateId: that.state.governateId,
    };

    fetch(Constant.getAPI() + "/area/addOne", {
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
          Swal.fire("Added !", "Area has been Added", "success");
          window.location.href = "#/area";
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
  componentWillMount() {
    this.loadScript(
      process.env.PUBLIC_URL + "/assets/pages/filer/jquery.fileuploads.init.js"
    );
    this.getStateList();
    // this.getCountryList();
  }
  loadScript(src) {
    let script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    document.head.append(script);
  }
  onSaveData = () => {
    var that = this;
    // Swal.fire("Added !", "Area has been Added", "success");
    if (that.props.area_id !== undefined) {
      if (that.state.isNewLanguage === true) {
        that.addAreaIOtherLanguage();
      } else {
        that.updateAreaData();
      }
    } else {
      that.addArea();
    }
  };
  getCountryList = () => {
    var that = this;
    var data = new URLSearchParams();
    // this.setState({ isSaving: true });
    fetch(Constant.getAPI() + "/country/list", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          that.setState({
            country_data: json.data,
            // country_id: json.State_data[0].id,
          });
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
  getStateList = () => {
    var that = this;
    var data = {
      lCode: "en",
    };
    fetch(Constant.getAPI() + "/State/list", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
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
            // governateId: json.data[0].id,
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
  render() {
    return (
      <div className="">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Area Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    
                    placeholder="Area Name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Pincode</label>
                <div className="col-sm-9">
                <select
                      name="pincode"
                      className="form-control"
                      value={this.state.pincode}
                      onChange={this.handleChange}
                    >
                    <option value={true}>
                        --Select Pincode--
                      </option>
                      <option value={true}>
                        221005
                      </option>
                      <option value={false}>
                        221006
                      </option>
                    </select>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Area Code</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="area_short_code"
                    id="area_short_code"
                    placeholder="Area Code"
                    onChange={this.handleChange}
                    defaultValue={this.state.area_short_code}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Pincode</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="pincode"
                    id="pincode"
                    placeholder="Pincode"
                    onChange={this.handleChange}
                    value={this.state.pincode}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Select Country</label>
                <div className="col-sm-9">
                  <select name="country_id" className="form-control form-control-inverse" onChange={this.handleChange} value={this.state.country_id}>
                    <option value="0">Select Country</option>
                    {
                      this.state.country_data !== undefined && this.state.country_data !== null && this.state.country_data !== [] && this.state.country_data.length > 0
                        ?
                        this.state.country_data.map(country_list =>
                          <option value={country_list.id}>{country_list.name}</option>
                        )
                        :
                        null
                    }
                  </select>
                </div>
              </div>
            </div>
             */}
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Select State
                </label>
                <div className="col-sm-9">
                  <select
                    name="governateId"
                    className="form-control form-control-inverse"
                    onChange={this.handleChange}
                    value={this.state.governateId}
                  >
                    <option value="">Select State</option>
                    {this.state.State_data !== undefined &&
                    this.state.State_data !== null &&
                    this.state.State_data !== [] &&
                    this.state.State_data.length > 0
                      ? this.state.State_data.map((State_data) => (
                          <option
                            value={State_data.id}
                            key={State_data.id}
                          >
                            {State_data.name}
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
            {/* <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Delivery Charge</label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control"
                    onChange={this.handleChange}
                    name="deliveryCharge"
                    id="deliveryCharge"
                    value={this.state.deliveryCharge}
                    placeholder="Delivery Charge"
                    aria-label="DeliveryCharge"
                    aria-describedby="basic-addon1" />
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-6">
              <div className="form-group ">
                <div className="input-group mb-3">
                  <div className="input-group-addon">
                    <span className="input-group-text" id="basic-addon1">Latitude</span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    onChange={this.handleChange}
                    name="lat"
                    id="lat"
                    value={this.state.lat}
                    placeholder="Latitude"
                    aria-label="Username"
                    aria-describedby="basic-addon1" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group ">
                <div className="input-group mb-3">
                  <div className="input-group-addon">
                    <span className="input-group-text" id="basic-addon1">Longitude</span>
                  </div>
                  <input
                    type="number"
                    onChange={this.handleChange}
                    name="lng"
                    id="lng"
                    placeholder="Longitude"
                    value={this.state.lng}
                    className="form-control"
                    aria-label="Longitude" aria-describedby="basic-addon1" />
                </div>
              </div>
            </div>
          */}
          </div>
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
            <Link to={"/area"} className="btn btn-outline-dark">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default AreaAdd;
