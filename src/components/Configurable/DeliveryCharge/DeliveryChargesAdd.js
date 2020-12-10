import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../../Constant.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class DeliveryChargesAdd extends React.Component {
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
              Pincode
              </label>
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
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">
                Delivery Charges
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control"
                  name="deliveryCharges"
                  
                  placeholder="Delivery Charges"
                  onChange={this.handleChange}
                  value={this.state.deliveryCharges}
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

export default DeliveryChargesAdd;
