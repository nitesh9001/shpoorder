import React from "react";
import { Link } from "react-router-dom";
import Constant from "../../Constant";
import Loader from "../../Loader";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import "react-toggle/style.css"; // for ES6 modules
import Toggle from "react-toggle";
import $ from "jquery";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
class CustomizedList extends React.Component {
  state = {
    product_list_data: [
      {
        id: 1,
        name: "Tag ",
        description: `quality watchmaking craftsmanship, `,
        price: "125KD",
        sku: "ED1420",
        model: "1858 Automatic",
        reference: "MB119904",
        functions: "Hours, Minutes",
        material: "Stainless Steel",
        dimensions: "400mm Diameter, 11.07mm Thickness",
        crystal: "Sapphire",
        caseback: "Stainless Steel with Mont Blanc Mountain Engraving",
        dial: "Black",
      },
    ],
  };
  deleteAttributeValue = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this !",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        var that = this;
        var data = new URLSearchParams();
        // this.setState({ isSaving: true });
        data.append("ProductId", id);
        fetch(Constant.getAPI() + "/product/delete", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
          body: data,
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (json) {
            if (json.status === true) {
              Swal.fire("Deleted!", "Product deleted.", "success");
              that.getProductList();
            } else {
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
      }
    });
  };
  getProductList = () => {
    var that = this;
    var data = new URLSearchParams();
    this.setState({ isSaving: true });
    if (localStorage.getItem("superadminad_role") === "shop") {
      data.append("ShopId", localStorage.getItem("superadminad_uid"));
    }
    fetch(Constant.getAPI() + "/product/get", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
      },
      body: data,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          var products = [];
          for (var i = 0; i < json.result.length; i++) {
            var obj = json.result[i];
            if (json.result[i].Shop !== null) {
              obj.Shop_name = json.result[i].Shop.name;
            } else {
              obj.Shop_name = "-";
            }
            products.push(obj);
          }
          that.setState({ product_list: products, isSaving: false });
          // that.setState({ product_list: json.result, isSaving: false });
        } else {
          that.setState({ product_list: [], isSaving: false });
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
    // this.getProductList();
  }
  handleStatusChange = (sid) => {
    var isChecked = $("#product_status_" + sid);
    isChecked.prop("checked", !isChecked.prop("checked"));
    console.log(isChecked.prop("checked"), !isChecked.prop("checked"));
    if (!isChecked.prop("checked") === true) {
      var status = true;
    } else {
      var status = false;
    }
    var that = this;
    var data = new URLSearchParams();
    // this.setState({ isSaving: true });
    data.append("status", status);
    data.append("ProductId", sid);
    fetch(Constant.getAPI() + "/product/statusChange", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
      },
      body: data,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          Swal.fire("Update Status!", "Status has been updated.", "success");
          that.getProductList();
        } else {
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
  render() {
    const columns = [
      {
        name: "productMedia",
        label: "Image",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (productMedia, tableMeta) => {
            return (
              <img
                src={
                  productMedia !== undefined &&
                  productMedia !== null &&
                  productMedia !== {}
                    ? productMedia.url
                    : "./assets/images/icon.png"
                }
                className="img-fluid img-40"
                alt="tbl"
              />
            );
          },
        },
      },
      {
        name: "name",
        label: "Product Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "price",
        label: "Price",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "sku",
        label: "SKU",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "dimensions",
        label: "Dimensions",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "dial",
        label: "Dial",
        options: {
          filter: true,
          sort: true,
        },
        // }, {
        //   name: "Shop_name",
        //   label: "Product Deliverd By",
        //   options: {
        //     filter: true,
        //     sort: true,
        // customBodyRender: (Shop_name, tableMeta) => {
        //   return <div>
        //     {
        //       Shop.name !== null
        //         ?
        //         Shop.name
        //         :
        //         "-"
        //     }
        //   </div >
        // }
        // }
        // }, {
        // name: "Category",
        // label: "Product Category",
        // options: {
        //   filter: false,
        //   sort: false,
        //   customBodyRender: (Category, tableMeta) => {
        //     return <div>
        //       {
        //         Category !== null
        //           ?
        //           Category.name
        //           :
        //           "-"
        //       }
        //     </div >
        //   }
        //   }
        // }, {
        //   name: "Attributes",
        //   label: "Product Attributes",
        //   options: {
        //     filter: false,
        //     sort: false,
        //     customBodyRender: (Attributes, tableMeta) => {
        //       return <div>
        //         {
        //           Attributes !== null && Attributes !== [] && Attributes.length > 0
        //             ?
        //             <ol>
        //               {
        //                 Attributes.map(product_attr =>
        //                   <li key={product_attr.id}>{product_attr.name}</li>
        //                 )
        //               }
        //             </ol>
        //             :
        //             "-"
        //         }
        //       </div >
        //     }
        //   }
      },
      {
        name: "status",
        label: "Status",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (status, tableMeta) => {
            return (
              <Toggle
                id={"product_status_" + tableMeta.rowData[6]}
                checked={status === true ? true : false}
                value={status}
                onChange={this.handleStatusChange.bind(
                  this,
                  tableMeta.rowData[6]
                )}
              />
            );
          },
        },
      },
      {
        name: "id",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (id, tableMeta) => {
            return (
              <div>
                <Link
                  to={"/customized/add/" + id}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-20 icofont icofont-ui-edit text-custom"></i>
                </Link>
                {/* <Link to={"/products/gallery/" + id}
              className="m-r-15 text-muted"
              data-toggle="tooltip"
              data-placement="top" title=""
              data-original-title="Product Gallery">
              <i className="f-20 icofont icofont-picture text-primary"></i>
            </Link>
            {
              localStorage.getItem('superadminad_role') === "shop"
                ?
                <Link to={"/products/stock/" + id}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top" title=""
                  data-original-title="Product Stock Details">
                  <i className="f-20 icofont icofont-stock-mobile text-warning"></i>
                </Link>
                :
                null
            } */}
                <span
                  onClick={this.deleteAttributeValue.bind(this, id)}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Delete"
                >
                  <i className="f-20 icofont icofont-delete-alt text-danger"></i>{" "}
                </span>
              </div>
            );
          },
        },
      },
    ];
    const options = {
         filterType: "dropdown",
      viewColumns: false,
      print: false,
      rowsPerPage: 25,
      rowsPerPageOptions: [10, 20, 25],
      download: false,
      selectableRows: "none",
      textLabels: {
        body: {
          noMatch: this.state.isSaving
            ? "Loading data..!"
            : "Sorry, No Product Found",
          toolTip: "Sort",
          columnHeaderTooltip: (column) => `Sort for ${column.label}`,
        },
      },
    };
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Customized Product List</h4>
                    </div>
                  </div>
                  {localStorage.getItem("superadminad_role") === "shop" ? (
                    <div className="f-right">
                      <Link
                        to="/products/add"
                        className="btn btn-sm btn-inverse waves-effect waves-light d-inline-block md-trigger"
                        data-modal="modal-13"
                      >
                        {" "}
                        <i className="icofont icofont-plus m-r-5"></i> Add
                        Product{" "}
                      </Link>

                      <Link
                        to="/"
                        className="btn btn-sm btn-outline-dark waves-effect waves-light d-inline-block md-trigger ml-3"
                        data-modal="modal-13"
                      >
                        {" "}
                        <i className="icofont icofont-arrow-left m-r-5"></i>{" "}
                        Back{" "}
                      </Link>
                    </div>
                  ) : null}
                </div>
                <div className="col-lg-4">
                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="feather icon-home"></i>{" "}
                        </Link>
                      </li>
                      <li className="breadcrumb-item active"> Customized Product List</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="page-body">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-block">
                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                          title={"Customized Product List"}
                          className="table-responsive"
                          data={this.state.product_list_data}
                          columns={columns}
                          options={options}
                        />
                        </MuiThemeProvider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomizedList;
