import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../Constant";
// import ReactQuill from "react-quill";
import Loader from "../../Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class HomeAdd extends React.Component {
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
                  <label className="col-sm-3 col-form-label">Pincode</label>
                  <div className="col-sm-9">
                    <select
                      name="pincode"
                      className="form-control"
                      value={this.state.pincode}
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
                  <label className="col-sm-3 col-form-label">Seller ID</label>
                  <div className="col-sm-9">
                    <select
                      name="sellerId"
                      className="form-control"
                      value={this.state.sellerId}
                      onChange={this.handleChange}
                    >
                      <option>
                        --Select Seller--
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
                  Banner 1 Id
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="banner1id"
                      placeholder="Banner 1 Id"
                      onChange={this.handleChange}
                      value={this.state.banner1id}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Banner 2 Id
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="banner2id"
                      placeholder="Banner 2 Id"
                      onChange={this.handleChange}
                      value={this.state.banner2id}
                    />
                  </div>
                </div>
              </div>
              
              {/* <div className="col-md-6">
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
              </div> */}
              <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-3">Most popular Categories Product 1 Image</div>
                  <div className="col-sm-9">
                    <form
                      id="image1"
                      name="image1"
                      encType="multipart/form-data"
                      className="text-capitalize"
                    >
                      <div className="form-group">
                        
                        <input
                          accept="image/*"
                          onChange={this.handleImageUpload}
                          id="image1"
                          type="file"
                          className="form-control"
                          autoComplete="off"
                          name="files"
                        />
                        <span className="mt-1">( 500 x 500 )</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Most popular Categories Product 1 Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="product1Name"
                      placeholder="Most popular Categories Product 1 Name"
                      onChange={this.handleChange}
                      value={this.state.product1Name}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Most popular Categories Product 1 Attribute
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="product1Attribute"
                      placeholder="Most popular Categories Product 1 Attribute"
                      onChange={this.handleChange}
                      value={this.state.product1Attribute}
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-3">Most popular Categories Product 2 Image</div>
                  <div className="col-sm-9">
                    <form
                      id="image2"
                      name="image2"
                      encType="multipart/form-data"
                      className="text-capitalize"
                    >
                      <div className="form-group">
                        
                        <input
                          accept="image/*"
                          onChange={this.handleImageUpload}
                          id="image2"
                          type="file"
                          className="form-control"
                          autoComplete="off"
                          name="files"
                        />
                        <span className="mt-1">( 500 x 500 )</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Most popular Categories Product 2 Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="product2Name"
                      placeholder="Most popular Categories Product 2 Name"
                      onChange={this.handleChange}
                      value={this.state.product2Name}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Most popular Categories Product 2 Attribute
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="product2Attribute"
                      placeholder="Most popular Categories Product 2 Attribute"
                      onChange={this.handleChange}
                      value={this.state.product2Attribute}
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-3">Most popular Categories Product 3 Image</div>
                  <div className="col-sm-9">
                    <form
                      id="image3"
                      name="image3"
                      encType="multipart/form-data"
                      className="text-capitalize"
                    >
                      <div className="form-group">
                        
                        <input
                          accept="image/*"
                          onChange={this.handleImageUpload}
                          id="image3"
                          type="file"
                          className="form-control"
                          autoComplete="off"
                          name="files"
                        />
                        <span className="mt-1">( 500 x 500 )</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Most popular Categories Product 3 Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="product3Name"
                      placeholder="Most popular Categories Product 3 Name"
                      onChange={this.handleChange}
                      value={this.state.product3Name}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Most popular Categories Product 3 Attribute
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="product3Attribute"
                      placeholder="Most popular Categories Product 3 Attribute"
                      onChange={this.handleChange}
                      value={this.state.product3Attribute}
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-3">Most popular Categories Product 4 Image</div>
                  <div className="col-sm-9">
                    <form
                      id="image4"
                      name="image4"
                      encType="multipart/form-data"
                      className="text-capitalize"
                    >
                      <div className="form-group">
                        
                        <input
                          accept="image/*"
                          onChange={this.handleImageUpload}
                          id="image4"
                          type="file"
                          className="form-control"
                          autoComplete="off"
                          name="files"
                        />
                        <span className="mt-1">( 500 x 500 )</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Most popular Categories Product 4 Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="product4Name"
                      placeholder="Most popular Categories Product 4 Name"
                      onChange={this.handleChange}
                      value={this.state.product4Name}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Most popular Categories Product 4 Attribute
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="product4Attribute"
                      placeholder="Most popular Categories Product 4 Attribute"
                      onChange={this.handleChange}
                      value={this.state.product4Attribute}
                    />
                  </div>
                </div>
              </div>
              

              <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-3">Today's Deal Product 1 Image</div>
                  <div className="col-sm-9">
                    <form
                      id="dealimage1"
                      name="dealimage1"
                      encType="multipart/form-data"
                      className="text-capitalize"
                    >
                      <div className="form-group">
                        
                        <input
                          accept="image/*"
                          onChange={this.handleImageUpload}
                          id="dealimage1"
                          type="file"
                          className="form-control"
                          autoComplete="off"
                          name="files"
                        />
                        <span className="mt-1">( 500 x 500 )</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Today's Deal Product 1 Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="dealproduct1Name"
                      placeholder="Today's Deal Product 1 Name"
                      onChange={this.handleChange}
                      value={this.state.dealproduct1Name}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Today's Deal Product 1 Attribute
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="dealproduct1Attribute"
                      placeholder="Today's Deal Product 1 Attribute"
                      onChange={this.handleChange}
                      value={this.state.dealproduct1Attribute}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Today's Deal Product 1 Price
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="dealproduct1price"
                      placeholder="Today's Deal Product 1 Price"
                      onChange={this.handleChange}
                      value={this.state.dealproduct1price}
                    />
                  </div>
                </div>
              </div>
               
              <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-3">Today's Deal Product 2 Image</div>
                  <div className="col-sm-9">
                    <form
                      id="dealimage2"
                      name="dealimage2"
                      encType="multipart/form-data"
                      className="text-capitalize"
                    >
                      <div className="form-group">
                        
                        <input
                          accept="image/*"
                          onChange={this.handleImageUpload}
                          id="dealimage2"
                          type="file"
                          className="form-control"
                          autoComplete="off"
                          name="files"
                        />
                        <span className="mt-1">( 500 x 500 )</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Today's Deal Product 2 Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="dealproduct2Name"
                      placeholder="Today's Deal Product 2 Name"
                      onChange={this.handleChange}
                      value={this.state.dealproduct2Name}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Today's Deal Product 2 Attribute
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="dealproduct2Attribute"
                      placeholder="Today's Deal Product 2 Attribute"
                      onChange={this.handleChange}
                      value={this.state.dealproduct2Attribute}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Today's Deal Product 2 Price
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="dealproduct2price"
                      placeholder="Today's Deal Product 2 Price"
                      onChange={this.handleChange}
                      value={this.state.dealproduct2price}
                    />
                  </div>
                </div>
              </div>
               
              <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-3">Today's Deal Product 3 Image</div>
                  <div className="col-sm-9">
                    <form
                      id="dealimage3"
                      name="dealimage3"
                      encType="multipart/form-data"
                      className="text-capitalize"
                    >
                      <div className="form-group">
                        
                        <input
                          accept="image/*"
                          onChange={this.handleImageUpload}
                          id="dealimage3"
                          type="file"
                          className="form-control"
                          autoComplete="off"
                          name="files"
                        />
                        <span className="mt-1">( 500 x 500 )</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Today's Deal Product 3 Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="dealproduct3Name"
                      placeholder="Today's Deal Product 3 Name"
                      onChange={this.handleChange}
                      value={this.state.dealproduct3Name}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Today's Deal Product 3 Attribute
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="dealproduct3Attribute"
                      placeholder="Today's Deal Product 3 Attribute"
                      onChange={this.handleChange}
                      value={this.state.dealproduct3Attribute}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Today's Deal Product 3 Price
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="dealproduct3price"
                      placeholder="Today's Deal Product 3 Price"
                      onChange={this.handleChange}
                      value={this.state.dealproduct3price}
                    />
                  </div>
                </div>
              </div>
               
              <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-3">Today's Deal Product 4 Image</div>
                  <div className="col-sm-9">
                    <form
                      id="dealimage1"
                      name="dealimage4"
                      encType="multipart/form-data"
                      className="text-capitalize"
                    >
                      <div className="form-group">
                        
                        <input
                          accept="image/*"
                          onChange={this.handleImageUpload}
                          id="dealimage4"
                          type="file"
                          className="form-control"
                          autoComplete="off"
                          name="files"
                        />
                        <span className="mt-1">( 500 x 500 )</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Today's Deal Product 4 Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="dealproduct4Name"
                      placeholder="Today's Deal Product 4 Name"
                      onChange={this.handleChange}
                      value={this.state.dealproduct4Name}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Today's Deal Product 4 Attribute
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="dealproduct4Attribute"
                      placeholder="Today's Deal Product 4 Attribute"
                      onChange={this.handleChange}
                      value={this.state.dealproduct4Attribute}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Today's Deal Product 4 Price
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="dealproduct4price"
                      placeholder="Today's Deal Product 4 Price"
                      onChange={this.handleChange}
                      value={this.state.dealproduct4price}
                    />
                  </div>
                </div>
              </div>
               
              <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-3">Today's Deal Product 5 Image</div>
                  <div className="col-sm-9">
                    <form
                      id="dealimage5"
                      name="dealimage5"
                      encType="multipart/form-data"
                      className="text-capitalize"
                    >
                      <div className="form-group">
                        
                        <input
                          accept="image/*"
                          onChange={this.handleImageUpload}
                          id="dealimage5"
                          type="file"
                          className="form-control"
                          autoComplete="off"
                          name="files"
                        />
                        <span className="mt-1">( 500 x 500 )</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Today's Deal Product 5 Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="dealproduct5Name"
                      placeholder="Today's Deal Product 5 Name"
                      onChange={this.handleChange}
                      value={this.state.dealproduct5Name}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Today's Deal Product 5 Attribute
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="dealproduct5Attribute"
                      placeholder="Today's Deal Product 5 Attribute"
                      onChange={this.handleChange}
                      value={this.state.dealproduct5Attribute}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Today's Deal Product 5 Price
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="dealproduct1price"
                      placeholder="Today's Deal Product 1 Price"
                      onChange={this.handleChange}
                      value={this.state.dealproduct1price}
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
                <Link to={"/home-master"} className="btn btn-outline-dark">
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

HomeAdd.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {  })(HomeAdd);

