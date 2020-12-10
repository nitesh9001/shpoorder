import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../Constant";
// import ReactQuill from "react-quill";
import Loader from "../../Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
 
class PaymentAdd extends React.Component {
  state = {
    status: "Active",
    description: "",
    MediaId: "",
    picodelist: [
      { id: "1", name: "221005" },
      { id: "2", name: "221006" },
      { id: "3", name: "229316" },
    ],
  };
  onHandleDescriptionChange = (value) => {
    this.setState({ description: value });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.brand_id !== this.props.brand_id) {
      this.setState({ brand_id: this.props.brand_id });
      this.getBrandDetails();
    }
    if (prevProps.language_id !== this.props.language_id) {
      if (this.props.brand_id !== undefined) {
        this.setState({ brand_id: this.props.brand_id });
        this.getBrandDetails();
      }
      // this.getCategoryList();
    }
  }
  getCategoryList = () => {
    var that = this;
    var data = new URLSearchParams();

    var data = {
      lCode: that.props.language_id,
    };
    fetch(Constant.getAPI() + "/category/list", {
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
          that.setState({ categoryList: json.data });
        } else {
        }
      });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getBrandDetails = () => {
    var that = this;
    this.setState({ isLoading: true });
    var data = {
      lCode: that.props.language_id,
      brandId: that.props.brand_id,
    };
    fetch(Constant.getAPI() + "/brand/describe", {
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
            brand_data: json.data,
            name: json.data.name,
            isFeatured: json.data.isFeatured,
            status: json.data.status,
            description: json.data.description,
            image: json.data.Medium.url,
            mediumId: json.data.MediumId,
            isNewLanguage: false,
            isLoading: false,
          });
        } else {
          that.setState({
            isLoading: false,
            name: "",
            brand_data: {},
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
    // Swal.fire("Added !", "Brand has been Added", "success");
    // window.location.href = "#/brand";
    if (that.state.accepted) {
      that.uploadMedia();
    } else {
      if (that.props.brand_id !== undefined) {
        if (that.state.isNewLanguage === true) {
          that.addBrandIOtherLanguage(that.state.MediaId);
        } else {
          that.updateBrandData(that.state.MediaId);
        }
      } else {
        that.addBrand(that.state.MediaId);
      }
    }
  };
  uploadMedia = () => {
    var that = this;
    var form = $("#brandImage")[0];
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
          if (that.props.brand_id !== undefined) {
            that.updateBrandData(json.data[0].id);
          } else {
            that.addBrand(json.data[0].id);
          }
        } else {
          // that.setState({ brand_data: [] });
          console.log(json.error);
        }
      });
  };
  updateBrandData = (mediumId) => {
    var that = this;
    var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      brandId: that.props.brand_id,
      lCode: that.props.language_id,
      name: that.state.name,
      description: that.state.description,
      mediumId: mediumId ? mediumId : this.state.mediumId,
      status: that.state.status,
      isFeatured: that.state.isFeatured,
    };

    fetch(Constant.getAPI() + "/brand/edit", {
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
          Swal.fire("Updated !", "Brand has been Updated", "success");
          window.location.href = "#/brand";
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
  addBrandIOtherLanguage = (mediumId) => {
    var that = this;
    // var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      payload: {
        name: that.state.name,
        description: that.state.description,
        mediumId: mediumId,
        status: that.state.status,
        categoryId: that.state.categoryId,
        isFeatured: that.state.isFeatured,
      },
    };

    fetch(
      Constant.getAPI() +
        "/brand/addOtherLanguage/" +
        that.props.language_id +
        "/" +
        that.props.brand_id,
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
          Swal.fire("Added !", "brand has been Added", "success");
          window.location.href = "#/brand";
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
  addBrand = (mediumId) => {
    var that = this;
    // var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      lCode: that.props.language_id,
      name: that.state.name,
      description: that.state.description,
      mediumId: mediumId,
      status: false,
      categoryId: that.state.categoryId,
      isFeatured: that.state.isFeatured,
    };

    fetch(Constant.getAPI() + "/brand/add", {
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
          Swal.fire("Added !", "brand has been Added", "success");
          window.location.href = "#/brand";
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
    document.getElementById("brand_image_label").innerHTML = "";
    let element = $("#brand_image").get(0);
    // $("#id_image_section").empty();
    this.setState({ accepted: element });
    var proof_img = [];
    let obj = {};
    console.log(element.files);
    this.setState({ brand_image: element.files });
    for (var i = 0; i < element.files.length; i++) {
      var file1 = element.files[i];
      var img = document.createElement("img");
      img.className = "img-100";
      var filePath = URL.createObjectURL(file1);
      img.src = filePath;
      $("#brand_image_label").append(img);
    }
  };
  componentDidMount() {
    this.getCategoryList();
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
    const { name } = this.state;
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: "1px dotted grey",
        color: state.isSelected ? "red" : "black",
        padding: 8,
      }),
      input: (provided) => ({
        ...provided,
        display: "flex",
        height: "30px",
      }),
    };
    return (
      <div className="">
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Title</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      
                      placeholder="Title"
                      onChange={this.handleChange}
                      value={this.state.title}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">New Order Status</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="newOrderStatus"                      
                      placeholder="New Order Status"
                      onChange={this.handleChange}
                      value={this.state.newOrderStatus}
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
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Max. Order Value</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="maxOrdervalue"                      
                      placeholder="Max. Order Value"
                      onChange={this.handleChange}
                      value={this.state.maxOrdervalue}
                    />
                  </div>
                </div>
              </div> <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Min. Order Value</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="minOrdervalue"
                      placeholder="Min. Order Value"
                      onChange={this.handleChange}
                      value={this.state.minOrdervalue}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Max. Order Quantity</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="maxOrderQuant"
                      placeholder="Max. Order Quantity"
                      onChange={this.handleChange}
                      value={this.state.maxOrderQuant}
                    />
                  </div>
                </div>
              </div> <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Min. Order Quantity</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="minOrderQuant"
                      placeholder="Min. Order Quantity"
                      onChange={this.handleChange}
                      value={this.state.minOrderQuant}
                    />
                  </div>
                </div>
              </div>
              
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Featured</label>
                  <div className="col-sm-9">
                    <select
                      name="isFeatured"
                      className="form-control"
                      value={this.state.isFeatured}
                      onChange={this.handleChange}
                    >
                      <option value="true" name="yes">
                        Yes
                      </option>
                      <option value="false" name="no">
                        No
                      </option>
                    </select>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Category</label>
                  <div className="col-sm-9">
                    <select
                      name="categoryId"
                      className="form-control"
                      value={this.state.categoryId}
                      onChange={this.handleChange}
                    >
                      <option value="0">Select Category</option>
                      {this.state.categoryList !== undefined &&
                      this.state.categoryList !== null &&
                      this.state.categoryList !== [] &&
                      this.state.categoryList.length > 0
                        ? this.state.categoryList.map((category) => (
                            <option
                              key={category.id}
                              value={category.id}
                            >
                              {category.name}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-md-8">
                <div className="row">
                  <div className="col-sm-3">Display Image</div>
                  <div className="col-sm-9">
                    <form
                      id="brandImage"
                      name="brandImage"
                      encType="multipart/form-data"
                      className="text-capitalize"
                    >
                      <div className="form-group">
                        <input
                          accept="image/*"
                          onChange={this.handleImageUpload}
                          id="brand_image"
                          type="file"
                          className="form-control"
                          autoComplete="off"
                          name="files"
                          data-toggle="tooltip"
                          title="Click To Upload Banner Image"
                        />
                        <span className="mt-1">( 430 x 170 )</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-2">
                <div id="brand_image_label" className="pt-2">
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

              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Featured</label>
                  <div className="col-sm-9">
                    <select
                      name="isFeatured"
                      className="form-control"
                      value={this.state.isFeatured}
                      onChange={this.handleChange}
                    >
                      <option>Select</option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
              </div> */}
              <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
              Payment From Applicable Pincode
                </label>
                <div className="col-sm-9">
                  <Select
                    styles={customStyles}
                    isMulti={true}
                    value={name}
                    getOptionLabel={(option) => `${option.name}`}
                    getOptionValue={(option) => `${option.id}`}
                    onChange={this.handleSelectCat}
                    options={this.state.picodelist}
                  />
                </div>
              </div>
            </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Enable</label>
                  <div className="col-sm-9">
                    <select
                      name="status"
                      className="form-control"
                      value={this.state.status}
                      onChange={this.handleChange}
                    >
                      <option>Select</option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
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
                      style={{ height: "200px", marginBottom: "5%" }}
                    />
                  </div>
                </div>
              </div>
            </div> */}

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
                <Link to={"/payment"} className="btn btn-outline-dark">
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

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    isAuthUser: state.isAuthUser,
    error:state.error
  };
};

PaymentAdd.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {  })(PaymentAdd);



