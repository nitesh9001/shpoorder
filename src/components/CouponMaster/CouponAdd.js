import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../Constant";
// import ReactQuill from "react-quill";
import Loader from "../../Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class CouponAdd extends React.Component {
  state = {
    status: "Active",
    description: "",
  };
  onHandleDescriptionChange = (value) => {
    this.setState({ description: value });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.category_id !== this.props.category_id) {
      this.setState({ category_id: this.props.category_id });
      this.getCategoryDetails();
    }
    if (prevProps.language_id !== this.props.language_id) {
      if (this.props.category_id !== undefined) {
        this.setState({ category_id: this.props.category_id });
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
      categoryId: this.props.category_id,
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
      categoryId: that.props.category_id,
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
            category_data: json.data,
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
            category_data: {},
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
      if (that.props.category_id !== undefined) {
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
          if (that.props.category_id !== undefined) {
            that.updateCategoryData(json.data[0].id);
          } else {
            that.addCategory(json.data[0].id);
          }
        } else {
          // that.setState({ category_data: [] });
          console.log(json.error);
        }
      });
  };
  updateCategoryData = (mediumId) => {
    var that = this;

    this.setState({ isSaving: true });
    var data = {
      categoryId: that.props.category_id,
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
        categoryId: that.props.category_id,
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
                  <label className="col-sm-3 col-form-label">
                  Coupon Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="couponName"
                      placeholder=""
                      onChange={this.handleChange}
                      value={this.state.couponName}
                    />
                  </div>
                </div>
              </div>
            <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Description</label>
                  <div className="col-sm-9">
                    <textarea
                      rows={3}
                      // cols={}
                      className="form-control"
                      onChange={this.handleChange}
                      name="description"
                      id="description"
                      placeholder="Description"
                      value={this.state.description}
                    />
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
            <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Coupon Category</label>
                  <div className="col-sm-9">
                    <select
                      name="couponCategory"
                      className="form-control"
                      value={this.state.couponCategory}
                      onChange={this.handleChange}
                    >
                      <option>
                        --Select couponCategory--
                      </option>
                      <option>
                      Loading..
                      </option>
                    </select>
                  </div>
                </div>
              </div>
           
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Coupon Code</label>
                  <div className="col-sm-9">
                    <select
                      name="couponCode"
                      className="form-control"
                      value={this.state.couponCode}
                      onChange={this.handleChange}
                    >
                      <option>
                        --Select Coupon Code--
                      </option>
                      <option>
                        Loading..
                      </option>
                    </select>
                  </div>
                </div>
              </div>
           
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Valid From
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="date"
                      className="form-control"
                      name="validFrom"
                      placeholder="Valid From"
                      onChange={this.handleChange}
                      value={this.state.validFrom}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Valid To
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="date"
                      className="form-control"
                      name="validTo"
                      placeholder="Valid To"
                      onChange={this.handleChange}
                      value={this.state.validTo}
                    />
                  </div>
                </div>
              </div>
             
               <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Max. Users
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="maxUsers"
                      placeholder="Max Users"
                      onChange={this.handleChange}
                      value={this.state.maxUsers}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Seller ID</label>
                  <div className="col-sm-9">
                    <select
                      name="sellerId"
                      className="form-control"
                      value={this.state.sellerId}
                      onChange={this.handleChange}
                    >
                      <option>
                        --Select seller Id--
                      </option>
                      <option>
                      Loading..
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Pincode Applicable For</label>
                  <div className="col-sm-9">
                    <select
                      name="pincode"
                      className="form-control"
                      value={this.state.pincdoe}
                      onChange={this.handleChange}
                    >
                      <option>
                        --Select Pincode--
                      </option>
                      <option>
                      Loading..
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Min. Amount of Purchase
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="minAmountOfPurchase"
                      placeholder="Min. Amount of Purchase"
                      onChange={this.handleChange}
                      value={this.state.minAmountOfPurchase}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Max. Amount of Purchase
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="maxAmountOfPurchase"
                      placeholder="Max. Amount of Purchase"
                      onChange={this.handleChange}
                      value={this.state.maxAmountOfPurchase}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Min. Discount Amount
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="minDiscount Amount"
                      placeholder="Min. Discount Amount"
                      onChange={this.handleChange}
                      value={this.state.minDiscountAmount}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Max. Discount Amount
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="maxDiscount Amount"
                      placeholder="Max. Discount Amount"
                      onChange={this.handleChange}
                      value={this.state.maxDiscountAmount}
                    />
                  </div>
                </div>
              </div>
             
              {/* <div sclassName="col-md-6">
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
                <Link to={"/coupon-master"} className="btn btn-outline-dark">
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

CouponAdd.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {  })(CouponAdd);

