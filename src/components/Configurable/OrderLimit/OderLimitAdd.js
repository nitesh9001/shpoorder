import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../../Constant.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class OrderLimitAdd extends React.Component {
  state = {
    description: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSave = () => {
    // var that = this;
    // var data = new URLSearchParams();
    // data.append("facebook", that.state.facebook);
    // data.append("whatsapp", that.state.whatsapp);
    // data.append("twitter", that.state.twitter);
    // data.append("instagram", that.state.instagram);
    // data.append("youtube", that.state.youtube);
    // data.append("phNumber", that.state.phNumber);
    // fetch(Constant.getAPI() + "/social", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: localStorage.getItem("superadmin_auth"),
    //   },
    //   body: data,
    // })
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (json) {
    //     if (json.status === true) {
    //       Swal.fire("", "Social Media Links Updated", "success");
    //       that.getGeneralSettings();
    //     } else {
    //       Swal.fire(
    //         "",
    //         "Something went wrong. Please try after some Time.!",
    //         "Warning"
    //       );
    //     }
    //   });
  };
  componentDidMount() {
    this.getGeneralSettings();
  }
  getGeneralSettings = () => {
    // var that = this;
    // var data = new URLSearchParams();
    // fetch(Constant.getAPI() + "/social", {
    //   method: "get",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: localStorage.getItem("superadmin_auth"),
    //   },
    //   // body: data
    // })
    //   .then(function (response) {
    //     // console.log("response :: " , response.headers.get("content-type"));
    //     return response.json();
    //   })
    //   .then(function (json) {
    //     console.log(json);
    //     that.setState({
    //       facebook: json.facebook,
    //       whatsapp: json.whatsapp,
    //       twitter: json.twitter,
    //       instagram: json.instagram,
    //       phNumber: json.phNumber,
    //       youtube: json.youtube,
    //     });
    //   });
  };
  render() {
    return (
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">
                Min. Order Limit
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control"
                  name="mincartValue"
                  placeholder=" Min. Order Limit"
                  onChange={this.handleChange}
                  value={this.state.mincartValue}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">
                Max. Order Limit
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control"
                  name="maxcartValue"
                  placeholder=" Max. Order Limit"
                  onChange={this.handleChange}
                  value={this.state.maxcartValue}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Instruction</label>
              <div className="col-sm-9">
                <textarea
                  type="text"
                  className="form-control"
                  name="instruction"
                  placeholder="Instruction"
                  onChange={this.handleChange}
                  value={this.state.instruction}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
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
                <Link to={"/"} className="btn btn-outline-dark">
                  Cancel
                </Link>
              </div>
            </div>
       </div>
    );
  }
}

export default OrderLimitAdd;
