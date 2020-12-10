import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Constant from "../../../Constant";
import Swal from "sweetalert2";
import "react-toggle/style.css"; // for ES6 modules
import Toggle from "react-toggle";
import MUIDataTable from "mui-datatables";
import { Tooltip, Button } from "@material-ui/core";

import AlertDialog from "../../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
class CityList extends React.Component {
  state = {
    open: false,
    city_list: [
      {
        cityID: 1,
        cityName: "Asimah",
        status: "Active",
      },
      {
        cityID: 2,
        cityName: "baroda",
        status: "Active",
      },
      {
        cityID: 3,
        cityName: "test",
        status: "Active",
      },
    ],
    language_data: [
      {
        language_id: "1",
        language_name: "English",
        language_code: "EN",
      },
      {
        language_id: "2",
        language_name: "Arabic",
        language_code: "AR",
      },
    ],
  };

  componentWillMount() {}
  handleStatusChange = (sid) => {
    var isChecked = $("#cattogBtn_" + sid);
    isChecked.prop("checked", !isChecked.prop("checked"));
    console.log(isChecked.prop("checked"), !isChecked.prop("checked"));
    if (!isChecked.prop("checked") === true) {
      var status = "active";
    } else {
      var status = "inactive";
    }
    let newArray = this.state.city_list;
    var a = newArray.find((element) => {
      return element.cityID === sid;
    });
    a.status = status;
    console.log(newArray);
    this.setState({ city_list: newArray });
    Swal.fire("Update Status!", "Status has been updated.", "success");
  };
  deleteCity = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this !",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted!", "City has been deleted.", "success");
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

  render() {
    const columns = [
      {
        name: "cityName",
        label: "City Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "active",
        label: "Status",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (active, tableMeta) => {
            var country_id = tableMeta.rowData[1];
            console.log(tableMeta);
            return (
              <Toggle
                id={"coutry_status_" + country_id}
                checked={active}
                value={active}
                onChange={this.handleStatusChange.bind(this, country_id)}
              />
            );
          },
        },
      },
      {
        name: "cityID",
        label: "Actions",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (cityID, tableMeta) => {
            return (
              <div>
                <Link
                  to={"/city/add/" + cityID}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-20 icofont icofont-ui-edit text-custom"></i>
                </Link>
                {/* <span
                    onClick={this.deleteArea.bind(this, id)}
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
            : "Sorry, No Area Found",
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
                      <h4>City List</h4>
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
                      <li className="breadcrumb-item active">City List</li>
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
                          to="/city/add"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          City{" "}
                        </Link>

                        {/* <button
                          className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          Import
                        </button> */}
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
                      </div>

                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                          title={"City List"}
                          className="table-responsive"
                          data={this.state.city_list}
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

export default CityList;
