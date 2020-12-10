import React from "react";
import { Link } from "react-router-dom";
import Constant from "../../Constant";
import Loader from "../../Loader";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import "react-toggle/style.css"; // for ES6 modules
import Toggle from "react-toggle";
import $ from "jquery";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchProductList } from "../../store/index";
import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  FormGroup,
  FormLabel,
  Tooltip,
  TextField,
  Select,
  Button,
} from "@material-ui/core";
import axios from "axios";
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

class ProductList extends React.Component {
  state = {
    open: false,
    formVisvile: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    hidedownload: false,
    checked: false,
    ptcFilter: false,
    ptdFilter: false,
    priceFilter: false,
    expiryFilter: false,
    mininumQuantityCustomerFilter: false,
    setDateWise: null,
    // product_list_data: [
    //   {
    //     id: 1,
    //     link: "kkj.com",
    //     name: "Tag ",
    //     shortDescription: `To guarantee the m.`,
    //     longDescription: ` it is necessary to service it.`,
    //     mrp: "125",
    //     sku: "1420",
    //     ptd: "1858",
    //     ptc: "1858",
    //     cgst: "8",
    //     igst: "9",
    //     sgst: "17",
    //     unit: "5",
    //     attribute: "400 L",
    //     category: "Oil",
    //     subCategory: "Ghee",
    //     brand: "fortune",
    //     totalAttribute: "50",
    //     availableAttribute: "45",
    //     attributeTitle: "--",
    //     mininumQuantityCustomer: "5",
    //     expiry: `2020-09-10`,
    //     keyWord: `'new'
    //     'pure'
    //     'qulaity'`,
    //   },
    // ],
  };
  deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to edit Price !",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No ",
    }).then((result) => {
      if (result.value) {
        this.setState({
          formVisvile: true,
        });
        //   var that = this;
        //   var data = {
        //     productId: id,
        //   };
        //   // this.setState({ isSaving: true });
        //   fetch(Constant.getAPI() + `/products/delete`, {
        //     method: "post",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
        //     },
        //     body: JSON.stringify(data),
        //   })
        //     .then(function (response) {
        //       return response.json();
        //     })
        //     .then(function (json) {
        //       if (json.status === true) {
        //         Swal.fire("Deleted!", "Product deleted.", "success");
        //         that.getProductList();
        //       } else {
        //         Swal.fire({
        //           title: "Something went wrong. Try again after some Time.!",
        //           icon: "error",
        //           text: "",
        //           confirmButtonColor: "#3085d6",
        //           cancelButtonColor: "#d33",
        //           confirmButtonText: "Ok",
        //         });
        //       }
        //     });
      }
    });
  };
  componentWillMount() {
    this.getProductList();
  }
  getProductList() {
    this.props.fetchProductList()
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
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableHeadCell: {
          root: {
            width: "auto",
            fontWeight: "bold",
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
    let filterList = applyFilters;
    console.log("applied");
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  };
  render() {
    const columnSeller = [
      {
        name: "id",
        label: "Select",
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
        name: "name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "sku",
        label: "sku",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "shortDescription",
        label: "Short Desc.",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "longDescription",
        label: "Long Desc.",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "keyWord",
        label: "Key Word",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "category",
        label: "Category",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "subCategory",
        label: "Sub Category",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "brand",
        label: "Brand",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "totalAttribute",
        label: "Total Attribute",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "availableAttribute",
        label: "Available Attribute",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "attributeTitle",
        label: "Attribute Title",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "mininumQuantityCustomer",
        label: "Mininum Quantity Customer",
        options: {
          filter: true,
          sort: true,
          filterType: "custom",
          customFilterListOptions: {
            render: (v) => {
              if (v[0] && v[1] && this.state.mininumQuantityCustomerFilter) {
                return [`Min: ${v[0]}`, `Max: ${v[1]}`];
              } else if (
                v[0] &&
                v[1] &&
                !this.state.mininumQuantityCustomerFilter
              ) {
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
            logic(mininumQuantityCustomer, filters) {
              if (filters[0] && filters[1]) {
                return (
                  mininumQuantityCustomer < filters[0] ||
                  mininumQuantityCustomer > filters[1]
                );
              } else if (filters[0]) {
                return mininumQuantityCustomer < filters[0];
              } else if (filters[1]) {
                return mininumQuantityCustomer > filters[1];
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel style={{ fontSize: "12px" }}>
                  Mininum Quantity Customer
                </FormLabel>
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
          customBodyRender: (mininumQuantityCustomer, tableMeta) => {
            return (
              <div
                style={{
                  width: "auto",
                  height: "100%",
                  whiteSpace: "initial",
                  wordWrap: "break-word",
                }}
              >
                {mininumQuantityCustomer}
              </div>
            );
          },
        },
      },
      {
        name: "unit",
        label: "Unit",
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
      },

      {
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
      },
      {
        name: "expiry",
        label: "Expiry Date",
        options: {
          filter: true,
          sort: true,
          filterType: "custom",
          customBodyRender: (expiry, tableMeta) => {
            return <div style={{ width: "90px" }}>{expiry}</div>;
          },
          customFilterListOptions: {
            render: (v) => {
              if (v[0] && v[1] && this.state.expiryFilter) {
                return [`Min: ${v[0]}`, `Max: ${v[1]}`];
              } else if (v[0] && v[1] && !this.state.expiryFilter) {
                return `Min: ${v[0]}, Max: ${v[1]}`;
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
            logic(expiry, filters) {
              if (filters[0] && filters[1]) {
                // console.log(dateOfCompletion,filters)
                //   var compDate = dateOfCompletion
                //   var startDate = filters[0];
                //   var endDate = filters[1];
                //   var arrCompDate =compDate.split('/');
                //   var dateComp = new Date(arrCompDate[2], arrCompDate[1], arrCompDate[0]);
                //   var arrStartDate = startDate.split('/');
                //  var date1 = new Date(arrStartDate[2], arrStartDate[1], arrStartDate[0]);
                //  var arrEndDate = endDate.split('/');
                //  var date2 = new Date(arrEndDate[2], arrEndDate[1], arrEndDate[0])
                return expiry < filters[0] || expiry > filters[1];
              } else if (filters[0]) {
                return expiry < filters[0];
              } else if (filters[1]) {
                return expiry > filters[1];
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel style={{ fontSize: "12px" }}>Expiry</FormLabel>
                <FormGroup row>
                  <Select
                    name={filterList[index][0] || ""}
                    value={this.state.setDateWise}
                    onChange={(event) => {
                      filterList[index][0] = event.target.value;
                      this.setState({
                        setDateWise: filterList[index][0],
                      });
                      var date = new Date();
                      var datto =
                        date.getFullYear() +
                        "-" +
                        (date.getMonth() + 1) +
                        "-" +
                        date.getDate();
                      var dattoCom = filterList[index][0];
                      date.setDate(date.getDate() - dattoCom);
                      var finalDate =
                        date.getFullYear() +
                        "-" +
                        (date.getMonth() + 1) +
                        "-" +
                        date.getDate();
                      filterList[index][1] = datto;
                      filterList[index][0] = finalDate;
                      console.log(datto, finalDate);
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: "45%", margin: "5%" }}
                  >
                    <option value={null}>All</option>
                    <option value={7}>Last 7 days</option>
                    <option value={15}>Last 15 days</option>
                    <option value={30}>Last 30 days</option>
                    <option value={60}>Last 60 days</option>
                  </Select>
                  {/* <TextField
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
                  /> */}
                </FormGroup>
              </div>
            ),
          },
        },
      },
      {
        name: "id",
        label: "Edit Price",
        options: {
          filter: false,
          sort: true,
          customBodyRender: (id, tableMeta) => {
            return (
              <div>
                <Link
                  to={"/products/add/" + id}
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
    const columns = [
      {
        name: "id",
        label: "Select",
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
        name: "name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "sku",
        label: "sku",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "shortDescription",
        label: "Short Desc.",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "longDescription",
        label: "Long Desc.",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "keyWord",
        label: "Key Word",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "category",
        label: "Category",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "subCategory",
        label: "Sub Category",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "brand",
        label: "Brand",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "totalAttribute",
        label: "Total Attribute",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "availableAttribute",
        label: "Available Attribute",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "attributeTitle",
        label: "Attribute Title",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "mininumQuantityCustomer",
        label: "Mininum Quantity Customer",
        options: {
          filter: true,
          sort: true,
          filterType: "custom",
          customFilterListOptions: {
            render: (v) => {
              if (v[0] && v[1] && this.state.mininumQuantityCustomerFilter) {
                return [`Min: ${v[0]}`, `Max: ${v[1]}`];
              } else if (
                v[0] &&
                v[1] &&
                !this.state.mininumQuantityCustomerFilter
              ) {
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
            logic(mininumQuantityCustomer, filters) {
              if (filters[0] && filters[1]) {
                return (
                  mininumQuantityCustomer < filters[0] ||
                  mininumQuantityCustomer > filters[1]
                );
              } else if (filters[0]) {
                return mininumQuantityCustomer < filters[0];
              } else if (filters[1]) {
                return mininumQuantityCustomer > filters[1];
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel style={{ fontSize: "12px" }}>
                  Mininum Quantity Customer
                </FormLabel>
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
          customBodyRender: (mininumQuantityCustomer, tableMeta) => {
            return (
              <div
                style={{
                  width: "auto",
                  height: "100%",
                  whiteSpace: "initial",
                  wordWrap: "break-word",
                }}
              >
                {mininumQuantityCustomer}
              </div>
            );
          },
        },
      },
      {
        name: "unit",
        label: "Unit",
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
      },

      {
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
      },
      {
        name: "expiry",
        label: "Expiry Date",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "link",
        label: "Media Link",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Media, tableMeta) => {
            return (
              <div>
                {
                  <img
                    src={
                      Media !== undefined && Media !== null && Media !== ""
                        ? Media[0]
                          ? Media[0].url
                          : "./assets/images/icon.png"
                        : "./assets/images/icon.png"
                    }
                    alt="medialink"
                    className="img-40"
                    onError={this.imgLoadError}
                  />
                }
              </div>
            );
          },
        },
      },
      {
        name: "link",
        label: "Media 1",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Media, tableMeta) => {
            return (
              <div>
                {
                  <img
                    src={
                      Media !== undefined && Media !== null && Media !== ""
                        ? Media[0]
                          ? Media[0].url
                          : "./assets/images/icon.png"
                        : "./assets/images/icon.png"
                    }
                    alt="medialink"
                    className="img-40"
                    onError={this.imgLoadError}
                  />
                }
              </div>
            );
          },
        },
      },
      {
        name: "link",
        label: "Media 2",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Media, tableMeta) => {
            return (
              <div>
                {
                  <img
                    src={
                      Media !== undefined && Media !== null && Media !== ""
                        ? Media[0]
                          ? Media[0].url
                          : "./assets/images/icon.png"
                        : "./assets/images/icon.png"
                    }
                    alt="medialink"
                    className="img-40"
                    onError={this.imgLoadError}
                  />
                }
              </div>
            );
          },
        },
      },
      {
        name: "link",
        label: "Media 3",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Media, tableMeta) => {
            return (
              <div>
                {
                  <img
                    src={
                      Media !== undefined && Media !== null && Media !== ""
                        ? Media[0]
                          ? Media[0].url
                          : "./assets/images/icon.png"
                        : "./assets/images/icon.png"
                    }
                    alt="medialink"
                    className="img-40"
                    onError={this.imgLoadError}
                  />
                }
              </div>
            );
          },
        },
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
                  to={"/products/add/" + id}
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
                {/* <span
                  onClick={this.deleteProduct.bind(this, id)}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Delete"
                >
                  <i className="f-20 icofont icofont-delete-alt text-danger"></i>{" "}
                </span> */}
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
      confirmFilters: this.state.isLoading,
      customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
        return (
          <div style={{ marginTop: "40px" }}>
            <Button
              variant="contained"
              onClick={() => alert("Filter Applied !")}
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
      selectableRows: false,
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
                      <h4>Product List</h4>
                    </div>
                  </div>
                  {/* {localStorage.getItem("superadminad_role") === "shop" ? ( */}
                  <div className="f-right">
                    {/* <Link
                      to="/"
                      className="btn btn-sm btn-outline-dark waves-effect waves-light d-inline-block md-trigger ml-3"
                      data-modal="modal-13"
                    >
                      {" "}
                      <i className="icofont icofont-arrow-left m-r-5"></i> Back{" "}
                    </Link> */}
                  </div>
                  {/* ) : null} */}
                </div>
                <div className="col-lg-4">
                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="feather icon-home"></i>{" "}
                        </Link>
                      </li>
                      <li className="breadcrumb-item active">Product List</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {this.props.loginData.user.role !== "admin" ? (
              this.props.loginData.user.role === "seller" ? (
                <div className="page-body">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="card">
                        <div className="card-block">
                          <div className="col">
                            {/* <Link
                              to="/products/add"
                              className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                              data-modal="modal-13"
                            >
                              {" "}
                              <i className="icofont icofont-plus m-r-5"></i> Add
                              Product{" "}
                            </Link> */}

                            {/* <button
                              className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                              data-modal="modal-13"
                            >
                              Import
                            </button> */}
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
                            )}
                          </div>
                          <div className="dt-responsive table-responsive">
                            <MuiThemeProvider theme={this.getMuiTheme()}>
                              <MUIDataTable
                                title={"Product List"}
                                className="table-responsive"
                                data={this.props.product_list}
                                columns={columnSeller}
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
              ) : null
            ) : (
              <div className="page-body">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="card">
                      <div className="card-block">
                        <div className="col">
                          <Link
                            to="/products/add"
                            className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                            data-modal="modal-13"
                          >
                            {" "}
                            <i className="icofont icofont-plus m-r-5"></i> Add
                            Product{" "}
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
                          )}
                        </div>
                        <div className="dt-responsive table-responsive">
                          <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                              title={"Product List"}
                              className="table-responsive"
                              data={this.props.product_list}
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
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product_list: state.product.product_list,
    loginData: state.login,
  };
};
ProductList.propTypes = {
  fetchProductList: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { fetchProductList })(ProductList);
