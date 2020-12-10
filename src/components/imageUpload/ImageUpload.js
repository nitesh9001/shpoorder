import React, { Component } from "react";
import Constant from "../../Constant";
import axios from "axios";

export default class ImageUpload extends Component {
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
          Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
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
      <form runat="server">
        <input
          type="file"
          className="form-control"
          id="imgInp"
          onChange={this.change}
        />
        {this.state.image || this.props.image_url? (
          <img
            className={"mt-1 border"}
            src={this.props.image_url ? this.props.image_url : this.state.image}
            alt="your image"
            style={{ width: "170px" }}
          />
        ) : this.state.uploading ? (
          "Uploading..."
        ) : (
          ""
        )}
      </form>
    );
  }
}
