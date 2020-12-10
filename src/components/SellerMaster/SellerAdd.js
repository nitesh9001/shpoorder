import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../Constant";
import ReactQuill from "react-quill";
import Loader from "../../Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class SellerAdd extends React.Component {
  state = {
    status: "Active",
    description: "",
  };
  onHandleDescriptionChange = (value) => {
    this.setState({ description: value });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.seller_id !== this.props.seller_id) {
      this.setState({ seller_id: this.props.seller_id });
      this.getCategoryDetails();
    }
    if (prevProps.language_id !== this.props.language_id) {
      if (this.props.seller_id !== undefined) {
        this.setState({ seller_id: this.props.seller_id });
        this.getCategoryDetails();
      }
      // this.getCategoryList();
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getCategoryList = () => {
    var that = this;

    this.setState({ isLoading: true });
    var data = {
      sellerID: this.props.seller_id,
      lCode: this.props.language_id,
    };
    fetch(Constant.getAPI() + "/category/describe", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      // body: data
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          that.setState({ category_list: json.result, isLoading: false });
        } else {
          that.setState({ isLoading: false, category_list: [] });
          console.log(json);
        }
      });
  };
  getCategoryDetails = () => {
    var that = this;
    this.setState({ isLoading: true });
    var data = {
      lCode: that.props.language_id,
      sellerID: that.props.seller_id,
    };
    fetch(Constant.getAPI() + "/category/describe", {
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
            seller_data: json.data,
            name: json.data.name,
            description: json.data.description,
            image: json.data.Medium.url,
            MediaId: json.data.mediumId,
            status: json.data.status,
            isNewLanguage: false,
            isLoading: false,
          });
        } else {
          that.setState({
            isLoading: false,
            name: "",
            seller_data: {},
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
    // Swal.fire("Added !", "Category has been Added", "success");
    // window.location.href = "#/category"
    if (that.state.accepted) {
      that.uploadMedia();
    } else {
      if (that.props.seller_id !== undefined) {
        if (that.state.isNewLanguage === true) {
          that.addCategoryIOtherLanguage(that.state.MediaId);
        } else {
          that.updateCategoryData(that.state.MediaId);
        }
      } else {
        that.addCategory(that.state.MediaId);
      }
    }
  };
  uploadMedia = () => {
    var that = this;
    var form = $("#categoryImage")[0];
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
          if (that.props.seller_id !== undefined) {
            that.updateCategoryData(json.data[0].id);
          } else {
            that.addCategory(json.data[0].id);
          }
        } else {
          // that.setState({ seller_data: [] });
          console.log(json.error);
        }
      });
  };
  updateCategoryData = (mediumId) => {
    var that = this;

    this.setState({ isSaving: true });
    var data = {
      sellerID: that.props.seller_id,
      lCode: that.props.language_id,
      name: that.state.name,
      description: that.state.description,
      status: that.state.status,
      mediumId: mediumId,
    };

    fetch(Constant.getAPI() + "/category/edit", {
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
          Swal.fire("Updated !", "Category has been Updated", "success");
          window.location.href = "#/category";
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
  addCategoryIOtherLanguage = (mediumId) => {
    var that = this;
    // var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      payload: {
        sellerID: that.props.seller_id,
        lCode: that.props.language_id,
        name: that.state.name,
        description: that.state.description,
        status: that.state.status,
        mediumId: mediumId,
      },
    };

    fetch(Constant.getAPI() + "/category/edit", {
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
          Swal.fire("Added !", "Category has been updated", "success");
          window.location.href = "#/category";
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
  addCategory = (mediumId) => {
    var that = this;
    // var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      lCode: that.props.language_id,
      name: that.state.name,
      description: that.state.description,
      status: that.state.status,
      mediumId: mediumId,
    };

    fetch(Constant.getAPI() + "/category/add", {
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
          Swal.fire("Added !", "category has been Added", "success");
          window.location.href = "#/category";
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
    document.getElementById("category_image_label").innerHTML = "";
    let element = $("#category_image").get(0);
    // $("#id_image_section").empty();
    this.setState({ accepted: element });
    var proof_img = [];
    let obj = {};
    console.log(element.files);
    this.setState({ category_image: element.files });
    for (var i = 0; i < element.files.length; i++) {
      var file1 = element.files[i];
      var img = document.createElement("img");
      img.className = "img-100";
      var filePath = URL.createObjectURL(file1);
      img.src = filePath;
      $("#category_image_label").append(img);
    }
  };
  componentDidMount() {
    // this.getCategoryList();
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
            <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Type</label>
                  <div className="col-sm-9">
                    <select
                      name="type"
                      className="form-control"
                      value={this.state.type}
                      onChange={this.handleChange}
                    >
                    <option value=''>
                    Select Type
                      </option>
                     <option value=''>
                      Distributor
                      </option>
                      <option value=''>
                        Seller
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Seller ID
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="sellerId"
                      placeholder="Seller ID"
                      onChange={this.handleChange}
                      value={this.state.sellerId}
                    />
                  </div>
                </div>
              </div>         
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Business Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Business Name"
                      onChange={this.handleChange}
                      value={this.state.name}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Contact Person
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="contactPerson"
                      placeholder="Contact Person"
                      onChange={this.handleChange}
                      value={this.state.contactPerson}
                    />
                  </div>
                </div>
              </div>
           
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Mobile Number
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="mobile"
                      placeholder="Mobile Number"
                      onChange={this.handleChange}
                      value={this.state.mobile}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Contact Number
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="contactNumber"
                      placeholder="Contact Number"
                      onChange={this.handleChange}
                      value={this.state.contactNumber}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      onChange={this.handleChange}
                      value={this.state.email}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Address line 1</label>
                  <div className="col-sm-9">
                    <textarea
                      rows={3}
                      // cols={}
                      className="form-control"
                      onChange={this.handleChange}
                      name="address1"
                      placeholder="Address line 1"
                      value={this.state.address1}
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Location
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      placeholder="Location"
                      onChange={this.handleChange}
                      value={this.state.location}
                    />
                  </div>
                </div>
              </div>
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
                    GST Details
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="gstDetails"
                      placeholder="GST Details"
                      onChange={this.handleChange}
                      value={this.state.gstDetails}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Partner Since
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="partnerScince"
                      placeholder="Partner Since"
                      onChange={this.handleChange}
                      value={this.state.partnerScince}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  
                </div>
              </div>
              {/* <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Parent Category</label>
                    <div className="col-sm-9">
                      <select name="sellerID" className="form-control" value={this.state.sellerID} onChange={this.handleChange}>
                        <option value="0">Select Parent Category</option>
                        {
                          this.state.category_list !== undefined && this.state.category_list !== null && this.state.category_list !== [] && this.state.category_list.length > 0
                            ?
                            this.state.category_list.map(brands =>
                              <option key={brands.id} value={brands.id}>{brands.name}</option>
                            )
                            :
                            null
                        }
                      </select>
                    </div>
                  </div>
              </div> */}
              <div className="col-md-4 mb-2">
                <div id="category_image_label" className="pt-2">
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
                <Link to={"/seller"} className="btn btn-outline-dark">
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

SellerAdd.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {  })(SellerAdd);


