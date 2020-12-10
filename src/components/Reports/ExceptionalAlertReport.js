import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";

import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";import { Tooltip, Button } from "@material-ui/core";

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
class ExceptionalAlertReport extends Component {
  state = {
    open: false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    orders_list: [
      {
        id: 1,
        customer_id: "c-id1",
        orderId: "o-id-1",
        emailId: "online@gmail.com",
        phoneNo: "914xxxxx0",
      },
    ],
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
        label: (
          <>
            <Checkbox
              color="primary"
              checked={this.state.hideOld}
              type="checkbox"
              onChange={this.selectall}
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </>
        ),
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
        name: "customer_id",
        label: "Customer Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "orderId",
        label: "Order Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "orderId",
        label: "Order Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "emailId",
        label: "Email Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      // {
      //   name: "orderItemSKU",
      //   label: "Order Item SKU",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender:(orderItemSKU,tabelMeta)=>{
      //       return orderItemSKU.map((d,i)=>{
      //         return <li map={i} >{d}</li>
      //       })
      //     }
      //   },
      // },{
      //   name: "orderDescription",
      //   label: "Order Description",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender:(orderDescription,tabelMeta)=>{
      //       return orderDescription.map((d,i)=>{
      //         return <li map={i} >{d}</li>
      //       })
      //     }
      //   },
      // },
      {
        name: "phoneNo",
        label: "Phone No.",
        options: {
          filter: true,
          sort: true,
        },
      },
      //{
      //   name: "deliveryPersonId",
      //   label: "Delivery Person Id",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },{
      //   name: "deliveryPincode",
      //   label: "Delivery Pincode ",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },{
      //   name: "orderDeliveryAddress",
      //   label: "Order Delivery Address",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender:(orderDeliveryAddress,tabelMeta)=>{
      //           return <div style={{width:'120px',overflow:'scroll'}}> {orderDeliveryAddress}</div>
      //       }
      //   },
      // },{
      //   name: "price_ptc",
      //   label: "Price(PTC)",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender:(price_ptc,tabelMeta)=>{
      //       return price_ptc.map((d,i)=>{
      //         return <li map={i} >{d}</li>
      //       })
      //     }
      //   },
      // },{
      //   name: "totalPrice",
      //   label: "Order Total Price",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender:(totalPrice,tabelMeta)=>{
      //         return <li>{totalPrice} INR</li>
      //     }
      //   },
      // },{
      //   name: "modeofPayment",
      //   label: "Mode Of Payment",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },{
      //   name: "statusOfPayment",
      //   label: "Status Of Payment",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },{
      //   name: "orderStatus",
      //   label: "Order Status",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },{
      //   name: "customerFeedbackAny",
      //   label: "Customer Feedback if Any",
      //   options: {
      //     filter: true,
      //     sort: false,

      //   },
      // }
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
            : "Sorry, No data Found",
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
                      <h4>Exceptional Alert Report</h4>
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
                        Exceptional Alert Report
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
                        {/* <Link
                          to="/importData"
                          className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          Import
                        </Link> */}
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
                          title={"Exceptional Alert Report"}
                          className="table-responsive"
                          data={this.state.orders_list}
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

export default ExceptionalAlertReport;
