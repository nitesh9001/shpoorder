import React, { Component } from "react";
import Constant from "../../Constant";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
export default class AddGalleryImage extends Component {
  state = {};

  change = (event) => {
    var image = URL.createObjectURL(event.target.files[0]);

    this.setState({ uploading: true });
    const data = new FormData();
    data.append("files", event.target.files[0]);
    let url = Constant.getAPI() + "/media/add";
    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`
        },
      })
      .then((res) => {
        console.warn(res);
        this.props.uploadGalleryImage(res.data.data[0].id, res.data.data[0].url);
        this.setState({
          uploading: false,
          image: res.data.data[0].url,
        });
      });
  };

  render() {
    return (
      <div className="col-md-3 mb-3">
        <form runat="server">
          <input
            type="file"
            className="form-control"
            id="imgInp"
            onChange={this.change}
          />
          {this.state.image ? (
            <img
              className={"mt-1 border"}
              src={this.state.image}
              alt="your image"
              style={{ width: "170px" }}
            />
          ) : this.state.uploading ? (
            "Uploading..."
          ) : (
            ""
          )}
        </form>
      </div>
    );
  }
}
