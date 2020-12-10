import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";import {
  FormGroup,
  FormLabel,
  Tooltip,
  Button,
  Select,
  FormControl,
  InputLabel
} from "@material-ui/core";

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

class DeliveryBoyManage extends React.Component {
  state = {
    open: false,
    isLoading:false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    editable: false,
    editableName: false,
    dateOfOrderFilter:false,
    setDateWise:null,
    orders_list: [
      {
        id: 1,
        customerId: "c-id1",
        customerName: "Joe",
        orderId: "o-id-1",
        dateofOrder: "2020-11-07",
        assignDeliveryPersonName: "Rahul Deep",
        assignDeliveryPersonId: "RWWE123394",
        pincodeforDilvery: "226001",
        orderDeliveryAddress: "Charbhag ,Lucknow",
        modeofPayment: "Cash",
      },
    ],
  };
  componentWillMount() {
    // this.getOrdersList();
  }
  getOrdersList = () => {
    var that = this;
    var data = new URLSearchParams();
    this.setState({ isSaving: true });
    fetch(Constant.getAPI() + "/order/adminList", {
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
          var orders = [];
          for (var i = 0; i < json.data.length; i++) {
            var order_obj = json.data[i];
            var total_orders = 0;
            var completed_orders = 0;
            // for (var j = 0; j < json.data[i].OrderShops.length; j++) {
            //   total_orders =
            //     json.data[i].OrderShops[j].OrderStocks.length + total_orders;
            //   if (json.data[i].OrderShops[j].status === "Delivered") {
            //     completed_orders =
            //       json.result[i].OrderShops[j].OrderStocks.length +
            //       completed_orders;
            //   } else {
            //     completed_orders = completed_orders;
            //   }
            // }
            order_obj.complete_status = completed_orders + " / " + total_orders;
            if (completed_orders === total_orders) {
              order_obj.complete = true;
            } else {
              order_obj.complete = false;
            }
            orders.push(order_obj);
          }
          that.setState({ orders_list: orders, isSaving: false });
        } else {
          that.setState({ orders_list: [], isSaving: false });
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
    });openModel = () => {
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
          },
        },
      },
      {
        name: "customerId",
        label: "Customer Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "customerName",
        label: "Customer Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "orderId",
        label: "Order ID",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "dateofOrder",
        label: "Date Of Order",
        options: {
          filter: false,
          sort: true,
          filterType: "custom",
          customBodyRender:(dateOfOrder, tableMeta)=>{
            return <div style={{width:'90px',}}>{dateOfOrder}</div>
          },
          customFilterListOptions: {
            render: (v) => {
              if (v[0] && v[1] && this.state.dateofOrderFilter) {
                return [`Min: ${v[0]}`, `Max: ${v[1]}`];
              } else if (v[0] && v[1] && !this.state.dateofOrderFilter) {
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
            logic(dateofOrder, filters) {
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
                return dateofOrder < filters[0] || dateofOrder > filters[1];
              } else if (filters[0]) {
                return dateofOrder < filters[0];
              } else if (filters[1]) {
                return dateofOrder > filters[1];
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel style={{ fontSize: "12px" }}>
                  Date Of Order
                </FormLabel>
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
        name: "assignDeliveryPersonName",
        label: "Assign Delivery Person Name",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (assignDeliveryPersonName, tableMeta) => {
            return (
              <>
                {!this.state.editableName ? (
                  <input
                    value={assignDeliveryPersonName}
                    disabled
                    name="assginDeliverPersonName"
                  />
                ) : (
                  <select
                    name="assignDeliveryPersonName"
                    value={assignDeliveryPersonName}
                    onChange={(e) => {
                      this.setState({
                        editableName: false,
                      });
                    }}
                  >
                    <option value={assignDeliveryPersonName}>
                      {assignDeliveryPersonName}
                    </option>
                    <option value="Delivery1">Delivery boy 2</option>
                    <option value="Delivery1">Delivery boy 3</option>
                    <option value="Delivery1">Delivery boy 4</option>
                    <option value="Delivery1">Delivery boy 5</option>
                  </select>
                )}
                <i
                  className="icofont icofont-edit"
                  onClick={() => {
                    this.setState({
                      editableName: true,
                    });
                  }}
                ></i>
              </>
            );
          },
        },
      },
      {
        name: "assignDeliveryPersonId",
        label: "Assign Delivery Person Id",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (assignDeliveryPersonName, tableMeta) => {
            return (
              <>
                {!this.state.editable ? (
                  <input
                    value={assignDeliveryPersonName}
                    disabled
                    name="assginDeliverPersonName"
                  />
                ) : (
                  <select
                    name="assignDeliveryPersonName"
                    value={assignDeliveryPersonName}
                    onChange={(e) => {
                      this.setState({
                        editable: false,
                      });
                    }}
                  >
                    <option value="Delivery1">Delivery boy 1</option>
                    <option value="Delivery1">Delivery boy 2</option>
                    <option value="Delivery1">Delivery boy 3</option>
                    <option value="Delivery1">Delivery boy 4</option>
                    <option value="Delivery1">Delivery boy 5</option>
                  </select>
                )}
                <i
                  className="icofont icofont-edit"
                  onClick={() => {
                    this.setState({
                      editable: true,
                    });
                  }}
                ></i>
              </>
            );
          },
        },
      },
      {
        name: "pincodeforDilvery",
        label: "Pincode For Delivery",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "orderDeliveryAddress",
        label: "Order Delivery Address",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "modeofPayment",
        label: "Mode of Payment",
        options: {
          filter: true,
          sort: true,
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
                      <h4>Delivery Boy Assign</h4>
                    </div>
                  </div>
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
                        Delivery Boy Assign
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
                    <div className="row">
                      <div className="col-sm-6">
                        <label className="my-3" style={{ height: "40px" }}>
                          Date :
                        </label>
                        <FormControl
                          variant="outlined"
                          className="col-sm-3 mx-1"
                        >
                          <InputLabel htmlFor="outlined-age-native-simple">
                            Time Peroid
                          </InputLabel>
                          <Select
                            native
                            name="dateFilter"
                            value={this.state.dateFilter}
                            onChange={(val) =>
                                this.handlePeriodChange(val.target.value)
                              }
                              // const dateFilter = this.state.dateFilter;
                              // this.handleDateFilter.bind(this,this.state.dateFilter);
                            //}}
                            label="Time Peroid"
                            className="my-2"
                            style={{ height: "40px" }}
                            inputProps={{
                              name: "Time Peroid",
                              id: "outlined-age-native-simple",
                            }}
                          >
                            <option aria-label="None" value={null} />
                            <option value={0}>Today</option>
                            <option value={1}>Yesterday</option>
                            <option value={7}>This week </option>
                            <option value={30}>This Month</option>
                            <option value={60}>Last Month</option>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-sm-6">
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
                    </div>

                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                          title={"Delivery Boy Assign"}
                          className="table-responsive"
                          data={this.state.orders_list}
                          columns={columns}
                          options={options}
                        />
                        <AlertDialog
                          open={this.state.open}
                          func={this.handleClose}
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
const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    isAuthUser: state.isAuthUser,
    error: state.error,
  };
};

DeliveryBoyManage.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {})(DeliveryBoyManage);
