import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import Toggle from "react-toggle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddGalleryImage from "../components/ProductMaster/AddGalleryImage";
// import { fetchCategoryList } from "../../store/index";
// import {  Tooltip ,Button} from "@material-ui/core";
// 
// import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import uploadedFileLink from "../ProductMasterFormats/ProductMasterExport.csv";
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
class ImportData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideOld: false,
      checkedItems: new Map(),
      check: false,
      downdata: [],
      checked: false,
      data: [],
      chooseFile: null,
      hidedownload: false,
    };
  }

  // handleStatusChange = (sid) => {
  //   var isChecked = $("#tyre_category_" + sid);
  //   isChecked.prop("checked", !isChecked.prop("checked"));
  //   console.log(isChecked.prop("checked"), !isChecked.prop("checked"));
  //   if (!isChecked.prop("checked") === true) {
  //     var status = "active";
  //   } else {
  //     var status = "inactive";
  //   }
  //   let newArray = this.state.tyre_category_list;
  //   var a = newArray.find((element) => {
  //     return element.id === sid;
  //   });
  //   a.status = status;
  //   console.log(newArray);
  //   this.setState({ tyre_category_list: newArray });
  //   Swal.fire("Update Status!", "Status has been updated.", "success");
  // };

  componentWillMount() {
    // this.getCategory();
    console.log(this.props);
  }
  getCategory() {
    // this.props.fetchCategoryList();
  }
  imgLoadError = (event) => {
    event.target.src = "./assets/images/icon.png";
  };
  onError = () => {
    Swal.fire({
      title: "Something went wrong. Try again after some Time.!",
      icon: "error",
      text: "",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    });
  };
  onSaveData = () => {
    console.log(this.state.chooseFile);
    if (this.state.chooseFile !== null) {
      this.setState({
        show: true,
      });
    } else {
      this.setState({
        show: false,
      });
    }
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
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState((prevState) => ({
      hidedownload: !this.state.hidedownload,
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
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
          },
        },
      },
      {
        name: "Medium",
        label: "Category Image",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (Medium, tableMeta) => {
            return (
              <div>
                {
                  <img
                    src={
                      Medium !== undefined && Medium !== null && Medium !== ""
                        ? Medium.url
                        : "./assets/images/icon.png"
                    }
                    alt=""
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
        name: "name_en",
        label: "Category Name",
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
                // checked={status === true ? true : false}
                // value={status}
                // onChange={this.handleStatusChange.bind(
                //   this,
                //   tableMeta.rowData[6]
                // )}
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
                  to={"/importData/add/" + id}
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
      print: false,
      rowsPerPage: 25,
      rowsPerPageOptions: [10, 20, 25],
      selectableRows: false,
      download: false,
      // downloadOptions:{
      //   filterOptions : {
      //     useDisplayedRowsOnly : true
      //   }
      // },
      // onRowsSelect: (curRowSelected, allRowsSelected) => {
      //   console.log("---RowSelect");
      //   console.log("Row Selected: ", curRowSelected);
      //   console.log("All Selected: ", allRowsSelected);
      //   this.setState({
      //     data: allRowsSelected,
      //   });
      //   console.log(this.state.data);
      // },
      print: false,
      textLabels: {
        body: {
          noMatch: this.state.isSaving
            ? "Loading data..!"
            : "Sorry, No Category Found",
          toolTip: "Sort",
          columnHeaderTooltip: (column) => `Sort for ${column.label}`,
        },
        // selectedRows: {
        //   text: `row(s) Selected`,
        //   download: "Download",
        //   downloadAria: "Download Selected Rows",
        // },
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
                      <h4>Import Data</h4>
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
                      <li className="breadcrumb-item">
                        <Link to="/category">Category</Link>
                      </li>
                      <li className="breadcrumb-item active">Import Data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="page-body">
              <div className="card">
                <div className="card-body">
                  <div className="row"></div>
                </div>
                <div className="card-block">
                  <div className="col-md-12">
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          Choose File
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="file"
                            className="form-control"
                            name="chooseFile"
                            placeholder="Choose FIle"
                            onChange={this.handleChange}
                            value={this.state.chooseFile}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-block d-flex">
                    <div className="card-footer">
                      <div className="row float-right p-3">
                        {this.state.isSaving ? (
                          <button
                            className="btn btn-grd-disabled mr-2"
                            disabled
                          >
                            Saving...!
                          </button>
                        ) : (
                          <button
                            onClick={this.onSaveData}
                            className="btn btn-grd-disabled mr-2"
                          >
                            <i className="icofont icofont-save"></i> Save
                          </button>
                        )}
                        <button
                          to={this.props}
                          onClick={() => this.props.history.goBack()}
                          className="btn btn-outline-dark  mr-2"
                        >
                          Cancel
                        </button>
                        <a
                          href={uploadedFileLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          <button
                            onClick={this.donwloadFormate}
                            target="_blank"
                            className="btn mr-2 color-info p-2"
                          >
                            <i className="icofont icofont-file-alt"></i> Sample CSV
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {this.state.show ? (
              <div className="page-body">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="card">
                      <div className="card-block">
                        <div className="dt-responsive table-responsive">
                          <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                            title={
                              <div className="d-inline">
                                <h4>Import List</h4>
                              </div>
                            }
                            className="table-responsive"
                            //   data={this.props.categoryData.data}
                            columns={columns}
                            options={options}
                          />
                        </MuiThemeProvider>

                          {this.props.error === false ? this.onError() : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryData: state.category.category_list,
    error: state.category.error,
  };
};

ImportData.propTypes = {
  fetchCategoryList: PropTypes.func.isRequired,
  // category: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(ImportData);
