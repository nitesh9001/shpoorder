import React from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';
import Constant from '../../Constant'
import Swal from 'sweetalert2'
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
class ContactUsList extends React.Component {
  state = {}
  componentWillMount() {
    // this.getContactUsList();
  }
  getContactUsList = () => {
    var that = this;
    var data = new URLSearchParams();
    fetch(Constant.getAPI() + "/contactUs/get", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      if (json.status === true) {
        that.setState({ contact_us_list: json.result });
      } else {
        that.setState({ contact_us_list: [] });
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
  render() {
    const columns = [{
      name: "email",
      label: "User Email",
      options: {
        filter: true,
        sort: true
      }
    }, {
      name: "phone",
      label: "Phone",
      options: {
        filter: true,
        sort: true
      }
    },{
      name: "address",
      label: "Address",
      options: {
        filter: true,
        sort: true
      }
    }, {
      name: "createdAt",
      label: "Created Date",
      options: {
        filter: true,
        sort: true,
        sortDirection: "desc",
        customBodyRender: (createdAt, tableMeta) => {
          var date = new Date(createdAt);
          var year, month, day, created_date = "";
          year = date.getFullYear();
          if (date.getMonth() > 8) {
            month = date.getMonth() + 1
          } else {
            month = "0" + (date.getMonth() + 1)
          }
          if (date.getDate() > 9) {
            day = date.getDate() + 1
          } else {
            day = "0" + (date.getDate() + 1)
          }
          created_date = day + " / " + month + " / " + year
          return <span>{created_date}</span>
        }
      }
      }, {
        name: "id",
        label: "Action",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (id, tableMeta) => {
            return <Link to={'/contactus'+id}
                className="m-r-15 text-muted"
                data-toggle="tooltip"
                data-placement="top"
                title=""
                data-original-title="Delete">
                <i className="f-20 icofont icofont-delete-alt text-danger"></i>  </Link>
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
      selectableRows: 'none',
      textLabels: {
        body: {
          noMatch: this.state.isSaving ?
            "Loading data..!" :
            "Sorry, No Contact Us Request Found",
          toolTip: "Sort",
          columnHeaderTooltip: column => `Sort for ${column.label}`
        }
      }
    };
    return (
      <div className="pcoded-inner-content" >
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Contact Us List</h4>
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
                      <li className="breadcrumb-item active">Contact Us List</li>
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
                      <div className="dt-responsive table-responsive">
                          <MUIDataTable
                          title={"Contact Us List"}
                          className="table-responsive"
                          data={this.state.contact_us_list}
                          columns={columns}
                          options={options}
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

export default ContactUsList;
