import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../Constant";
import ReactQuill from "react-quill";

class AttributeAdd extends React.Component {
  state = {
    status: "Active",
    attribute_type_list: [
      {
        id: "1",
        value: "IMAGE_WITH_TEXT",
        name: "Image With Text",
      },
      {
        id: "2",
        value: "TEXT",
        name: "Text Only",
      },
    ],
    attributeType: "TEXT",
    description: "",
  };
  onHandleDescriptionChange = (value) => {
    this.setState({ description: value });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.attribute_id !== this.props.attribute_id) {
      this.setState({ attribute_id: this.props.attribute_id });
      this.getAttributeDetails();
    }
    if (prevProps.language_id !== this.props.language_id) {
      if (this.props.attribute_id !== undefined) {
        // this.setState({ attribute_id: this.props.attribute_id });
        this.getAttributeDetails();
      }
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleImageUpload = (event) => {
    document.getElementById("id_image_section_lable").innerHTML = "";
    let element = $("#user_Image").get(0);
    $("#id_image_section").empty();
    this.setState({ accepted: element });
    var proof_img = [];
    let obj = {};
    console.log(element.files);
    this.setState({ user_Image: element.files });
    for (var i = 0; i < element.files.length; i++) {
      var file1 = element.files[i];
      var img = document.createElement("img");
      img.className = "img-100";
      var filePath = URL.createObjectURL(file1);
      img.src = filePath;
      $("#id_image_section_lable").append(img);
    }
  };
  getAttributeDetails = () => {
    var that = this;

    this.setState({ isLoading: true });
    var data = {
      attributeId: this.props.attribute_id,
      lCode: "en",
    };
    fetch(Constant.getAPI() + "/attributes/describe", {
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
          if (json.data.name !== undefined) {
            that.setState({
              attribute_data: json.data,
              name: json.data.name,
              attributeType: json.data.attributeType,
              status: json.data.status,
              isNewLanguage: false,
              isLoading: false,
            });
          } else {
            that.setState({
              isLoading: false,
              name: "",
              isNewLanguage: true,
              attribute_data: {},
              image: "",
            });
          }
        } else {
          that.setState({
            isLoading: false,
            name: "",
            attribute_data: {},
            image: "",
          });
          // Swal.fire({
          //   title: "Something went wrong. Try again after some Time.!",
          //   icon: 'error',
          //   text: "",
          //   confirmButtonColor: "#3085d6",
          //   cancelButtonColor: "#d33",
          //   confirmButtonText: "Ok"
          // });
        }
      });
  };
  onSaveData = () => {
    var that = this;
    that.setState({ isSaving: true });
    if (that.props.attribute_id !== undefined) {
      if (that.state.isNewLanguage === true) {
        that.addAttributeIOtherLanguage(that.state.MediaId);
      } else {
        that.updateAttributeData(that.state.MediaId);
      }
    } else {
      that.addAttribute(that.state.MediaId);
    }
  };
  updateAttributeData = () => {
    var that = this;
    var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      attributeId: that.props.attribute_id,
      lCode: that.props.language_id,
      name: that.state.name,
      attributeType: that.state.attributeType,
    };

    fetch(Constant.getAPI() + "/attributes/edit", {
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
          Swal.fire("Updated !", "Attribute has been Updated", "success");
          window.location.href = "#/attributes";
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
  addAttributeIOtherLanguage = () => {
    var that = this;
    // var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      payload: {
        name: that.state.name,
        attributeType: that.state.attributeType,
      },
    };

    fetch(
      Constant.getAPI() +
        "/attribute/addOtherLanguage/" +
        that.props.language_id +
        "/" +
        that.props.attribute_id,
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
          Swal.fire("Added !", "attribute has been Added", "success");
          window.location.href = "#/attributes";
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
  addAttribute = () => {
    var that = this;
    // var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      lCode: that.props.language_id,
      name: that.state.name,
    };

    fetch(Constant.getAPI() + "/attributes/add", {
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
          Swal.fire("Added !", "attribute has been Added", "success");
          window.location.href = "#/attributes";
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
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Attribute Name
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    
                    placeholder="Attribute Name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </div>
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Attribute Type
                </label>
                <div className="col-sm-9">
                  <select
                    name="attributeType"
                    className="form-control"
                    value={this.state.attributeType}
                    onChange={this.handleChange}
                  >
                    {this.state.attribute_type_list !== undefined &&
                    this.state.attribute_type_list !== null &&
                    this.state.attribute_type_list !== [] &&
                    this.state.attribute_type_list.length > 0
                      ? this.state.attribute_type_list.map((attribute_type) => (
                          <option
                            key={attribute_type.id}
                            value={attribute_type.value}
                          >
                            {attribute_type.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Status</label>
                <div className="col-sm-9">
                  <select name="status" className="form-control" value={this.state.status} onChange={this.handleChange}>
                    <option value="true" name="active">Active</option>
                    <option value="false" name="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div> */}
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
              <Link to={"/attributes"} className="btn btn-outline-dark">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AttributeAdd;
