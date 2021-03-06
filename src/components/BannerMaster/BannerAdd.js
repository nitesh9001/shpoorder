import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../Constant";
import Loader from "../../Loader";

class BannerAdd extends React.Component {
  state = {
    status: "Active",
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.banner_id !== this.props.banner_id) {
      this.setState({ banner_id: this.props.banner_id });
      this.getBannerDetails();
    }
    if (prevProps.language_id !== this.props.language_id) {
      if (this.props.banner_id !== undefined) {
        this.setState({ banner_id: this.props.banner_id });
        this.getBannerDetails();
      }
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getBannerDetails = () => {
    var that = this;
    this.setState({ isLoading: true });
    var data = {
      bannerId: that.props.banner_id,
      lCode: that.props.language_id,
    };
    fetch(Constant.getAPI() + "/banner/describe", {
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
            banner_data: json.data,
            title: json.data.title,
            bannerId: json.data.bannerId,
            MediumId: json.data.MediumId,
            image: json.data.Medium.url,
            status: json.data.status,
            isLoading: false,
          });
        } else {
          that.setState({ isLoading: false });
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
  onSaveData = () => {
    var that = this;
    // that.setState({ isSaving: true });
    // Swal.fire("Added !", "banner has been Added", "success");
    if (that.state.accepted) {
      that.uploadMedia();
    } else if (
      (that.state.MediumId === undefined ||
        that.state.MediumId === null ||
        that.state.MediumId === "") &&
      (that.state.image === undefined ||
        that.state.image === null ||
        that.state.image === "")
    ) {
      Swal.fire("Error", "Select Banner Image First..! ", "warning");
      that.setState({ isSaving: false });
      return false;
    } else {
      if (that.props.banner_id !== undefined) {
        if (that.state.isNewLanguage === true) {
          that.addBannerIOtherLanguage(that.state.MediumId);
        } else {
          that.updateBannerData(that.state.MediumId);
        }
      } else {
        that.addBanner(that.state.MediumId);
      }
    }
  };
  uploadMedia = () => {
    var that = this;
    var form = $("#bannerImage")[0];
    var data = new FormData(form);
    // data.append('upload_for', 'user');
    fetch(Constant.getAPI() + "/media/add", {
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
      },
      body: data,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          if (that.props.banner_id !== undefined) {
            that.updateBannerData(json.data[0].id);
          } else {
            that.addBanner(json.data[0].id);
          }
        } else {
          // that.setState({ banner_data: [] });
          console.log(json.error);
        }
      });
  };
  updateBannerData = (mediumId) => {
    var that = this;
    var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      bannerId: that.props.banner_id,
      title: that.state.title,
      mediumId: mediumId,
      status: that.state.status,
      lCode: that.props.language_id,
    };

    fetch(Constant.getAPI() + "/banner/edit", {
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
          Swal.fire("Updated !", "Banner has been Updated", "success");
          window.location.href = "#/banner";
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
  addBannerIOtherLanguage = (mediumId) => {
    var that = this;
    // var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      title: that.state.title,
      mediumId: mediumId,
      status: that.state.status,
    };

    fetch(
      Constant.getAPI() +
        "/banner/addOtherLanguage/" +
        that.props.language_id +
        "/" +
        that.props.banner_id,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          Swal.fire("Added !", "Banner has been Added", "success");
          window.location.href = "#/banner";
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
  addBanner = (mediumId) => {
    var that = this;
    // var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      lCode: that.props.language_id,
      title: that.state.title,
      mediumId: mediumId,
      status: that.state.status,
    };

    fetch(Constant.getAPI() + "/banner/add", {
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
          Swal.fire("Added !", "Banner has been Added", "success");
          window.location.href = "#/banner";
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
  handleImageUpload = (event) => {
    document.getElementById("banner_image_label").innerHTML = "";
    let element = $("#banner_image").get(0);
    // $("#id_image_section").empty();
    this.setState({ accepted: element });
    var proof_img = [];
    let obj = {};
    console.log(element.files);
    this.setState({ banner_image: element.files });
    for (var i = 0; i < element.files.length; i++) {
      var file1 = element.files[i];
      var img = document.createElement("img");
      img.className = "img-100";
      var filePath = URL.createObjectURL(file1);
      img.src = filePath;
      $("#banner_image_label").append(img);
    }
  };
  componentWillMount() {
    this.loadScript(
      process.env.PUBLIC_URL + "/assets/pages/filer/jquery.fileuploads.init.js"
    );
  }
  loadScript(src) {
    let script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    document.head.append(script);
  }

  render() {
    return (
      <div className="">
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div className="card-body">
            <div className="row">
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Banner Title
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      id="title"
                      placeholder="Banner Title"
                      onChange={this.handleChange}
                      value={this.state.title}
                    />
                  </div>
                </div>
              </div> */}
              {/* <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Banner End Date</label>
                    <div className="col-sm-9">
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        id="date"
                        placeholder="Banner Date"
                        onChange={this.handleChange}
                        value={this.state.date}
                      />
                    </div>
                  </div>
                </div> */}

              <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-3">Display Image</div>
                  <div className="col-sm-9">
                    <form
                      id="bannerImage"
                      name="bannerImage"
                      encType="multipart/form-data"
                      className="text-capitalize"
                    >
                      <div className="form-group">
                        {/* <input
                          onChange={this.handleChange}
                          id="banner_image"
                          type="url"
                          className="form-control"
                          autoComplete="off"
                          name="MediumId"
                          defaultValue={this.state.MediumId}
                        /> */}
                        <input
                          accept="image/*"
                          onChange={this.handleImageUpload}
                          id="banner_image"
                          type="file"
                          className="form-control"
                          autoComplete="off"
                          name="files"
                          data-toggle="tooltip"
                          title="Click To Upload Banner Image"
                        />
                      </div>
                    </form>
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
                      <option>
                        Active
                      </option>
                      <option>
                        InActive
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-2">
                <div id="banner_image_label" className="pt-2">
                  {this.state.image ? (
                    this.state.image !== null ||
                    this.state.image !== undefined ||
                    this.state.image !== {} ? (
                      <img
                        src={this.state.image}
                        alt=""
                        className="img-100"
                        onError={(e) => {
                          e.target.src = "";
                        }}
                      />
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
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
          </div>
          */}
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
                <Link to={"/banner"} className="btn btn-outline-dark">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BannerAdd;
