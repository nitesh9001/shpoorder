import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Constant from "../../Constant";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import Toggle from "react-toggle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormLabel,
  Tooltip,
  TextField,
  Select,
  Button,FormGroup} from "@material-ui/core";

import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
class Checkbox extends React.Component {
  static defaultProps = {
    checked: false,
  };
  render() {
    return (
      <input
        type={this.props.type}
        name={this.props.name}
        checked={this.props.checked}
        onChange={this.props.onChange}
      />
    );
  }
}

class SellerProductCatalogueList extends React.Component {
  state = {
    open: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    hidedownload:false,
    downdata: [],
    checked: false,
    ptcFilter: false,
    ptdFilter: false,
    priceFilter: false,
    deliverychargeFilter: false,
    seller_list: [
      {
        id: 1,
        sku: "110011",
        sellerid: "Ahm38002712345",
        mrp: "450",
        ptc: "400",
        ptd:'350',
        sgst:'9',
        cgst:'9',
        igst:'18',
        inventory:'30',
        thresold:'20',
        singleOrdermaxQty:'10',
        deliverycharge:'30',
        deliverytime:'2 days'
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
      status = "inactive";
    }
    let newArray = this.state.tyre_seller_list;
    var a = newArray.find((element) => {
      return element.id === sid;
    });
    a.status = status;
    console.log(newArray);
    this.setState({ tyre_seller_list: newArray });
    Swal.fire("Update Status!", "Status has been updated.", "success");
  };
  deleteCategory = (id) => {
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
        var data = {
          categoryId: id,
        };
        // this.setState({ isSaving: true });

        fetch(Constant.getAPI() + "/category/delete", {
          method: "POST",
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
              Swal.fire("Deleted!", "Tyre Category deleted.", "success");
              that.getSellerProductCatalogueList();
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
  getSellerProductCatalogueList = () => {
    var that = this;
    this.setState({ isSaving: true });
    // var data = {
    //   lCode:"en"
    // }
    fetch(Constant.getAPI() + "/category/list", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
      },
      // body: JSON.stringify(data)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          that.setState({ seller_list: json.data, isSaving: false });
        } else {
          that.setState({ seller_list: [], isSaving: false });
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
    // this.getSellerProductCatalogueList();
  }
  imgLoadError = (event) => {
    event.target.src = "./assets/images/icon.png";
  };
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableHeadCell: {
          root: {
            width: "auto",
            fontWeight:'bold',
            whiteSpace: "initial",
            wordWrap: "break-word",
          },
        },
        MUIDataTableBodyCell: {
          root: {
            width: "auto",
            whiteSpace: "initial",
            wordWrap: "break-word",
          },
        },
      },
    }); 
  openModel = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  selectall = (e) => {
    this.setState({
      hidedownload: !this.state.hidedownload,
      checkedItems: new Map(),
      hideOld: !this.state.hideOld,
    });
  };
  selctSingle = (e, id) => {
    // this.setState({
    //   hidedownload:!this.state.hidedownload,
    //   check:id,
    //   // [e.trget.id]: e.target.value
    // })
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState((prevState) => ({
      hidedownload: !this.state.hidedownload,
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
    // this.props.categoryData.data.forEach(d => {
    //   this.setState({
    //   check : !this.state.check
    // })
    // })
  };

      handleChange = (e, id) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState((prevState) => ({
      hidedownload: !this.state.hidedownload,
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
    console.log(this.state.checkedItems);
    let newArray = this.props.categoryData.data.filter((d) => {
      // console.log(d)
      let searchValue = d.id;
      return searchValue.indexOf(item) !== -1;
    });
    console.log(newArray);
    this.setState({
      downdata: [...this.state.downdata, newArray],
    });
    console.log(this.state.downdata);
  };
handleFilterSubmit = (applyFilters) => {
    // let filterList = applyFilters;
    console.log("applied");
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  };
  render() {
    const columns = [
      {
        name: "id",
        label: 'Select',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (id, tableMeta) => {
            return !this.state.hideOld ? (
              <Checkbox
                name={id}
                checked={this.state.checkedItems.get(id) || false}
                onChange={this.handleChange}
                type="checkbox"
              />
            ) : (
              <Checkbox
                color="primary"
                checked={true}
                type="checkbox"
                onChange={this.selectall}
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            );
            //  <input type="checkbox" name="check" id={id} value={id}  onChange={this.selctSingle.bind(this,id)} checked={this.state.checked}/> */}
            // <Checkbox
            //   color="primary"
            //   id={'ch'+id}
            //   data-id={id}
            //   onChange={this.selctSingle.bind(this,id)}
            //   checked= {this.state.check === id ? true : false }
            //   value={this.state.check ? true: false }
            //   inputProps={{ "aria-label": "secondary checkbox" }}
            // />
          },
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
        name: "mrp",
        label: "MRP",
        options: {
          filter: true,
          sort: true,
          filterType: "custom",
          customFilterListOptions: {
            render: (v) => {
              if (v[0] && v[1] && this.state.priceFilter) {
                return [`Min: ${v[0]}`, `Max: ${v[1]}`];
              } else if (v[0] && v[1] && !this.state.priceFilter) {
                return `Min: ${v[0]}, Max: ${v[1]}`;
              } else if (v[0]) {
                return `Min: ${v[0]}`;
              } else if (v[1]) {
                return `Max: ${v[1]}`;
              }
              return [];
            },
            update: (filterList, filterPos, index) => {
              console.log(
                "customFilterListOnDelete: ",
                filterList,
                filterPos,
                index
              );

              if (filterPos === 0) {
                filterList[index].splice(filterPos, 1, "");
              } else if (filterPos === 1) {
                filterList[index].splice(filterPos, 1);
              } else if (filterPos === -1) {
                filterList[index] = [];
              }

              return filterList;
            },
          },
          filterOptions: {
            logic(age, filters) {
              if (filters[0] && filters[1]) {
                return age < filters[0] || age > filters[1];
              } else if (filters[0]) {
                return age < filters[0];
              } else if (filters[1]) {
                return age > filters[1];
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel style={{ fontSize: "12px" }}>MRP</FormLabel>
                <FormGroup row>
                  <TextField
                    label="min"
                    value={filterList[index][0] || ""}
                    onChange={(event) => {
                      filterList[index][0] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: "45%", marginRight: "5%" }}
                  />
                  <TextField
                    label="max"
                    value={filterList[index][1] || ""}
                    onChange={(event) => {
                      filterList[index][1] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: "45%" }}
                  />
                </FormGroup>
              </div>
            ),
          },
          customBodyRender: (mrp, tableMeta) => {
            return (
              <div
                style={{
                  width: "auto",
                  height: "100%",
                  whiteSpace: "initial",
                  wordWrap: "break-word",
                }}
              >
                {mrp}
              </div>
            );
          },
        },
      },

      {
        name: "ptc",
        label: "PTC",
        options: {
          filter: false,
          sort: false,
          filterType: "custom",
          customFilterListOptions: {
            render: (v) => {
              if (v[0] && v[1] && this.state.ptcFilter) {
                return [`Min: ${v[0]}`, `Max: ${v[1]}`];
              } else if (v[0] && v[1] && !this.state.ptcFilter) {
                return `Min: ${v[0]}, Max: ${v[1]}`;
              } else if (v[0]) {
                return `Min: ${v[0]}`;
              } else if (v[1]) {
                return `Max: ${v[1]}`;
              }
              return [];
            },
            update: (filterList, filterPos, index) => {
              console.log(
                "customFilterListOnDelete: ",
                filterList,
                filterPos,
                index
              );

              if (filterPos === 0) {
                filterList[index].splice(filterPos, 1, "");
              } else if (filterPos === 1) {
                filterList[index].splice(filterPos, 1);
              } else if (filterPos === -1) {
                filterList[index] = [];
              }

              return filterList;
            },
          },
          filterOptions: {
            logic(age, filters) {
              if (filters[0] && filters[1]) {
                return age < filters[0] || age > filters[1];
              } else if (filters[0]) {
                return age < filters[0];
              } else if (filters[1]) {
                return age > filters[1];
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel style={{ fontSize: "12px" }}>PTC</FormLabel>
                <FormGroup row>
                  <TextField
                    label="min"
                    value={filterList[index][0] || ""}
                    onChange={(event) => {
                      filterList[index][0] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: "45%", marginRight: "5%" }}
                  />
                  <TextField
                    label="max"
                    value={filterList[index][1] || ""}
                    onChange={(event) => {
                      filterList[index][1] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: "45%" }}
                  />
                </FormGroup>
              </div>
            ),
          },
          customBodyRender: (ptc, tableMeta) => {
            return (
              <div
                style={{
                  width: "auto",
                  height: "100%",
                  whiteSpace: "initial",
                  wordWrap: "break-word",
                }}
              >
                {ptc}
              </div>
            );
          },
        },
      },
      {
        name: "ptd",
        label: "PTD",
        options: {
          filter: true,
          sort: true,
          filterType: "custom",
          customFilterListOptions: {
            render: (v) => {
              if (v[0] && v[1] && this.state.ptdFilter) {
                return [`Min: ${v[0]}`, `Max: ${v[1]}`];
              } else if (v[0] && v[1] && !this.state.ptdFilter) {
                return `Min: ${v[0]}, Max: ${v[1]}`;
              } else if (v[0]) {
                return `Min: ${v[0]}`;
              } else if (v[1]) {
                return `Max: ${v[1]}`;
              }
              return [];
            },
            update: (filterList, filterPos, index) => {
              console.log(
                "customFilterListOnDelete: ",
                filterList,
                filterPos,
                index
              );

              if (filterPos === 0) {
                filterList[index].splice(filterPos, 1, "");
              } else if (filterPos === 1) {
                filterList[index].splice(filterPos, 1);
              } else if (filterPos === -1) {
                filterList[index] = [];
              }

              return filterList;
            },
          },
          filterOptions: {
            logic(ptd, filters) {
              if (filters[0] && filters[1]) {
                return ptd < filters[0] || ptd > filters[1];
              } else if (filters[0]) {
                return ptd < filters[0];
              } else if (filters[1]) {
                return ptd > filters[1];
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel style={{ fontSize: "12px" }}>PTD</FormLabel>
                <FormGroup row>
                  <TextField
                    label="min"
                    value={filterList[index][0] || ""}
                    onChange={(event) => {
                      filterList[index][0] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: "45%", marginRight: "5%" }}
                  />
                  <TextField
                    label="max"
                    value={filterList[index][1] || ""}
                    onChange={(event) => {
                      filterList[index][1] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: "45%" }}
                  />
                </FormGroup>
              </div>
            ),
          },
          customBodyRender: (ptd, tableMeta) => {
            return (
              <div
                style={{
                  width: "auto",
                  height: "100%",
                  whiteSpace: "initial",
                  wordWrap: "break-word",
                }}
              >
                {ptd}
              </div>
            );
          },
        },
      },
      {
        name: "sgst",
        label: "SGST",
        options: {
          filter: true,
          sort: true,
        },
      },{
        name: "cgst",
        label: "CGST",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "igst",
        label: "IGST",
        options: {
          filter: true,
          sort: true,
        },
      },{
        name: "inventory",
        label: "Inventory",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "thresold",
        label: "Thresold",
        options: {
          filter: true,
          sort: true,
        },
      },{
        name: "singleOrdermaxQty",
        label: "Single Order Max. Qty",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "deliverycharge",
        label: "Delivery Charge",
        options: {
          filter: true,
          sort: true,
          customFilterListOptions: {
            render: (v) => {
              if (v[0] && v[1] && this.state.deliverychargeFilter) {
                return [`Min: ${v[0]}`, `Max: ${v[1]}`];
              } else if (v[0] && v[1] && !this.state.deliverychargeFilter) {
                return `Min: ${v[0]}, Max: ${v[1]}`;
              } else if (v[0]) {
                return `Min: ${v[0]}`;
              } else if (v[1]) {
                return `Max: ${v[1]}`;
              }
              return [];
            },
            update: (filterList, filterPos, index) => {
              console.log(
                "customFilterListOnDelete: ",
                filterList,
                filterPos,
                index
              );

              if (filterPos === 0) {
                filterList[index].splice(filterPos, 1, "");
              } else if (filterPos === 1) {
                filterList[index].splice(filterPos, 1);
              } else if (filterPos === -1) {
                filterList[index] = [];
              }

              return filterList;
            },
          },
          filterOptions: {
            logic(deliverycharge, filters) {
              if (filters[0] && filters[1]) {
                return deliverycharge < filters[0] || deliverycharge > filters[1];
              } else if (filters[0]) {
                return deliverycharge < filters[0];
              } else if (filters[1]) {
                return deliverycharge > filters[1];
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel style={{ fontSize: "12px" }}>Delivery charge</FormLabel>
                <FormGroup row>
                  <TextField
                    label="min"
                    value={filterList[index][0] || ""}
                    onChange={(event) => {
                      filterList[index][0] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: "45%", marginRight: "5%" }}
                  />
                  <TextField
                    label="max"
                    value={filterList[index][1] || ""}
                    onChange={(event) => {
                      filterList[index][1] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: "45%" }}
                  />
                </FormGroup>
              </div>
            ),
          },
        },
      },{
        name: "deliverytime",
        label: "Delivery Time",
        options: {
          filter: true,
          sort: true,
        },
      },
      
      {
        name: "status",
        label: "Status",
        options: {
          filter: true,
          sort: true,
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
                  to={"/seller-product-catalogue/add/" + id}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-20 icofont icofont-ui-edit text-custom"></i>
                </Link>
              </div>
            );
          },
        },
      },
    ];

    const options = {
       filterType: "dropdown",
      viewColumns: false,
      rowsPerPage: 25,
      rowsPerPageOptions: [10, 20, 25],
      selectedRows: false,
      selectableRows: false,
      print: false,
      download: false,
      confirmFilters: this.state.isLoading,
      customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
        return (
          <div style={{ marginTop: "40px" }}>
            <Button
              variant="contained"
              onClick={() =>  alert("Filter Applied !")}
            >
              Apply Filters
            </Button>
          </div>
        );
      },
      // callback that gets executed when filters are confirmed
      onFilterConfirm: (filterList) => {
        console.log("onFilterConfirm");
        console.dir(filterList);
      },
      onFilterDialogOpen: () => {
        console.log("filter dialog opened");
      },
      onFilterDialogClose: () => {
        console.log("filter dialog closed");
      },
      onFilterChange: (column, filterList, type) => {
        if (type === "chip") {
          var newFilters = () => filterList;
          console.log("updating filters via chip");
          this.handleFilterSubmit(newFilters);
        }
      },
      textLabels: {
        body: {
          noMatch: this.state.isSaving
            ? "Loading data..!"
            : "Sorry, No Category Found",
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
                      <h4>Seller Product Catalogue</h4>
                    </div>
                  </div>
                  {/* {localStorage.getItem('superadminad_role') !== "shop"
                    ? */}
                </div>
                <div className="col-lg-4">
                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="feather icon-home"></i>{" "}
                        </Link>
                      </li>
                      <li className="breadcrumb-item active">
                        Seller Product Catalogue
                      </li>
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
                      <div className="col">
                        <Link
                          to="/seller-product-catalogue/add"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          Seller Product Catalogue{" "}
                        </Link>

                        <Link
                          to="/importData"
                          className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          Import
                        </Link>
                        {!this.state.hidedownload ? (
                          <button
                            className="f-right bg-white b-none"
                            data-modal="modal-13"
                          >
                            <Tooltip
                              title="Download"
                              aria-label="download"
                              onClick={this.openModel}
                            >
                              <i
                                className="icofont icofont-download-alt"
                                style={{
                                  fontSize: "30px",
                                  color: "grey",
                                }}
                              ></i>
                            </Tooltip>
                          </button>
                        ) : (
                          <button
                            className="f-right bg-white b-none"
                            data-modal="modal-13"
                          >
                            <Tooltip
                              title="Download Selected"
                              aria-label="download"
                              onClick={this.openModel}
                            >
                              <i
                                className="icofont icofont-download-alt"
                                style={{
                                  fontSize: "30px",
                                  color: "grey",
                                }}
                              ></i>
                            </Tooltip>
                          </button>
                        )} </div>
                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                         
                          <MUIDataTable
                          title={"Seller Product Catalogue"}
                          className="table-responsive"
                          data={this.state.seller_list}
                          columns={columns}
                          options={options}
                        />
                        </MuiThemeProvider>

                        <AlertDialog
                          open={this.state.open}
                          func={this.handleClose}
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

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    isAuthUser: state.isAuthUser,
    error: state.error,
  };
};

SellerProductCatalogueList.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {})(SellerProductCatalogueList);
