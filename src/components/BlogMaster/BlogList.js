import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Constant from "../../Constant";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";

class BlogList extends React.Component {
  state = {
    brand_data_list: [
      {
        id: "1",
        name_en: "Article One",
        likes: "352",
        comments: "34",
      },
    ],
  };
  handleStatusChange = (sid) => {
    var isChecked = $("#tyre_category_" + sid);
    isChecked.prop("checked", !isChecked.prop("checked"));
    console.log(isChecked.prop("checked"), !isChecked.prop("checked"));
    if (!isChecked.prop("checked") === true) {
      var status = "active";
    } else {
      var status = "inactive";
    }
    let newArray = this.state.tyre_category_list;
    var a = newArray.find((element) => {
      return element.id === sid;
    });
    a.status = status;
    console.log(newArray);
    this.setState({ tyre_category_list: newArray });
    Swal.fire("Update Status!", "Status has been updated.", "success");
  };
  deleteBlog = (id) => {
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
        data.append("CategoryId", id);
        fetch(Constant.getAPI() + "/category/delete", {
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
              Swal.fire("Deleted!", "Tyre Category deleted.", "success");
              that.getBrandList();
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
  getBrandList = () => {
    var that = this;
    this.setState({ isSaving: true });
    var data = new URLSearchParams();
    if (localStorage.getItem("superadminad_role") === "shop") {
      data.append("ShopId", localStorage.getItem("superadminad_uid"));
    }
    fetch(Constant.getAPI() + "/category/get", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          that.setState({ category_data: json.result, isSaving: false });
        } else {
          that.setState({ category_data: [], isSaving: false });
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
    this.getBrandList();
  }
  render() {
    const columns = [
      {
        name: "Medium",
        label: "Article Image",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Medium, tableMeta) => {
            return (
              <div>
                {Medium !== undefined && Medium !== null && Medium !== {} ? (
                  <img
                    src={
                      Medium.url !== undefined &&
                      Medium.url !== null &&
                      Medium.url !== ""
                        ? Medium.url
                        : "./assets/images/icon.png"
                    }
                    alt=""
                    className="img-40"
                  />
                ) : (
                  <img
                    src="./assets/images/icon.png"
                    alt=""
                    className="img-40"
                  />
                )}
              </div>
            );
          },
        },
      },
      
      {
        name: "name_en",
        label: "Article name",
        options: {
          filter: true,
          sort: true,
        },
        // }, {
        //   name: "name_ar",
        //   label: "Category Name : Arabic",
        //   options: {
        //     filter: true,
        //     sort: true
        //   }
        // }, {
        //   name: "child",
        //   label: "Child Category",
        //   options: {
        //     filter: true,
        //     sort: true,
        //     customBodyRender: (child, tableMeta) => {
        //       return <div>
        //         {
        //           child !== null && child !== [] && child.length > 0
        //             ?
        //             <ol>
        //               {
        //                 child.map(child_category =>
        //                   <li key={child_category.id}>{child_category.name}</li>
        //                 )
        //               }
        //             </ol>
        //             :
        //             "-"
        //         }
        //       </div>
        //     }
        //   }
      },
      {
        name: "likes",
        label: "likes",
        options: {
          filter: true,
          sort: true,
        },
        // }, {
        //   name: "name_ar",
        //   label: "Category Name : Arabic",
        //   options: {
        //     filter: true,
        //     sort: true
        //   }
        // }, {
        //   name: "child",
        //   label: "Child Category",
        //   options: {
        //     filter: true,
        //     sort: true,
        //     customBodyRender: (child, tableMeta) => {
        //       return <div>
        //         {
        //           child !== null && child !== [] && child.length > 0
        //             ?
        //             <ol>
        //               {
        //                 child.map(child_category =>
        //                   <li key={child_category.id}>{child_category.name}</li>
        //                 )
        //               }
        //             </ol>
        //             :
        //             "-"
        //         }
        //       </div>
        //     }
        //   }
      },
      {
        name: "comments",
        label: "Comments",
        options: {
          filter: true,
          sort: true,
        },
        // }, {
        //   name: "name_ar",
        //   label: "Category Name : Arabic",
        //   options: {
        //     filter: true,
        //     sort: true
        //   }
        // }, {
        //   name: "child",
        //   label: "Child Category",
        //   options: {
        //     filter: true,
        //     sort: true,
        //     customBodyRender: (child, tableMeta) => {
        //       return <div>
        //         {
        //           child !== null && child !== [] && child.length > 0
        //             ?
        //             <ol>
        //               {
        //                 child.map(child_category =>
        //                   <li key={child_category.id}>{child_category.name}</li>
        //                 )
        //               }
        //             </ol>
        //             :
        //             "-"
        //         }
        //       </div>
        //     }
        //   }
      },

      {
        name: "view comments",
        label: "View Comments",

          options: {
            filter: true,
            sort: true,
            customBodyRender: (child, tableMeta) => {
              return <Link to="/blog-comments" className="btn btn-dark btn-sm">
               View Comments
              </Link>
            }
          }
      },
      {
        name: "id",
        label: "Action",
        options: {
          filter: false,
          sort: true,
          customBodyRender: (id, tableMeta) => {
            return (
              <div>
              
                <Link
                  to={"/blog/add/" + id}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-20 icofont icofont-ui-edit text-custom"></i>
                </Link>
                <span
                  onClick={this.deleteBlog.bind(this, id)}
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
            : "Sorry, No Data Found",
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
                      <h4>Article List</h4>
                    </div>
                  </div>
                  {/* {localStorage.getItem('superadminad_role') !== "shop"
                    ? */}
                  <Link
                    to="/blog/add"
                    className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                    data-modal="modal-13"
                  >
                    {" "}
                    <i className="icofont icofont-plus m-r-5"></i> Add Article{" "}
                  </Link>
                  {/* :
                  } */}
                  <Link
                    to="/"
                    className="btn btn-sm btn-outline-dark waves-effect waves-light f-right d-inline-block md-trigger mx-3"
                    data-modal="modal-13"
                  >
                    {" "}
                    <i className="icofont icofont-arrow-left m-r-5"></i> Back{" "}
                  </Link>
                </div>
                <div className="col-lg-4">
                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="feather icon-home"></i>{" "}
                        </Link>
                      </li>
                      <li className="breadcrumb-item active">Article List</li>
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
                        <MUIDataTable
                          title={"Article List"}
                          className="table-responsive"
                          data={this.state.brand_data_list}
                          columns={columns}
                          options={options}
                        />
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

export default BlogList;
