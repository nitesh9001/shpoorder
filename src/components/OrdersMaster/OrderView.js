import React from "react";
import { Link } from "react-router-dom";
import Constant from "../../Constant.js";
import Swal from "sweetalert2";
// import './print-order.css';

class OrderView extends React.Component {
  state = {
    order_details: {
      invoice: "34e32453",
      User: {
        userName: "test user",
      },
      OrderShops: "",
      createdAt: Date.now(),
      OrderShops: [{ OrderStocks: "", name_en: "" }],
      totalAmount: 190,
      paymentMethod: "knet",
      complete_status: "in progress",
      complete: "delivered",
      id: "",
      Address: {
        title: "Address titile",
        houseNo: "3",
        floorNo: "3",
        block: "block",
        street: "street",
        avenue: "avenue",
        direction: "direction",
      },
    },
  };

  componentWillMount() {
    if (
      this.props.match.params.order_id !== undefined &&
      this.props.match.params.order_id !== null &&
      this.props.match.params.order_id !== 0 &&
      this.props.match.params.order_id !== ""
    ) {
      this.setState({ order_id: this.props.match.params.order_id });
      console.log(this.props.match.params.order_id);
    }
    this.getDeliveryTypeList();
    this.getOrdersList();
    this.getDriversList();
    if (localStorage.getItem("superadminad_role") === "shop") {
      this.getShopBranchList();
    }
  }
  handleLanguage = (language_id) => {
    this.setState({ language_id: language_id });
  };
  getOrdersList = () => {
    var that = this;

    var data = {
      orderId: this.props.match.params.order_id,
    };
    fetch(Constant.getAPI() + "/order/adminDescribe", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          var order_data;
          for (var i = 0; i < json.result.length; i++) {
            if (json.result[i].id === that.props.match.params.order_id) {
              order_data = json.result[i];
              var date = new Date(json.result[i].createdAt);
              var year = date.getFullYear();
              var month;
              if (date.getMonth() + 1 > 10) {
                month = date.getMonth() + 1;
              } else {
                month = "0" + (date.getMonth() + 1);
              }
              var day;
              if (date.getDate() > 9) {
                day = date.getDate();
              } else {
                day = "0" + date.getDate();
              }
              var order_date = day + " / " + month + " / " + year;
              order_data.order_date = order_date;
            }
          }
          that.setState({
            orders_list: json.result,
            order_details: order_data,
          });
        } else {
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
  getDeliveryTypeList = () => {
    var that = this;
    var data = new URLSearchParams();
    fetch(Constant.getAPI() + "/delivery/type/get", {
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
          that.setState({ delivery_type: json.result });
        } else {
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
  getShopBranchList = () => {
    var that = this;
    var data = new URLSearchParams();
    data.append("ShopId", localStorage.getItem("superadminad_uid"));
    fetch(Constant.getAPI() + "/shop/address/get", {
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
          that.setState({ branch_address_list: json.result });
        } else {
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

  getDriversList = () => {
    var that = this;
    var data = new URLSearchParams();
    fetch(Constant.getAPI() + "/driver/get", {
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
          that.setState({ drivers_list: json.result });
        } else {
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
  handleChange = (shop_id, event) => {
    event.preventDefault();

    // console.log("status : " + event.target.value, shop_id);

    // return false;
    var that = this;
    var data = new URLSearchParams();
    // this.setState({ isSaving: true });
    data.append("OrderShopId", shop_id);
    data.append("status", event.target.value);
    fetch(Constant.getAPI() + "/product/order/shop/setStatus", {
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
          Swal.fire("Updated !", "Status has been Updated", "success");
          that.getOrdersList();
        } else {
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
  handleAssignBranch = (orderId, event) => {
    var that = this;
    var data = new URLSearchParams();
    this.setState({ isSaving: true });
    data.append("ShopOrderId", orderId);
    data.append("branchAddressId", event.target.value);
    fetch(Constant.getAPI() + "/product/order/assignbranchAddress", {
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
          Swal.fire(
            "Updated !",
            "Shop Branch Address has been Assigned",
            "success"
          );
          that.getOrdersList();
        } else {
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
  handleAssignDeliveryType = (orderId, event) => {
    var that = this;
    var data = new URLSearchParams();
    this.setState({ isSaving: true });
    data.append("ShopOrderId", orderId);
    data.append("DeliveryType", event.target.value);
    fetch(Constant.getAPI() + "/product/order/assignDeliveryType", {
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
          Swal.fire("Updated !", "Delivery Type has been Updated", "success");
          that.getOrdersList();
        } else {
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
  handleAssignDriver = (orderId, event) => {
    var that = this;
    var data = new URLSearchParams();
    // this.setState({ isSaving: true });
    data.append("ShopOrderId", orderId);
    data.append("DriverId", event.target.value);
    fetch(Constant.getAPI() + "/product/order/assignDriver", {
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
          Swal.fire("Updated !", "Driver has been Assigned", "success");
          that.getOrdersList();
        } else {
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
  render() {
    return (
      <div className="main-body">
        <div className="page-wrapper">
          <div className="page-header">
            <div className="row align-items-end">
              <div className="col-lg-8">
                <div className="page-header-title">
                  <div className="d-inline">
                    <h4>View Order</h4>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="page-header-breadcrumb">
                  <ul className="breadcrumb-title">
                    <li className="breadcrumb-item">
                      <Link to="/">
                        {" "}
                        <i className="feather icon-home"></i>{" "}
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/orders">Orders</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      {this.props.match.params.order_id ? "View" : "View"} Order
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div id="print-area">
            <div className="row">
              <div className="col-md-8">
                <div className="invoice-box row">
                  <div className="col-sm-12">
                    <table className="table table-responsive invoice-table table-borderless">
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src="./assets/images/icon.png"
                              className="m-b-10 img-100"
                              alt=""
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-block" id="print_invoice">
              <div className="row invoive-info">
                <div className="col-md-4 col-xs-12 invoice-client-info">
                  <h6>Client Information :</h6>
                  <h6 className="m-0">
                    {this.state.order_details.User.userName}{" "}
                  </h6>
                  {this.state.order_details.Address !== null ? (
                    <p className="m-0 m-t-10">
                      {this.state.order_details.Address.title}
                      {this.state.order_details.Address.houseNo} ,{" "}
                      {this.state.order_details.Address.floorNo} ,
                      {this.state.order_details.Address.block} ,{" "}
                      {this.state.order_details.Address.street} ,
                      {this.state.order_details.Address.avenue} ,{" "}
                      {this.state.order_details.Address.direction}
                    </p>
                  ) : null}
                  <p className="m-0">
                    {this.state.order_details.User.mobileNumber}
                  </p>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h6>order Information :</h6>
                  <table className="table table-responsive invoice-table invoice-order table-borderless">
                    <tbody>
                      <tr>
                        <th>Order Date :</th>
                        <td>20-7-20</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-4 col-sm-6">
                  {/* <h6 className="m-b-20">Transaction ID <span>#{this.state.data.transactionID}</span></h6> */}
                  <h6 className="text-uppercase text-primary">
                    Payment Method :
                    <span>{this.state.order_details.paymentMethod}</span>
                  </h6>
                </div>
              </div>
              {this.state.order_details.OrderShops !== undefined &&
              this.state.order_details.OrderShops !== null &&
              this.state.order_details.OrderShops !== [] &&
              this.state.order_details.OrderShops.length > 0 ? (
                <div className="row">
                  <div className="col-sm-12">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr className="thead-inverse">
                            <th>Product Name</th>
                            {/* <th>Delivery Type</th> */}
                            <th>Product Details</th>

                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.order_details.OrderShops.map(
                            (OrderShops, i) => (
                              <tr>
                                <td width={"350px"}>
                                  {OrderShops.OrderStocks !== null &&
                                  OrderShops.OrderStocks !== [] &&
                                  OrderShops.OrderStocks.length > 0 ? (
                                    <ul>
                                      {/* {OrderShops.OrderStocks.map(
                                        (order_stock) =>
                                          order_stock.Stock !== null ? (
                                            <li>
                                              <Link
                                                to={
                                                  "/products/add/" +
                                                  order_stock.Stock.Product.id
                                                }
                                              >
                                                {
                                                  order_stock.Stock.Product
                                                    .name_en
                                                }
                                                {order_stock.Stock.AttributeValues.map(
                                                  (attributes) => (
                                                    <span className="badge badge-primary mx-1">
                                                      {attributes.name_en}
                                                    </span>
                                                  )
                                                )}
                                              </Link>
                                            </li>
                                          ) : null
                                      )} */}

                                      <li>Product Name </li>
                                    </ul>
                                  ) : null}
                                  <ul>
                                    <li>Lorem Ipsum </li>
                                  </ul>
                                </td>
                                {/* {
                                    OrderShops.Delivery !== null
                                      ?
                                      <td>
                                        {this.state.delivery_type !== undefined && this.state.delivery_type !== null && this.state.delivery_type !== [] && this.state.delivery_type.length > 0
                                          ?
                                          this.state.delivery_type.map(type =>
                                            type.id === OrderShops.Delivery.DeliveryTypeId ? type.name_en : null
                                          )
                                          : null} - {OrderShops.Delivery.name_en}
                                      </td>
                                      :
                                      <td>
                                        -
                                      </td>
                                  } */}
                                <td>
                                  <h6>Lorem ipsum X 2</h6>
                                </td>
                                {localStorage.getItem("superadminad_role") ===
                                "shop" ? (
                                  <td>
                                    <select
                                      name="branchAddressId"
                                      className="form-control"
                                      value={OrderShops.branchAddressId}
                                      onChange={this.handleAssignBranch.bind(
                                        this,
                                        OrderShops.id
                                      )}
                                    >
                                      <option value="">Assign Branch</option>
                                      {this.state.branch_address_list !==
                                        undefined &&
                                      this.state.branch_address_list !== null &&
                                      this.state.branch_address_list !== [] &&
                                      this.state.branch_address_list.length > 0
                                        ? this.state.branch_address_list.map(
                                            (branch) => (
                                              <option
                                                value={branch.id}
                                                key={branch.id}
                                              >
                                                {branch.title_en}
                                              </option>
                                            )
                                          )
                                        : null}
                                    </select>
                                  </td>
                                ) : null}

                                <td>190</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="row">
                <div className="col-sm-12">
                  <table className="table table-responsive invoice-table invoice-total">
                    <tbody>
                      <tr>
                        <th>Total Amount :</th>
                        <td>
                          {this.state.order_details.totalAmount}{" "}
                          {this.state.order_details.CurrencyId}
                        </td>
                      </tr>
                      <tr>
                        <th>Delivery Charges :</th>
                        <td>
                          {this.state.order_details.totalDeliveryCharge}{" "}
                          {this.state.order_details.CurrencyId}
                        </td>
                      </tr>

                      <tr className="text-info">
                        <td>
                          <hr />
                          <h5>Grand Total :</h5>
                        </td>
                        <td>
                          <hr />
                          <h5>
                            190 {this.state.order_details.totalwithdelivery}{" "}
                            {this.state.order_details.CurrencyId}
                          </h5>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-sm-12 invoice-btn-group text-center">
              {/* <button type="button" onClick={window.print} className="btn btn-inverse btn-print-invoice m-b-10 btn-sm m-1 waves-effect waves-light m-r-20">Print</button> */}
              <Link
                to="/orders"
                type="button"
                className="btn btn-danger waves-effect m-b-10 btn-sm m-1 waves-light"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderView;
