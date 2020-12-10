import React from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';
import Constant from '../../../Constant'
import Swal from 'sweetalert2'
import "react-toggle/style.css" // for ES6 modules
import Toggle from 'react-toggle'
import MUIDataTable from "mui-datatables";
import AlertDialog from '../../../common/DownloadOption';
import { Tooltip ,Button} from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
class StateList extends React.Component {
  state = { open: false}
  handleStatusChange = (sid) => {
    var isChecked = $('#cattogBtn_' + sid);
    isChecked.prop("checked", !isChecked.prop("checked"));
    console.log(isChecked.prop('checked'), !isChecked.prop("checked"));
    if (!isChecked.prop("checked") === true) {
      var status = 'active'
    } else {
      var status = 'inactive'
    }
    let newArray = this.state.State_list;
    var a = newArray.find((element) => {
      return element.id === sid
    })
    a.status = status;
    console.log(newArray)
    this.setState({ State_list: newArray })
    Swal.fire("Update Status!", "Status has been updated.", "success");
  }
  deleteState = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this !",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it"
    }).then(result => {
      if (result.value) {
        var that = this;
        var data = {
          StateId:id
        }
        // this.setState({ isSaving: true });
        // data.append("StateId", id);
        fetch(Constant.getAPI() + "/State/delete", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
          body:JSON.stringify(data)
        }).then(function (response) {
          return response.json();
        }).then(function (json) {
          if (json.status === true) {
            Swal.fire("Deleted!", "State has been deleted.", "success");
            that.getStateList();
          } else {
            Swal.fire({
              title: "Something went wrong. Try again after some Time.!",
              icon: 'error',
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok"
            })
          }
        })
      }
    });

  }
  componentWillMount() {
    this.getStateList();
  }
  getStateList = () => {
    var that = this;
    var data = new URLSearchParams();
    this.setState({ isSaving: true });
    fetch(Constant.getAPI() + "/State/list", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
      }
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      if (json.status === true) {
        that.setState({ State_data: json.data, isSaving: false });
      } else {
        that.setState({ State_data: [], isSaving: false });
        Swal.fire({
          title: "Something went wrong. Try again after some Time.!",
          icon: 'error',
          text: "",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok"
        })
      }
    })
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
    const columns = [{
      name: "name_en",
      label: "State Name : English",
      options: {
        filter: true,
        sort: true
      }
    }, {
      name: "Country.name_en",
      label: "Country Name",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (Country, tableMeta) => {
          return (
            <div>
              {
                Country !== undefined && Country !== null && Country !== {}
                  ?
                  Country.name
                  : ""

              }
            </div>
          )
        }
      }
    },{
      name: "active",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (active, tableMeta) => {
          var country_id = tableMeta.rowData[1];
          console.log(tableMeta);
          return <Toggle
            id={"coutry_status_" + country_id}
            checked={active}
            value={active}
            onChange={this.handleStatusChange.bind(this, country_id)}
          />
        }
      }
  }, {
      name: "id",
      label: "Actions",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (id, tableMeta) => {
          // var id = governate[0].id;
          return (
            <div>
              <Link to={"/State/add/" + id}
                className="m-r-15 text-muted"
                data-toggle="tooltip"
                data-placement="top" title=""
                data-original-title="Edit">
                <i className="f-20 icofont icofont-ui-edit text-custom"></i>
              </Link>
              {/* <span onClick={this.deleteState.bind(this, id)}
                className="m-r-15 text-muted"
                data-toggle="tooltip"
                data-placement="top"
                title=""
                data-original-title="Delete">
                <i className="f-20 icofont icofont-delete-alt text-danger"></i>  </span> */}
            </div>)
        }
      }
    }];
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
          noMatch: this.state.isSaving ?
            "Loading data..!" :
            "Sorry, No State Found",
          toolTip: "Sort",
          columnHeaderTooltip: column => `Sort for ${column.label}`
        }
      }
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
                      <h4>State List</h4>
                    </div>
                  </div>
                  
                </div>
                <div className="col-lg-4">
                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="feather icon-home"></i> </Link>
                      </li>
                      <li className="breadcrumb-item active">State List</li>
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
                          to="/State/add"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          State{" "}
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
                          title={"State List"}
                          className="table-responsive"
                          data={this.state.State_data}
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

export default StateList;
