import React from "react";
import { Link } from "react-router-dom";

class SideNavBar extends React.Component {
  render() {
    return (
      <nav className="pcoded-navbar noprint" id="admin_menu">
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
                  <i className="icofont icofont-contact-add"></i>
                </span>
                <span className="pcoded-mtext">User Creation </span>
              </a>
              <ul className="pcoded-submenu">
                <li className=" ">
                  <Link to="/users-hoAdmin">
                    <span className="pcoded">HO Admin</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/users-zonal">
                    <span className="pcoded">Zonal Admin</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/users-seller">
                    <span className="pcoded">Seller</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/users-customer">
                    <span className="pcoded">Customer</span>
                  </Link>
                </li>
              </ul>
            </li>

            <div className="pcoded-navigatio-lavel">Master</div>
            <li className=" ">
              <Link to="/home-master">
                <span className="pcoded-micon">
                  <i className="icofont icofont-home"></i>
                </span>
                <span className="pcoded-mtext">Home Master</span>
              </Link>
            </li>
            <li className=" ">
              <Link to="/category">
                <span className="pcoded-micon">
                  <i className="feather icon-jfi-view-grid"></i>
                </span>
                <span className="pcoded-mtext">Category Master</span>
              </Link>
            </li>
            <li className=" ">
              <Link to="/products">
                <span className="pcoded-micon">
                  <i className="feather icon-command"></i>
                </span>
                <span className="pcoded-mtext">Product Master Upload</span>
              </Link>
            </li>
            <li className="">
              <Link to="/seller">
                <span className="pcoded-micon">
                  <i className="icofont icofont-users-alt-3"></i>
                </span>
                <span className="pcoded-mtext">Seller Details</span>
              </Link>
            </li>
            <li className=" ">
              <Link to="/sellerpincode">
                <span className="pcoded-micon">
                  <i className="icofont icofont-location-pin"></i>
                </span>
                <span className="pcoded-mtext">Seller Pin Code</span>
              </Link>
            </li>
          </ul>
          <ul className="pcoded-item pcoded-left-item">
            <li className=" ">
              <Link to="/sellerproduct">
                <span className="pcoded-micon">
                  <i className="feather icon-image"></i>
                </span>
                <span className="pcoded-mtext">Seller Product</span>
              </Link>
            </li>
            <li className=" ">
              <Link to="/payment">
                <span className="pcoded-micon">
                  <i className="icofont icofont-credit-card"></i>
                </span>
                <span className="pcoded-mtext">Payment Method</span>
              </Link>
            </li>

            <li className=" ">
              <Link to="/role">
                <span className="pcoded-micon">
                  <i className="icofont icofont-contact-add"></i>
                </span>
                <span className="pcoded-mtext">Role Creation & Mapping</span>
              </Link>
            </li>

            {/* <li className=" ">
              <Link to="/blog">
                <span className="pcoded-micon"><i className="feather icon-jfi-view-grid"></i></span>
                <span className="pcoded-mtext">Blog Master</span>
              </Link>
            </li> */}

            {/* <li className=" ">
              <Link to="/products">
                <span className="pcoded-micon">
                  <i className="icofont icofont-site-map"></i>
                </span>
                <span className="pcoded-mtext">Role Mapping</span>
              </Link>
            </li> */}
            <li className=" pcoded-hasmenu">
              <a href="javascript:void(0)">
                <span className="pcoded-micon">
                  <i className="icofont icofont-automation"></i>
                </span>
                <span className="pcoded-mtext">Configurable Feild </span>
              </a>
              <ul className="pcoded-submenu">
                <li className=" ">
                  <Link to="/ordervalue&_prepaidorder_value">
                    <span className="pcoded">
                      Order Value & Prepaid Order Value
                    </span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/delivery_charges">
                    <span className="pcoded">Delivery Charges</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/cart_value">
                    <span className="pcoded">Cart Value</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/order_limit">
                    <span className="pcoded">Order Limit</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className=" ">
              <Link to="/coupon-master">
                <span className="pcoded-micon">
                  <i className="icofont icofont-contact-add"></i>
                </span>
                <span className="pcoded-mtext">Coupon Master</span>
              </Link>
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
                  <Link to="/seller-pin-code-mapping-report">
                    <span className="pcoded">
                      Seller Pin Code Mapping Report
                    </span>
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
                  <Link to="/seller-performance-reports">
                    <span className="pcoded">Seller Performance Reports</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/offender-report">
                    <span className="pcoded">Offender Report</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/profitability-report-seller-wise">
                    <span className="pcoded">
                      Profitability Report -seller wise
                    </span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/cod-prepaid-order">
                    <span className="pcoded">COD Postpaid Order</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/coupon-usage-report">
                    <span className="pcoded">Coupon Usage Report</span>
                  </Link>
                </li>
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
                  <Link to="/customer-report">
                    <span className="pcoded">Customer Report</span>
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
                  <Link to="/seller-upload">
                    <span className="pcoded">Seller Upload</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/consumer-feedback-report">
                    <span className="pcoded">Consumer Feedback Report</span>
                  </Link>
                </li>
                {/* <li className=" ">
                  <Link to="/inventory-upload-report">
                    <span className="pcoded">Inventory Upload Report</span>
                  </Link>
                </li> */}
                <li className=" ">
                  <Link to="/exceptional-alert-report ">
                    <span className="pcoded">Exceptional Alert Report </span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/order-fill-rate-report">
                    <span className="pcoded">Order Fill Rate Report</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/seller-wise-below-re-order-level">
                    <span className="pcoded">
                      Seller Wise Below Re-order level
                    </span>
                  </Link>
                </li>{" "}
                <li className=" ">
                  <Link to="/order-fill-time-report">
                    <span className="pcoded">Order Fill Time Report</span>
                  </Link>
                </li>
              </ul>
            </li>

            {/* <li className=" ">
              <Link to="/languages">
                <span className="pcoded-micon"><i className="feather icon-globe"></i></span>
                <span className="pcoded-mtext">Language Master  </span>
              </Link>
            </li> */}
            <li className=" pcoded-hasmenu">
              <a href="javascript:void(0)">
                <span className="pcoded-micon">
                  <i className="icofont icofont-bell-alt"></i>
                </span>
                <span className="pcoded-mtext">Notification </span>
              </a>
              <ul className="pcoded-submenu">
                
                
                <li className=" ">
                  <Link to="/notification-superadmin">
                    <span className="pcoded">Super Admin</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/notification-seller">
                    <span className="pcoded">Seller</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/notification-customer">
                    <span className="pcoded">Customer</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li className=" pcoded-hasmenu">
              <a href="javascript:void(0)">
                <span className="pcoded-micon">
                  <i className="feather icon-map-pin"></i>
                </span>
                <span className="pcoded">Location Master</span>
              </a>
              <ul className="pcoded-submenu">
                <li className=" ">
                  <Link to="/country">
                    <span className="pcoded">Country</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/State">
                    <span className="pcoded">State</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/city">
                    <span className="pcoded">City</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/area">
                    <span className="pcoded">Area /Pincode</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <div className="pcoded-navigatio-lavel">Settings</div>
          <ul className="pcoded-item pcoded-left-item">
            <li className="">
              <Link to="/terms">
                <span className="pcoded-micon">
                  <i className="feather icon-refresh-ccw"></i>
                </span>
                <span className="pcoded-mtext">Terms & conditions</span>
              </Link>
            </li>
            {/* 
            <li className="">
              <Link to="/refund-policy">
                <span className="pcoded-micon">
                  <i className="feather icon-refresh-ccw"></i>
                </span>
                <span className="pcoded-mtext">Refund Policy</span>
              </Link>
            </li> */}
            <li className="">
              <Link to="/privacy-policy">
                <span className="pcoded-micon">
                  <i className="feather icon-refresh-ccw"></i>
                </span>
                <span className="pcoded-mtext">Privacy Policy</span>
              </Link>
            </li>
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
                <span className="pcoded-mtext">About Us</span>
              </Link>
            </li>
            <li className="">
              <Link to="/contact-us">
                <span className="pcoded-micon">
                  <i className="feather icon-phone"></i>
                </span>
                <span className="pcoded-mtext">Contact Us</span>
              </Link>
            </li>
            {/* <li className="">
              <Link to="/contact-us/settings">
                <span className="pcoded-micon">
                  <i className="feather icon-info"></i>
                </span>
                <span className="pcoded-mtext">Contact Us Settings</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
    );
  }
}

export default SideNavBar;
