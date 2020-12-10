import React from "react";
import Constant from "../Constant";

class AdminDashboard extends React.Component {
  componentWillMount() {
    this.getDashboardStats();
  }
  getDashboardStats = () => {
    var that = this;
    var data = new URLSearchParams();
    this.setState({ isLoading: true });
    fetch(Constant.getAPI() + "/product/order/stats", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("q8_horo_auth"),
      },
      body: data,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.success === true) {
          that.setState({
            orders: json.result.orders,
            sales: json.result.sales,
            products: json.result.products,
            users: json.result.users,
            shops: json.result.shops,
          });
        } else {
          console.log(json);
        }
      });
  };
  render() {
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Dashboard</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="page-body">
              <h3 className="text-danger">Welcome to Online Orders Admin</h3>
              {/* <div className="row">
                <div className="col-xl-3 col-md-6">
                  <div className="card">
                    <div className="card-block">
                      <div className="row align-items-center">
                        <div className="col-8">
                          <h4 className="text-c-green f-w-600">{this.state.sales} KWD</h4>
                          <h6 className="text-muted m-b-0">Total Sales</h6>
                        </div>
                        <div className="col-4 text-right">
                          <i className="icofont icofont-coins f-28"></i>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-c-green">
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6">
                  <div className="card">
                    <div className="card-block">
                      <div className="row align-items-center">
                        <div className="col-8">
                          <h4 className="text-c-yellow f-w-600">{this.state.orders}</h4>
                          <h6 className="text-muted m-b-0">Total Orders</h6>
                        </div>
                        <div className="col-4 text-right">
                          <i className="icofont icofont-shopping-cart f-28"></i>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-c-yellow">
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card">
                    <div className="card-block">
                      <div className="row align-items-center">
                        <div className="col-8">
                          <h4 className="text-c-pink f-w-600">{this.state.shops}</h4>
                          <h6 className="text-muted m-b-0">Total Shops</h6>
                        </div>
                        <div className="col-4 text-right">
                          <i className="feather icon-alert-triangle f-28"></i>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-c-pink">
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card">
                    <div className="card-block">
                      <div className="row align-items-center">
                        <div className="col-8">
                          <h4 className="text-c-blue f-w-600">{this.state.products}</h4>
                          <h6 className="text-muted m-b-0">Total Products</h6>
                        </div>
                        <div className="col-4 text-right">
                          <i className="feather icon-award f-28"></i>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-c-blue">
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6">
                  <div className="card">
                    <div className="card-block">
                      <div className="row align-items-center">
                        <div className="col-8">
                          <h4 className="text-c-orenge f-w-600">{this.state.users}</h4>
                          <h6 className="text-muted m-b-0">Total Users</h6>
                        </div>
                        <div className="col-4 text-right">
                          <i className="feather icon-users f-28"></i>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-c-orenge">
                    </div>
                  </div>
                </div>

              </div> */}
            </div>
          </div>
          <div id="styleSelector"></div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
