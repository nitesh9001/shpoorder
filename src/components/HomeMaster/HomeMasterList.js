import React from "react";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";import { Tooltip,Button } from "@material-ui/core";

class HomeMasterList extends React.Component {
  state = {
    open: false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    home_list: [
      {
        id: 1,
        pincode: "380001",
        seller_id: "Ahm38002712345",
        banner1_id:"Banner001",
        banner2_id:"Banner002",
        mostPoplarCategoryProduct1Name:"Chinese Manchurian",
        mostPoplarCategoryProduct1Attribute:"1 Kg",
        mostPoplarCategoryProduct2Name:"African Peri Peri",
        mostPoplarCategoryProduct2Attribute:"1 Kg",
        mostPoplarCategoryProduct3Name:"Sunflower Oil",
        mostPoplarCategoryProduct3Attribute:"1 liter",
        mostPoplarCategoryProduct4Name:"Mustard Oil",
        mostPoplarCategoryProduct4Attribute:"4 liter",
        todayDealProduct1Name:"Punjab Special Biryani 10 Kg",
        todayDealProduct1Attribute:"10 Kg",
        todayDealProduct1Price:"700",
        todayDealProduct2Name:"Biryani Special",
        todayDealProduct2Attribute:"1 Kg",
        todayDealProduct2Price:"100",
        todayDealProduct3Name:"A2 BASMATI RICE 10 KG",
        todayDealProduct3Attribute:"10 Kg",
        todayDealProduct3Price:"600",
        todayDealProduct4Name:"Punjab Special Biryani Basmati Rice",
        todayDealProduct4Attribute:"10 kg",
        todayDealProduct4Price:"1200",
        todayDealProduct5Name:"ALOE VERA NEEM HAND SANITIZER",
        todayDealProduct5Attribute:"1 liter",
        todayDealProduct5Price:"250",



      },
    ],
  };

  componentWillMount() {
    // this.getOrdersList();
  }
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
  render() {
    const columns = [
      {
        name: "pincode",
        label: "Pincode",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "seller_id",
        label: "Seller Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "banner1_id",
        label: "Banner 1 Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "banner2_id",
        label: "Banner 2 Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "mostPoplarCategoryProduct1Name",
        label: "Most Popular Category Product 1 Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "mostPoplarCategoryProduct1Attribute",
        label: "Most Popular Category Product 1 Attribute",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "mostPoplarCategoryProduct2Name",
        label: "Most Popular Category Product 2 Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "mostPoplarCategoryProduct2Attribute",
        label: "Most Popular Category Product 2 Attribute",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "mostPoplarCategoryProduct3Name",
        label: "Most Popular Category Product 3 Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "mostPoplarCategoryProduct3Attribute",
        label: "Most Popular Category Product 3 Attribute",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "mostPoplarCategoryProduct4Name",
        label: "Most Popular Category Product 4 Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "mostPoplarCategoryProduct4Attribute",
        label: "Most Popular Category Product 4 Attribute",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "todayDealProduct1Name",
        label: "Today's Deal Product 1 Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "todayDealProduct1Attribute",
        label: "Today's Deal Product 1 Attribute",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "todayDealProduct1Price",
        label: "Today's Deal Product 1 Price",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "todayDealProduct2Name",
        label: "Today's Deal Product 2 Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "todayDealProduct2Attribute",
        label: "Today's Deal Product 2 Attribute",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "todayDealProduct2Price",
        label: "Today's Deal Product 2 Price",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "todayDealProduct3Name",
        label: "Today's Deal Product 3 Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "todayDealProduct3Attribute",
        label: "Today's Deal Product 3 Attribute",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "todayDealProduct3Price",
        label: "Today's Deal Product 3 Price",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "todayDealProduct4Name",
        label: "Today's Deal Product 4 Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "todayDealProduct4Attribute",
        label: "Today's Deal Product 4 Attribute",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "todayDealProduct4Price",
        label: "Today's Deal Product 4 Price",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "todayDealProduct5Name",
        label: "Today's Deal Product 5 Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "todayDealProduct5Attribute",
        label: "Today's Deal Product 5 Attribute",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "todayDealProduct5Price",
        label: "Today's Deal Product 5 Price",
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
                      <h4>Home</h4>
                    </div>
                  </div>
                  {/* {localStorage.getItem('superadminad_role') !== "shop"
                    ? */}
                  {/* <Link
                    to="/payment/add"
                    className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                    data-modal="modal-13"
                  >
                    {" "}
                    <i className="icofont icofont-plus m-r-5"></i> Add Order{" "}
                  </Link> */}
                </div>
                <div className="col-lg-4">
                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="feather icon-home"></i>{" "}
                        </Link>
                      </li>
                      <li className="breadcrumb-item active">Home</li>
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
                          to={'/home-master/add'}
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          Home{" "}
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
                          title={"Home"}
                          className="table-responsive"
                          data={this.state.home_list}
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

HomeMasterList.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {})(HomeMasterList);
