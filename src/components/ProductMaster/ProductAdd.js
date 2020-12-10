import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../Constant";
import ReactQuill from "react-quill";
import AddGalleryImage from "./AddGalleryImage";
import Select from "react-select";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class ProductAdd extends React.Component {
  state = {
    status: "Active",
    description: "",
    refund_policy: "",
    gallery: [],
    galleryURL: [],
    selected_attributes: [],
    categories: [],
    packageCategory: [
      { categoryID: "1", category: "hello" },
      { categoryID: "2", category: "hello" },
    ],
  };
  onHandleDescriptionChange = (value) => {
    this.setState({ description: value });
  };
  onHandleRefundPolicyChange = (value) => {
    this.setState({ refund_policy: value });
  };

  componentWillMount() {
    this.getAttributeList();
    this.getCategoryList();
    this.getBrandlist();
    this.getProductDetails();
    this.loadScript(
      process.env.PUBLIC_URL + "/assets/pages/filer/jquery.fileuploads.init.js"
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.product_id !== this.props.product_id) {
      this.setState({ product_id: this.props.product_id });
      this.getProductDetails();
    }
    if (prevProps.language_id !== this.props.language_id) {
      if (this.props.product_id !== undefined) {
        this.setState({ product_id: this.props.product_id });
        this.getProductDetails();
        this.getAttributeList();
        this.getCategoryList();
        this.getBrandlist();
        // this.getShopList();
      }
    }
  }
  getBrandlist = () => {
    var that = this;
    var data = {
      lCode: that.props.language_id,
    };
    fetch(Constant.getAPI() + "/brand/list", {
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
          that.setState({ brandList: json.data });
        } else {
        }
      });
  };

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

  getAttributeList = () => {
    var that = this;
    var data = {
      lCode: "en",
    };

    fetch(Constant.getAPI() + "/attributeValues/listInAttributes", {
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
          that.setState({ attribute_list: json.data });
        } else {
          that.setState({ attribute_list: [] });
          // Swal.fire({
          //   title: "Something went wrong. Try again after some Time.!",
          //   icon: 'error',
          //   text: "",
          //   confirmButtonColor: "#3085d6",
          //   cancelButtonColor: "#d33",
          //   confirmButtonText: "Ok"
          // })
        }
      });
  };
  handleImageUpload = (event) => {
    document.getElementById("banner_image_label").innerHTML = "";
    let element = $("#product_banner_image").get(0);
    // $("#id_image_section").empty();
    this.setState({ accepted: element });
    var proof_img = [];
    let obj = {};
    console.log(element.files);
    this.setState({ product_banner_image: element.files });
    for (var i = 0; i < element.files.length; i++) {
      var file1 = element.files[i];
      var img = document.createElement("img");
      img.className = "img-100";
      var filePath = URL.createObjectURL(file1);
      img.src = filePath;
      $("#banner_image_label").append(img);
    }
  };
  getProductDetails = () => {
    var that = this;
    var data = {
      productId: this.props.product_id,
      lCode: this.props.language_id,
    };
    fetch(Constant.getAPI() + "/products/describe", {
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
          console.log(json.data);
          var selected_attributes = [];
          if (
            json.data.AttributeValues !== null &&
            json.data.AttributeValues !== [] &&
            json.data.AttributeValues.length > 0
          ) {
            for (var i = 0; i < json.data.AttributeValues.length; i++) {
              selected_attributes.push(json.data.AttributeValues[i].id);
              $("#product_attributes_" + json.data.AttributeValues[i].id).prop(
                "checked",
                true
              );
            }
          }

          that.setState({
            name: json.data.name,
            description: json.data.description,
            brandId: json.data.BrandId,
            categoryId: json.data.CategoryId,
            mediaIds: json.data.gallery,
            priceExcludingDiscount: json.data.priceExcludingDiscount,
            attributeValueIds: json.data.selected_attributes,
            sku: json.data.sku,
            stock: json.data.stock,
            isFeatured: json.data.isFeatured,
            isFlatDiscount: json.data.isFlatDiscount,
            discountValue: json.data.discountValue,
          });
        } else {
          that.setState({ attribute_type_data: {} });
        }
      });
  };
  onSaveData = () => {
    var that = this;
    that.setState({ isSaving: true });

    if (that.props.product_id !== undefined) {
      that.updateProduct();
    } else {
      this.addProduct();
    }
  };
  uploadMedia = () => {
    var that = this;
    var form = $("#bannerImage")[0];
    var data = new FormData(form);
    // data.append('upload_for', 'user');
    fetch(Constant.getAPI() + "/media/add", {
      method: "post",
      body: data,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          if (that.props.product_id !== undefined) {
            that.updateProduct(json.result.mediaurl);
          } else {
            that.addProduct(json.result.mediaurl);
          }
        } else {
          // that.setState({ category_data: [] });
          console.log(json.error);
        }
      });
  };
  updateProduct = (media_url) => {
    var that = this;
    if (
      that.state.brandId === undefined ||
      that.state.brandId === null ||
      that.state.brandId === "" ||
      that.state.brandId === "0"
    ) {
      Swal.fire("Warning !", "Please Select Product brand First. !", "warning");
      that.setState({ isSaving: false });
      return false;
    }

    if (
      that.state.categoryId === undefined ||
      that.state.categoryId === null ||
      that.state.categoryId === "" ||
      that.state.categoryId === "0"
    ) {
      Swal.fire(
        "Warning !",
        "Please Select Product Category First. !",
        "warning"
      );
      that.setState({ isSaving: false });
      return false;
    }
    var data = {
      productId: this.props.product_id,
      name: that.state.name,
      description: that.state.description,
      brandId: that.state.brandId,
      categoryId: that.state.categoryId,
      mediaIds: that.state.gallery,
      priceExcludingDiscount: that.state.priceExcludingDiscount,
      lCode: that.props.language_id,
      attributeValueIds: that.state.selected_attributes,
      sku: that.state.sku,
      stock: that.state.stock,
      isFeatured: that.state.isFeatured,
      isFlatDiscount: that.state.isFlatDiscount,
      discountValue: that.state.discountValue,
    };

    fetch(Constant.getAPI() + "/products/update", {
      method: "post",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          Swal.fire("Updated !", "Product has been Updated", "success");
          window.location.href = "#/products";
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
  addProduct = () => {
    var that = this;

    this.setState({ isSaving: true });

    if (
      that.state.brandId === undefined ||
      that.state.brandId === null ||
      that.state.brandId === "" ||
      that.state.brandId === "0"
    ) {
      Swal.fire("Warning !", "Please Select Product brand First. !", "warning");
      that.setState({ isSaving: false });
      return false;
    }

    if (
      that.state.categoryId === undefined ||
      that.state.categoryId === null ||
      that.state.categoryId === "" ||
      that.state.categoryId === "0"
    ) {
      Swal.fire(
        "Warning !",
        "Please Select Product Category First. !",
        "warning"
      );
      that.setState({ isSaving: false });
      return false;
    }
    var data = {
      name: that.state.name,
      description: that.state.description,
      brandId: that.state.brandId,
      categoryId: that.state.categoryId,
      mediaIds: that.state.gallery,
      priceExcludingDiscount: that.state.priceExcludingDiscount,
      lCode: that.props.language_id,
      attributeValueIds: that.state.selected_attributes,
      sku: that.state.sku,
      stock: that.state.stock,
      isFeatured: that.state.isFeatured,
      isFlatDiscount: that.state.isFlatDiscount,
      discountValue: that.state.discountValue,
    };

    fetch(Constant.getAPI() + "/products/add", {
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
          Swal.fire("Added !", "Product has been Added", "success");
          window.location.href = "#/products";
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

  loadScript(src) {
    let script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    document.head.append(script);
  }
  changeAttributesSelection = (event) => {
    var id = event.target.value;
    let arr = this.state.selected_attributes;
    var exist = false;
    var index = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == id) {
        exist = true;
        index = i;
      }
    }

    if (exist) {
      arr.splice(index, 1);
    } else {
      arr.push(id);
    }

    console.log(arr);
    this.setState({ selected_attributes: arr });
  };
  onSelectBrand = (e) => {
    this.setState({ brandId: e.target.value });
  };
  onSelectCategory = (e) => {
    this.setState({ categoryId: e.target.value });
  };
  onSelectCategory = (e) => {
    this.setState({ categoryId: e.target.value });
  };
  uploadGalleryImage = (id, url) => {
    var data = { id: id, url: url };
    var gallery = this.state.gallery;
    var galleryURL = this.state.galleryURL;
    gallery.push(id);
    galleryURL.push(data);

    this.setState({ gallery, galleryURL });
  };
  handleSelectCat = (categories) => {
    this.setState({
      categories: categories,
      cat: Array.isArray(categories) ? categories.map((x) => x.categoryID) : [],
    });
  };

  render() {
    const { categories } = this.state;
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
    return this.props.loginData.user.role !== "admin" ? (
      this.props.loginData.user.role === "seller" ? (
        <div className="">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Name</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      disabled
                      placeholder="Name"
                      onChange={this.handleChange}
                      value={this.state.name}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">SKU</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="sku"
                      id="sku"
                      disabled
                      placeholder="SKU"
                      onChange={this.handleChange}
                      value={this.state.sku}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Category</label>
                  <div className="col-sm-9">
                    <select
                      name="categoryId"
                      disabled
                      onChange={this.handleChange}
                      value={this.state.categoryId}
                      className="form-control"
                    >
                      <option>Select Category</option>
                      {this.state.categoryList !== undefined
                        ? this.state.categoryList.map((category) => (
                            <option value={category.id}>{category.name}</option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Sub Category
                  </label>
                  <div className="col-sm-9">
                    <select
                      name="subcategoryId"
                      onChange={this.handleChange}
                      value={this.state.subcategoryId}
                      className="form-control"
                      disabled
                    >
                      <option>Select Sub-Category</option>
                      {this.state.categoryList !== undefined
                        ? this.state.categoryList.map((category) => (
                            <option value={category.id}>{category.name}</option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Brand</label>
                  <div className="col-sm-9">
                    <select
                      name="brandId"
                      disabled
                      onChange={this.handleChange}
                      value={this.state.brandId}
                      className="form-control"
                    >
                      <option>Select Brand</option>
                      {this.state.categoryList !== undefined
                        ? this.state.categoryList.map((category) => (
                            <option value={category.id}>{category.name}</option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Attributes</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="attributes"
                      disabled
                      placeholder="Attributes"
                      onChange={this.handleChange}
                      value={this.state.attributes}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Unit</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="unit"
                      disabled
                      placeholder="Unit"
                      onChange={this.handleChange}
                      value={this.state.unit}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">MRP</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="mrp"
                      placeholder="MRP(Max. Retail Price)"
                      onChange={this.handleChange}
                      value={this.state.mrp}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">PTC</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="ptc"
                      placeholder="PTC()"
                      onChange={this.handleChange}
                      value={this.state.ptc}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">PTD</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="ptd"
                      placeholder="PTD()"
                      onChange={this.handleChange}
                      value={this.state.ptd}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">SGST</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="sgst"
                      disabled
                      placeholder="SGST()"
                      onChange={this.handleChange}
                      value={this.state.sgst}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">CGST</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="cgst"
                      placeholder="CGST()"
                      disabled
                      onChange={this.handleChange}
                      value={this.state.cgst}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">IGST</label>
                  <div className="col-sm-9">
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      name="igst"
                      placeholder="IGST()"
                      onChange={this.handleChange}
                      value={this.state.igst}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Expiry Date</label>
                  <div className="col-sm-9">
                    <input
                      type="date"
                      className="form-control"
                      disabled
                      name="expirydate"
                      placeholder="Expiry Date"
                      onChange={this.handleChange}
                      value={this.state.expirydate}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Key Words</label>
                  <div className="col-sm-9">
                    <Select
                      isDisabled={true}
                      styles={customStyles}
                      isMulti={true}
                      value={categories}
                      getOptionLabel={(option) => `${option.category}`}
                      getOptionValue={(option) => `${option.categoryID}`}
                      onChange={this.handleSelectCat}
                      options={this.state.packageCategory}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Short Desc.</label>
                  <div className="col-sm-9">
                    <textarea
                      rows={3}
                      disabled
                      // cols={}
                      className="form-control"
                      onChange={this.handleChange}
                      name="shortDescription"
                      placeholder="Short Desc."
                      value={this.state.shortDescription}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Long Desc.</label>
                  <div className="col-sm-9">
                    <textarea
                      rows={3}
                      // cols={}
                      disabled
                      className="form-control"
                      onChange={this.handleChange}
                      name="longDescription"
                      placeholder="Long Desc."
                      value={this.state.longDescription}
                    />
                  </div>
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
              <Link to={"/products"} className="btn btn-outline-dark">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      ) : null
    ) : (
      <div className="">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">SKU</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="sku"
                    id="sku"
                    placeholder="SKU"
                    onChange={this.handleChange}
                    value={this.state.sku}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Category</label>
                <div className="col-sm-9">
                  <select
                    name="categoryId"
                    onChange={this.handleChange}
                    value={this.state.categoryId}
                    className="form-control"
                  >
                    <option>Select Category</option>
                    {this.state.categoryList !== undefined
                      ? this.state.categoryList.map((category) => (
                          <option value={category.id}>{category.name}</option>
                        ))
                      : ""}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Sub Category</label>
                <div className="col-sm-9">
                  <select
                    name="subcategoryId"
                    onChange={this.handleChange}
                    value={this.state.subcategoryId}
                    className="form-control"
                  >
                    <option>Select Sub-Category</option>
                    {this.state.categoryList !== undefined
                      ? this.state.categoryList.map((category) => (
                          <option value={category.id}>{category.name}</option>
                        ))
                      : ""}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Brand</label>
                <div className="col-sm-9">
                  <select
                    name="brandId"
                    onChange={this.handleChange}
                    value={this.state.brandId}
                    className="form-control"
                  >
                    <option>Select Brand</option>
                    {this.state.categoryList !== undefined
                      ? this.state.categoryList.map((category) => (
                          <option value={category.id}>{category.name}</option>
                        ))
                      : ""}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Attributes</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="attributes"
                    placeholder="Attributes"
                    onChange={this.handleChange}
                    value={this.state.attributes}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Unit</label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control"
                    name="unit"
                    placeholder="Unit"
                    onChange={this.handleChange}
                    value={this.state.unit}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">MRP</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="mrp"
                    placeholder="MRP(Max. Retail Price)"
                    onChange={this.handleChange}
                    value={this.state.mrp}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">PTC</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="ptc"
                    placeholder="PTC()"
                    onChange={this.handleChange}
                    value={this.state.ptc}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">PTD</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="ptd"
                    placeholder="PTD()"
                    onChange={this.handleChange}
                    value={this.state.ptd}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">SGST</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="sgst"
                    placeholder="SGST()"
                    onChange={this.handleChange}
                    value={this.state.sgst}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">CGST</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="cgst"
                    placeholder="CGST()"
                    onChange={this.handleChange}
                    value={this.state.cgst}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">IGST</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="igst"
                    placeholder="IGST()"
                    onChange={this.handleChange}
                    value={this.state.igst}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Expiry Date</label>
                <div className="col-sm-9">
                  <input
                    type="date"
                    className="form-control"
                    name="expirydate"
                    placeholder="Expiry Date"
                    onChange={this.handleChange}
                    value={this.state.expirydate}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Key Words</label>
                <div className="col-sm-9">
                  <Select
                    styles={customStyles}
                    isMulti={true}
                    value={categories}
                    getOptionLabel={(option) => `${option.category}`}
                    getOptionValue={(option) => `${option.categoryID}`}
                    onChange={this.handleSelectCat}
                    options={this.state.packageCategory}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Gallery</label>
                <div className="col-sm-10">
                  <div className="row">
                    <AddGalleryImage
                      uploadGalleryImage={this.uploadGalleryImage}
                    />
                    <AddGalleryImage
                      uploadGalleryImage={this.uploadGalleryImage}
                    />
                    <AddGalleryImage
                      uploadGalleryImage={this.uploadGalleryImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Short Desc.</label>
                <div className="col-sm-9">
                  <ReactQuill
                    value={this.state.description}
                    onChange={this.onHandleDescriptionChange}
                    style={{ height: "200px", marginBottom: "5%" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Long Desc.</label>
                <div className="col-sm-9">
                  <ReactQuill
                    value={this.state.description}
                    onChange={this.onHandleDescriptionChange}
                    style={{ height: "200px", marginBottom: "5%" }}
                  />
                </div>
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
            <Link to={"/products"} className="btn btn-outline-dark">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loginData: state.login,
  };
};
ProductAdd.propTypes = {
  login: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {})(ProductAdd);
