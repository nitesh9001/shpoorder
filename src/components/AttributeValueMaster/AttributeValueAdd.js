import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../Constant";
import ReactQuill from "react-quill";
import ImageUpload from "../imageUpload/ImageUpload";

class AttributeValueAdd extends React.Component {
  state = {
    status: "Active",
    attribute_list_data: [
      {
        id: "1",
        name: "Material",
        type: "imageWithText",
        AttributeValues: [
          {
            id: "1",
            value: "Alligator, matt, square-scaled",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/material/thumb/a.png",
          },
          {
            id: "2",
            value: "Alligator, shiny, square-scaled",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/material/thumb/b.png",
          },
          {
            id: "3",
            value: "Alligator, carbone, square-scaled",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/material/thumb/c.png",
          },
          {
            id: "4",
            value: "Alligator, fashion, square-scaled",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/material/thumb/d.png",
          },
          {
            id: "5",
            value: "Ostrich",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/material/thumb/e.png",
          },
        ],
      },
      {
        id: "2",
        name: "Color",
        type: "imageWithText",
        AttributeValues: [
          {
            id: "6",
            value: "Navy Blue",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/color/thumb/b.jpg",
          },
          {
            id: "7",
            value: "Black",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/color/thumb/a.jpg",
          },
          {
            id: "8",
            value: "Dark brown",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/color/thumb/c.jpg",
          },
          {
            id: "9",
            value: "Red",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/color/thumb/d.jpg",
          },
        ],
      },
      {
        id: "3",
        name: "Model of the buckle",
        type: "text",
        AttributeValues: [
          {
            id: "10",
            value: "Thin model Steel buckle",
          },
          {
            id: "11",
            value: "Thin model Gold toned buckle",
          },
          {
            id: "12",
            value: "'CF' model Stainless steel buckle",
          },
          {
            id: "13",
            value: "'CF' model Gold-plated buckle",
          },
        ],
      },
    ],
    attribute_type_list: [
      {
        id: "1",
        value: "imageWithText",
        name: "Image With Text",
      },
      {
        id: "2",
        value: "text",
        name: "Text Only",
      },
    ],
    description: "",
  };
  onHandleDescriptionChange = (value) => {
    this.setState({ description: value });
  };
  componentDidMount() {
    this.setState({ AttributeId: this.props.attribute_id });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.attribute_value_id !== this.props.attribute_value_id) {
      this.setState({ attribute_value_id: this.props.attribute_value_id });
      this.getAttributeValueDetails();
    }
    if (prevProps.language_id !== this.props.language_id) {
      if (this.props.attribute_value_id !== undefined) {
        // this.setState({ attribute_value_id: this.props.attribute_value_id });
        this.getAttributeValueDetails();
      }
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getAttributeValueDetails = () => {
    var that = this;
    var data = {
      attributeValueId: this.props.attribute_value_id,
      lCode: this.props.language_id,
    };
    fetch(Constant.getAPI() + "/attributeValues/describe", {
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
            attribute_list: json.data,
            attribute_value: json.data.value,
            image_url: json.data.Medium ? json.data.Medium.url : "",
            mediumId: json.data.MediumId,
            AttributeTypeId: json.data.type,
          });
        } else {
          that.setState({ attribute_list: [] });
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

    var that = this;
    that.setState({ isSaving: true });
    // Swal.fire("Added !", "Brand has been Added", "success");
    // window.location.href = "#/brand";
    if (that.state.accepted) {
      that.uploadMedia();
    } else {
      if (that.props.attribute_value_id !== undefined) {
        // if (that.state.isNewLanguage === true) {
        //   that.addBrandIOtherLanguage(that.state.MediaId);
        // } else {
        that.updateCategoryData();
        // }
      } else {
        that.addCategory();
      }
    }
  };

  uploadGalleryImage = (image, url) => {
    this.setState({ image: image, image_url: url });
  };
  updateCategoryData = (image) => {
    var that = this;

    var data = {
      attributeValueId: this.props.attribute_value_id,
      lCode: this.props.language_id,
      value: that.state.attribute_value,
      attributeId: that.props.attribute_id,
      lCode: that.props.language_id,
      mediumId: this.state.image,
    };

    fetch(Constant.getAPI() + "/attributeValues/edit", {
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
          Swal.fire("Updated !", "Attribute Value has been Updated", "success");
          window.location.href = `#/attribute-values/${that.props.attribute_id}`;
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
  addCategory = () => {
    var that = this;
    this.setState({ isSaving: true });

    var data = {
      value: that.state.attribute_value,
      attributeId: that.props.attribute_id,
      lCode: that.props.language_id,
      mediumId: this.state.image,
    };

    fetch(Constant.getAPI() + "/attributeValues/add", {
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
          Swal.fire("Added !", "Attribute Value has been Added", "success");
          window.location.href = `#/attribute-values/${that.props.attribute_id}`;
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
    // this.getAttributeList();
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
                <label className="col-sm-3 col-form-label">Value</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="attribute_value"
                    id="attribute_value"
                    placeholder="Value"
                    onChange={this.handleChange}
                    value={this.state.attribute_value}
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
                    name="AttributeTypeId"
                    className="form-control"
                    value={this.state.AttributeTypeId}
                    //onChange={this.handleChange}
                    disabled
                  >
                    <option value="0">Select Attribute Type</option>
                    {this.state.attribute_type_list !== undefined &&
                    this.state.attribute_type_list !== null &&
                    this.state.attribute_type_list !== [] &&
                    this.state.attribute_type_list.length > 0
                      ? this.state.attribute_type_list.map((attribute) => (
                          <option key={attribute.id} value={attribute.value}>
                            {attribute.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </div>
            </div> */}
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-sm-3">Display Image</div>
                <div className="col-sm-9">
                  <ImageUpload
                    image_url={this.state.image_url}
                    uploadGalleryImage={this.uploadGalleryImage}
                  ></ImageUpload>
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
              <Link
                to={"/attribute-values/" + this.props.attribute_id}
                className="btn btn-outline-dark"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AttributeValueAdd;
