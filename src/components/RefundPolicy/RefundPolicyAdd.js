import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../Constant.js";
import ReactQuill from "react-quill";

class RefundPolicyAdd extends React.Component {
  state = {
    
  };
  handleChange = (value) => {
    this.setState({ description: value });
  };
  componentDidMount() {
    this.getRefundPolicy();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.language_id !== nextProps.language_id) {
      setTimeout(() => {
        this.getRefundPolicy();
      }, 100);
    }
  }
  onSave = () => {
    var that = this;
    var data = {
      lCode: that.props.language_id,
      value: that.state.description,
    };

    fetch(Constant.getAPI() + "/metadata/add/refundPolicy", {
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
        if (json.status == true) {
          Swal.fire("Updated !", "Refund Policy has been Updated", "success");
          that.getRefundPolicy();
        } else {
          Swal.fire(
            "",
            "Something went wrong. Please try after some Time.!",
            "Warning"
          );
        }
      });
  };

  getRefundPolicy = () => {
    var that = this;
    var data = {
      lCode: that.props.language_id,
    };
    fetch(Constant.getAPI() + "/metadata/view/refundPolicy", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("superadmin_auth"),
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        console.log(json);
        that.setState({ description: json.data.value });
      });
  };
  render() {
    return (
      <div className="row">
        <div className="col-12 grid-margin">
          {this.state.isloading ? (
            ""
          ) : (
            // <HashLoader
            //   css={override}
            //   sizeUnit={"px"}
            //   size={50}
            //   margin={"2px"}
            //   color={"#32323d"}
            //   loading={this.state.isloading}
            // />
            <div className="">
              <div className="">
                <ReactQuill
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                <br />
                <br />{" "}
                <div className="row float-right p-3">
                  {this.state.isSaving ? (
                    <button className="btn btn-grd-disabled mr-2" disabled>
                      Saving...!
                    </button>
                  ) : (
                    <button
                      onClick={this.onSave}
                      className="btn btn-grd-disabled mr-2"
                    >
                      Save
                    </button>
                  )}

                  <Link to={"/refund_policy"} className="btn btn-outline-dark">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RefundPolicyAdd;
