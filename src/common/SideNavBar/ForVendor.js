import React from "react";
import { Link } from "react-router-dom";

class ForVendorSideNavBar extends React.Component {
  render() {
    return (
      <nav className="pcoded-navbar noprint">
        <div className="pcoded-inner-navbar main-menu">
          <ul className="pcoded-item pcoded-left-item">
            <li className="">
              <Link to="/">
                <span className="pcoded-micon">
                  <i className="icofont icofont-dashboard"></i>
                </span>
                <span className="pcoded-mtext">Dashboard</span>
              </Link>
            </li>
            <li className=" pcoded-hasmenu">
              <a href="javascript:void(0)">
                <span className="pcoded-micon">
                  <i className="icofont icofont-cart-alt"></i>
                </span>
                <span className="pcoded-mtext">Orders</span>
              </a>
              <ul className="pcoded-submenu">
                <li className=" ">
                  <Link to="/orders-pending">
                    <span className="pcoded">Order Pending</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/orders-completed">
                    <span className="pcoded">Completed</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/orders-cancelled">
                    <span className="pcoded">Cancelled</span>
                  </Link>
                </li>

                <li className=" ">
                  <Link to="/orders">
                    <span className="pcoded">All Orders</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className=" pcoded-hasmenu">
              <a href="javascript:void(0)">
                <span className="pcoded-micon">
                  <i className="icofont icofont-fast-delivery"></i>
                </span>
                <span className="pcoded-mtext">Delivery</span>
              </a>
              <ul className="pcoded-submenu">
                <li className=" ">
                  <Link to="/delivery-inprocess">
                    <span className="pcoded">In Process</span>
                  </Link>
                </li>

                <li className=" ">
                  <Link to="/delivery-completed">
                    <span className="pcoded">Completed</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/delivery-delayed">
                    <span className="pcoded">Delayed Delivery</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/delivery-boy-list">
                    <span className="pcoded">Delivery Boy List</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/delivery-boy-manage">
                    <span className="pcoded">Delivery Boy Assign</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className=" ">
              <Link to="/products">
                <span className="pcoded-micon">
                  <i className="feather icon-command"></i>
                </span>
                <span className="pcoded-mtext">Product Price Master</span>
              </Link>
            </li>
            <li className=" ">
              <Link to="/seller-product-catalogue">
                <span className="pcoded-micon">
                  <i className="icofont icofont-instrument"></i>
                </span>
                <span className="pcoded-mtext">Seller Product Catalogue</span>
              </Link>
            </li>
            <li className=" ">
              <Link to="/inventory">
                <span className="pcoded-micon">
                  <i className="icofont icofont-box"></i>
                </span>
                <span className="pcoded-mtext">Inventory update</span>
              </Link>
            </li>
           
            <li className=" pcoded-hasmenu">
              <a href="javascript:void(0)">
                <span className="pcoded-micon">
                  <i className="icofont icofont-wallet"></i>
                </span>
                <span className="pcoded-mtext">Payment Status</span>
              </a>
              <ul className="pcoded-submenu">
                <li className=" ">
                  <Link to="/prepaid-orders">
                    <span className="pcoded">Prepaid Orders</span>
                  </Link>
                </li>

                <li className=" ">
                  <Link to="/postpaid-orders">
                    <span className="pcoded">Post Paid Orders</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className=" pcoded-hasmenu">
              <a href="javascript:void(0)">
                <span className="pcoded-micon">
                  <i className="icofont icofont-read-book"></i>
                </span>
                <span className="pcoded">Report Master</span>
              </a>
              <ul className="pcoded-submenu">
              <li className=" ">
                  <Link to="/sales-register">
                    <span className="pcoded">Sales Register</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/order-register">
                    <span className="pcoded">Order Register</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/price-upload">
                    <span className="pcoded">Price Upload</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/order-cancellation-analysis">
                    <span className="pcoded">Order Cancellation Analysis</span>
                  </Link>
                </li>

                <li className=" ">
                  <Link to="/low-inventory-report">
                    <span className="pcoded">
                      Low Inventory Report
                    </span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/cancellation-refund-report">
                    <span className="pcoded">
                      Cancellation Refund Report
                    </span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/cod-prepaid-order">
                    <span className="pcoded">COD Postpaid Order</span>
                  </Link>
                </li>
               
                <li className=" ">
                  <Link to="/delivery-boy-report">
                    <span className="pcoded">Delivery Boy Report</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/daily-payment-register">
                    <span className="pcoded">Daily Payment Register</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/product-master-upload">
                    <span className="pcoded">Product Master Upload</span>
                  </Link>
                </li>

                <li className=" ">
                  <Link to="/consumer-feedback-report">
                    <span className="pcoded">Consumer Feedback Report</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/inventory-upload-report">
                    <span className="pcoded">Inventory Upload Report</span>
                  </Link>
                </li>
              </ul>
            </li>
            <div className="pcoded-navigatio-lavel">Settings</div>
          <ul className="pcoded-item pcoded-left-item">
            {/* <li className="">
              <Link to="/terms">
                <span className="pcoded-micon">
                  <i className="feather icon-refresh-ccw"></i>
                </span>
                <span className="pcoded-mtext">Terms & conditions</span>
              </Link>
            </li> */}
            {/* 
            <li className="">
              <Link to="/refund-policy">
                <span className="pcoded-micon">
                  <i className="feather icon-refresh-ccw"></i>
                </span>
                <span className="pcoded-mtext">Refund Policy</span>
              </Link>
            </li> */}
            {/* <li className="">
              <Link to="/privacy-policy">
                <span className="pcoded-micon">
                  <i className="feather icon-refresh-ccw"></i>
                </span>
                <span className="pcoded-mtext">Privacy Policy</span>
              </Link>
            </li> */}
            {/* <li className="">
              <Link to="/cancellation-policy">
                <span className="pcoded-micon">
                  <i className="feather icon-refresh-ccw"></i>
                </span>
                <span className="pcoded-mtext">Cancellation Policy</span>
              </Link>
            </li> */}
            <li className="">
              <Link to="/about">
                <span className="pcoded-micon">
                  <i className="icofont icofont-law-document"></i>
                </span>
                <span className="pcoded-mtext">Profile</span>
              </Link>
            </li>
            {/* <li className="">
              <Link to="/contact-us">
                <span className="pcoded-micon">
                  <i className="feather icon-phone"></i>
                </span>
                <span className="pcoded-mtext">Contact Us</span>
              </Link>
            </li> */}
            {/* <li className="">
              <Link to="/contact-us/settings">
                <span className="pcoded-micon">
                  <i className="feather icon-info"></i>
                </span>
                <span className="pcoded-mtext">Contact Us Settings</span>
              </Link>
            </li> */}
          </ul>
          </ul>
        </div>
      </nav>
    );
  }
}

export default ForVendorSideNavBar;
