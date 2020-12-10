import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";

import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  FormGroup,
  FormLabel,
  Tooltip,
  TextField,
  Button,
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
class PriceUpload extends Component {
  state = {
    open: false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    ptcFilter: false,
    ptdFilter: false,
    priceFilter: false,
    timeStampofImportFilter: false,
    deliveryChargesFilter: false,
    maximumQtycustomerFilter: false,
    priceupload: [
      {
        id: 1,
        pincode: "380001",
        seller_id: "Seller1192",
        sku: "110015",
        mrp: 120,
        ptd: 400,
        ptc: 350,
        weight: "5 kg",
        stock: "10",
        deliveryCharges: "40",
        maximumQtycustomer: "100",
        timeStampofImport: "",
      },
    ],
    isSaving: false,
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
        name: "seller_id",
        label: "Seller Id",
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
        name: "mrp",
        label: "MRP",
        options: {
          filter: true,
          sort: true,
          filterType: "custom",
          customFilterListOptions: {
            render: (v) => {
              if (v[0] && v[1] && this.state.priceFilter) {
                return [`Min Price: ${v[0]}`, `Max Price: ${v[1]}`];
              } else if (v[0] && v[1] && !this.state.priceFilter) {
                return `Min Price: ${v[0]}, Max Price: ${v[1]}`;
              } else if (v[0]) {
                return `Min Price: ${v[0]}`;
              } else if (v[1]) {
                return `Max Price: ${v[1]}`;
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
                return [`Min Price: ${v[0]}`, `Max Price: ${v[1]}`];
              } else if (v[0] && v[1] && !this.state.ptdFilter) {
                return `Min Price: ${v[0]}, Max Price: ${v[1]}`;
              } else if (v[0]) {
                return `Min Price: ${v[0]}`;
              } else if (v[1]) {
                return `Max Price: ${v[1]}`;
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
                return [`Min Price: ${v[0]}`, `Max Price: ${v[1]}`];
              } else if (v[0] && v[1] && !this.state.ptcFilter) {
                return `Min Price: ${v[0]}, Max Price: ${v[1]}`;
              } else if (v[0]) {
                return `Min Price: ${v[0]}`;
              } else if (v[1]) {
                return `Max Price: ${v[1]}`;
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
        },
      },
      {
        name: "weight",
        label: "Weight",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (weight, tabelMeta) => {
            return weight;
          },
        },
      },
      {
        name: "stock",
        label: "Stock",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "pincode",
        label: "Pincode",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "deliveryCharges",
        label: "Delivery Charges",
        options: {
          filter: true,
          sort: true,
          filterType: "custom",
          filterPopoverOptions: {
            mustConfirm: false,
            confirmButtonLabel: "Submit",
          },
          customFilterListOptions: {
            render: (v) => {
              if (v[0] && v[1] && this.state.deliveryChargesFilter) {
                return [`Min Price: ${v[0]}`, `Max Price: ${v[1]}`];
              } else if (v[0] && v[1] && !this.state.deliveryChargesFilter) {
                return `Min Price: ${v[0]}, Max Price: ${v[1]}`;
              } else if (v[0]) {
                return `Min Price: ${v[0]}`;
              } else if (v[1]) {
                return `Max Price: ${v[1]}`;
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
                <FormLabel style={{ fontSize: "12px" }}>Delivery Charges</FormLabel>
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
      },
      {
        name: "maximumQtycustomer",
        label: "Maximum Qty. customer",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "timeStampofImport",
        label: "Time Stamp of Import",
        options: {
          filter: true,
          sort: true,
          // filterType: 'custom',
          // customFilterListOptions: {
          //   render: v => {
          //     if (v[0] && v[1] && this.state.timeStampofImportFilter) {
          //       return [`Min Price: ${v[0]}`, `Max Price: ${v[1]}`];
          //     } else if (v[0] && v[1] && !this.state.timeStampofImportFilter) {
          //       return `Min Price: ${v[0]}, Max Price: ${v[1]}`;
          //     } else if (v[0]) {
          //       return `Min Price: ${v[0]}`;
          //     } else if (v[1]) {
          //       return `Max Price: ${v[1]}`;
          //     }
          //     return [];
          //   },
          //   update: (filterList, filterPos, index) => {
          //     console.log('customFilterListOnDelete: ', filterList, filterPos, index);

          //     if (filterPos === 0) {
          //       filterList[index].splice(filterPos, 1, '');
          //     } else if (filterPos === 1) {
          //       filterList[index].splice(filterPos, 1);
          //     } else if (filterPos === -1) {
          //       filterList[index] = [];
          //     }

          //     return filterList;
          //   },
          //  },
          //  filterOptions: {
          //   logic(age, filters) {
          //     if (filters[0] && filters[1]) {
          //       return age < filters[0] || age > filters[1];
          //     } else if (filters[0]) {
          //       return age < filters[0];
          //     } else if (filters[1]) {
          //       return age > filters[1];
          //     }
          //     return false;
          //   },
          //   display: (filterList, onChange, index, column) => (
          //     <div>
          //       <FormLabel>Time Stamp of Import</FormLabel>
          //       <FormGroup row>
          //         <TextField
          //           label='min'
          //           value={filterList[index][0] || ''}
          //           onChange={event => {
          //             filterList[index][0] = event.target.value;
          //             onChange(filterList[index], index, column);
          //           }}
          //           style={{ width: '45%', marginRight: '5%' }}
          //         />
          //         <TextField
          //           label='max'
          //           value={filterList[index][1] || ''}
          //           onChange={event => {
          //             filterList[index][1] = event.target.value;
          //             onChange(filterList[index], index, column);
          //           }}
          //           style={{ width: '45%' }}
          //         />
          //       </FormGroup>
          //     </div>
          //   ),
          // },
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
                      <h4>Price Upload</h4>
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
                      <li className="breadcrumb-item active">Price Upload</li>
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
                          title={"Price Upload"}
                          className="table-responsive"
                          data={this.state.priceupload}
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

export default PriceUpload;
