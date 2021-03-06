import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Swal from "sweetalert2";
import "react-toggle/style.css"; // for ES6 modules
import Toggle from "react-toggle";
import MUIDataTable from "mui-datatables";
import { Tooltip ,Button} from "@material-ui/core";

import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
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
class SellerNotification extends React.Component {
  state = {open: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    data: [],
    hidedownload: false,
    sellerNotification: [
      {
        id: "1",
        targetAudience:'Seller',
        template:[
            {id :"1",value:'Hey <seller_name>, your product with SKU <SKU ID> is below threshold stock. Please refill the stock'},
            {id :"2",value:'Hey <seller_name>, the order with order ID <Order ID> has been cancelled. The reason of cancellation is <reason_of_cancellation>.'},
            {id :"3",value:'Hey <seller_name>, you have received a new order with order ID <Order ID>, customer ID <customer_ID>, with total items <No_of_items>, including product SKU <SKU_ID_1>, <SKU_ID_2>, <SKU_ID_3>, <SKU_ID_4>, <SKU_ID_5>, and total amount <Total_Amount>, with payment mode <Mode_of_payment>'},   
        ]
      },
    ],
  };
  componentWillMount() {
    // this.getUsersList();
  }
//   handleStatusChange = (sid) => {
//     var isChecked = $("#cattogBtn_" + sid);
//     isChecked.prop("checked", !isChecked.prop("checked"));
//     console.log(isChecked.prop("checked"), !isChecked.prop("checked"));
//     if (!isChecked.prop("checked") === true) {
//       var status = "active";
//     } else {
//        status = "inactive";
//     }
//     let newArray = this.state.User_list_data;
//     var a = newArray.find((element) => {
//       return element.id === sid;
//     });
//     a.status = status;
//     console.log(newArray);
//     this.setState({ User_list_data: newArray });
//     Swal.fire("Update Status!", "Status has been updated.", "success");
//   };

//   deletedealer = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will not be able to recover this !",
//       type: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "No, keep it",
//     }).then((result) => {
//       if (result.value) {
//         Swal.fire("Deleted!", "Dealer has been deleted.", "success");
//       }
//     });
//   };
//   getUsersList = () => {
//     var that = this;
//     var data = new URLSearchParams();
//     // this.setState({ isSaving: true });
//     fetch(Constant.getAPI() + "/users/list", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
//       },
//       body: data,
//     })
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (json) {
//         if (json.status === true) {
//           console.log(json.data);
//           that.setState({ SellerNotification: json.data });
//         } else {
//           that.setState({ SellerNotification: [] });
//           Swal.fire({
//             title: "Something went wrong. Try again after some Time.!",
//             icon: "error",
//             text: "",
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Ok",
//           });
//         }
//       });
//   };
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
    let newArray = this.state.SellerNotification.filter((d) => {
      // console.log(d)
      let searchValue = d.id;
      return searchValue.indexOf(item) !== -1;
    });
    console.log(newArray);
    this.setState({
      downdata: [...this.state.downdata,newArray],
    });
    console.log(this.state.downdata)
  };
  render() {
    const columns = [
    //   {
    //     name: "id",
    //     label: 'Select',
    //     options: {
    //       filter: false,
    //       sort: false,
    //       customBodyRender: (id, tableMeta) => {
    //         return !this.state.hideOld ? (
    //           <Checkbox
    //             name={id}
    //             checked={this.state.checkedItems.get(id) || false}
    //             onChange={this.handleChange}
    //             type="checkbox"
    //           />
    //         ) : (
    //           <Checkbox
    //             color="primary"
    //             checked={true}
    //             type="checkbox"
    //             onChange={this.selectall}
    //             inputProps={{ "aria-label": "secondary checkbox" }}
    //           />
    //         );
    //         //  <input type="checkbox" name="check" id={id} value={id}  onChange={this.selctSingle.bind(this,id)} checked={this.state.checked}/> */}
    //         // <Checkbox
    //         //   color="primary"
    //         //   id={'ch'+id}
    //         //   data-id={id}
    //         //   onChange={this.selctSingle.bind(this,id)}
    //         //   checked= {this.state.check === id ? true : false }
    //         //   value={this.state.check ? true: false }
    //         //   inputProps={{ "aria-label": "secondary checkbox" }}
    //         // />
    //       },
    //     },
    //   },
      {
        name: "targetAudience",
        label: "Target Audience",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "template",
        label: "Template",
        options: {
          filter: false,
          sort: false,
          customBodyRender:(template,tableMeta)=>{
              console.log(template)
              return <>
              {template.map((data,i)=><div key={data.id} style={{padding:'15px',borderBottom:'.8px solid grey',width:'auto', height: "100%",
                  whiteSpace: "initial",
                  wordWrap: "break-word",
              wordSpacing:'initial'}}>
              {data.value}
             </div>
          )}
         </>
        },
      }
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
    //     name: "status",
    //     label: "Status",
    //     options: {
    //       filter: true,
    //       sort: true,
    //       customBodyRender: (status, tableMeta) => {
    //         return (
    //           <Toggle
    //             id={"product_status_" + tableMeta.rowData[6]}
    //             checked={status === true ? true : false}
    //             value={status}
    //             onChange={this.handleStatusChange.bind(
    //               this,
    //               tableMeta.rowData[6]
    //             )}
    //           />
    //         );
    //       },
    //     },
    //   },
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
    //               to={"/notification-customer/add/" + id}
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
        filter:false,
      filterType: "false",
      viewColumns: false,
      selectableRows: false,
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
                      <h4>Seller Notification Templete</h4>
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
                      <li className="breadcrumb-item active">Seller Notification Templete</li>
                    </ul>
                  </div>
                </div>
                </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-block">
                  <div className="col">
                        {/* <Link
                          to="/users-HoAdmin/add"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          HO Admin{" "}
                        </Link> */}
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
                        title={"Seller Notification Templete"}
                        className="table-responsive"
                        data={this.state.sellerNotification}
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

export default SellerNotification;
