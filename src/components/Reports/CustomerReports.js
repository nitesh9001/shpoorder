import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  FormGroup,
  FormLabel,
  Tooltip,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
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
class CustomerReport extends Component {
  state = {
    open: false,
    isLoading: false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    totalAmountofOrderFilter: false,
    noOfQuantitiesFilter: false,
    deliveryChargeFilter: false,
    totalQuantityFilter: false,
    dateOfCompletionFilter: false,
    setDateWise: null,
    Userss_data: [
      {
        id: "1",
        userName: "Jhon_Doe45",
        email: "johndoe@gmail.com",
        mobileNumber: "0000000456",
        firstName: "John",
        lastName: "Doe",
        customerId: "CU-455",
        deviceIp: "198.162.22.48",
        firstLogin: "12/1/2020 11:13:00",
        lastLogin: "12/1/2020 11:13:00",
        timeStamp: "11:13",
        customerType: "Registered",
        deviceToken: "0x0b8823aec3460e1724e795cba45d22e8...af8c09f971d0dabc",
        deviceType: "Mobile",
      },
    ],
  };
  componentDidMount() {
    var startDate = "20/11/2020";
    var endDate = "1/11/2020";
    var arrStartDate = startDate.split("/");
    var date1 = new Date(arrStartDate[2], arrStartDate[1], arrStartDate[0]);
    var arrEndDate = endDate.split("/");
    var date2 = new Date(arrEndDate[2], arrEndDate[1], arrEndDate[0]);
    if (date2 < date1) {
      console.log("End Date must be greater than start date");
    } else {
      console.log("End Date must be gre");
    }
  }
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
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableHeadCell: {
          root: {
            width: "auto",
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

  xhrRequest = (url, filterList) => {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        const data = this.state.CustomerReports;
      }, 2000);
    });
  };

  handleFilterSubmit = (applyFilters) => {
    this.setState({
      isLoading: true,
      CustomerReports: this.state.CustomerReports,
    });
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
        name: "userName",
        label: "User Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "firstName",
        label: "First Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "lastName",
        label: "Last Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "email",
        label: "Email",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "mobileNumber",
        label: "Contact",
        options: {
          filter: true,
          sort: true,
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
        name: "deviceIp",
        label: "Device IP",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "firstLogin",
        label: "First Login",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "lastLogin",
        label: "Last Login",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "timeStamp",
        label: "Time Stamp",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "customerType",
        label: "Customer Type",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "deviceToken",
        label: "Device Token",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (deviceToken, tableMeta) => {
            return (
              <div
                style={{
                  width: "80px",
                  height: "100%",
                  whiteSpace: "initial",
                  wordWrap: "break-word",
                }}
              >
                {deviceToken}
              </div>
            );
          },
        },
      },
      {
        name: "deviceType",
        label: "Device Type",
        options: {
          filter: true,
          sort: true,
        },
      },

      // {
      //   name: "View Articles",
      //   label: "Article",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (guest, tableMeta) => {
      //       return (
      //         <Link to="/users/article">
      //           {" "}
      //           <div className="btn btn-sm btn-dark">Save Article</div>
      //         </Link>
      //       );
      //     },
      //   },
      // },

      //   {
      //     name: "id",
      //     label: "Action",
      //     options: {
      //       filter: false,
      //       sort: false,
      //       customBodyRender: (id, tableMeta) => {
      //         return (
      //           <div>
      //             <Link
      //               to={"/users-customer/add/" + id}
      //               className="m-r-15 text-muted"
      //               data-toggle="tooltip"
      //               data-placement="top"
      //               title=""
      //               data-original-title="Edit"
      //             >
      //               <i className="f-20 icofont icofont-ui-edit text-custom"></i>
      //             </Link>
      //             {/* <span
      //               onClick={this.deleteCategory.bind(this, id)}
      //               className="m-r-15 text-muted"
      //               data-toggle="tooltip"
      //               data-placement="top"
      //               title=""
      //               data-original-title="Delete"
      //             >
      //               <i className="f-20 icofont icofont-delete-alt text-danger"></i>{" "}
      //             </span> */}
      //           </div>
      //         );
      //       },
      //     },
      //   },
    ];
    const options = {
       filterType: "dropdown",
      viewColumns: false,
      print: false,
      rowsPerPage: 25,
      rowsPerPageOptions: [10, 20, 25],
      selectableRows: false,
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

      print: false,
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
    // const handleRowClick =
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Customer Report</h4>
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
                        Customer Report
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-block">
                    <div className="row">
                      <div className="col-sm-6">
                        <label className="my-3" style={{ height: "40px" }}>
                          Date of Completion :
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
                          title={"Customer Report"}
                          className="table-responsive"
                          data={this.state.Userss_data}
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
    );
  }
}

export default CustomerReport;
