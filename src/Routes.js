import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Login from "./common/Login.js";
import Home from "./common/Home.js";
import Dashboard from "./common/Dashboard.js";
import LanguageList from "./components/LanguageMaster/LanguageList.js";
import LanguageAdd from "./components/LanguageMaster/LanguageAdd.js";

import CategoryList from "./components/CategoryMaster/CategoryList.js";
import CategoryAddTab from "./components/CategoryMaster/CategoryAddTab.js";

import CountryList from "./components/LocationMaster/CountryMaster/CountryList.js";

import StateList from "./components/LocationMaster/StateMaster/StateList.js";
import StateAddTab from "./components/LocationMaster/StateMaster/StateAddTab.js";

import AreaList from "./components/LocationMaster/AreaMaster/AreaList.js";
import AreaAddTab from "./components/LocationMaster/AreaMaster/AreaAddTab.js";

import ProductList from "./components/ProductMaster/ProductList.js";
import ProductAddTab from "./components/ProductMaster/ProductAddTab.js";

import OrderList from "./components/OrdersMaster/OrderList.js";

import OrderView from "./components/OrdersMaster/OrderView.js";

// import BuyerPolicyTab from "./components/BuyerPolicy/BuyerPolicyTab.js";
import TermsAddTab from "./components/Terms/TermsAddTab.js";
import AboutUsAddTab from "./components/AboutUs/AboutUsAddTab.js";
import ContactUsList from "./components/ContactUs/ContactUsList.js";

import BannerList from "./components/BannerMaster/BannerList.js";
import BannerAddTab from "./components/BannerMaster/BannerAddTab.js";
import GeneralSettingAddTab from "./components/Configurable/OrderValue&PrepaidValue/OrderValuePrepaidAddTab.js";

import UserList from "./components/UserMaster/Customer/UserList.js";
import UserAddTab from "./components/UserMaster/Customer/UserAddTab.js";
// import UserArticle from "./components/UserMaster/Customer/UserArticle.js";
// import Wishlist from "./components/UserMaster/Customer/Wishlist.js";
// import CustomerAddressList from "./components/UserMaster/Customer/CustomerAddressList.js";

import AttributeList from "./components/AttributeMaster/AttributeList.js";
import AttributeAddTab from "./components/AttributeMaster/AttributeAddTab.js";

import AttributeValueList from "./components/AttributeValueMaster/AttributeValueList.js";
import AttributeValueAddTab from "./components/AttributeValueMaster/AttributeValueAddTab.js";

import BlogList from "./components/BlogMaster/BlogList.js";
import BlogAddTab from "./components/BlogMaster/BlogAddTab.js";
import BlogComments from "./components/BlogMaster/BlogComments.js";

import CustomizedList from "./components/CustomizedProductMaster/CustomizedList.js";
import CustomizedAddTab from "./components/CustomizedProductMaster/CustomizedAddTab.js";
import CountryAddTab from "./components/LocationMaster/CountryMaster/CountryAddTab.js";
import RefundPolicyAddTab from "./components/RefundPolicy/RefundPolicyAddTab.js";
import PrivacyPolicyAddTab from "./components/PrivacyPolicy/PrivacyPolicyAddTab.js";
import CancellationPolicyAddTab from "./components/CancellationPolicy/CancellationPolicyAddTab.js";
import SellerList from "./components/SellerMaster/SellerList.js";
import SellerAddTab from "./components/SellerMaster/SellerAddTab.js";
import SellerpincodeList from "./components/SellerPincode/SellerPincodeList.js";
import SellerPincodeAddTab from "./components/SellerPincode/SellerPincodeAddTab.js";
import SellerProductAddTab from "./components/SellerProduct/SellerProductAddTab.js";
import SellerProductList from "./components/SellerProduct/SellerProductList.js";
import RoleList from "./components/RoleCreationMaster/RoleList.js";
import RoleCreationTabAdd from "./components/RoleCreationMaster/RoleCreationTabAdd.js";
import PaymentTabAdd from "./components/PaymentMaster/PaymentTabAdd.js";
import PaymentList from "./components/PaymentMaster/PaymentList.js";
import OrderValuePrepaidAddTab from "./components/Configurable/OrderValue&PrepaidValue/OrderValuePrepaidAddTab.js";
import DeliveryChargesAddTab from "./components/Configurable/DeliveryCharge/DeliveryChargesAddTab.js";
import CartValueAddTab from "./components/Configurable/CartValue/CartValueAddTab.js";
import OrderLimitAddTab from "./components/Configurable/OrderLimit/OrderLimitAddTab.js";
import CityList from "./components/LocationMaster/CityMaster/CityList.js";
import CityAddTab from "./components/LocationMaster/CityMaster/CityAddTab.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ImportData from "./common/ImportData.js";
import OrderCompleted from "./components/OrdersMaster/OrderCompleted.js";
import OrderPending from "./components/OrdersMaster/OrderPending.js";
import OrderCancelled from "./components/OrdersMaster/OrderCancelled.js";
import InventryUpdate from "./components/Inventory/InventryUpdate.js";
import CompletedDelivery from "./components/DeliveryMaster/CompletedDelivery.js";
import InProcessDelivery from "./components/DeliveryMaster/InProcessDelivery.js";
import DelayedDelivery from "./components/DeliveryMaster/DelayedDelivery.js";
import PrepaidOrder from "./components/PaymentMaster/PrepaidOrder.js";
import PostPaidOrder from "./components/PaymentMaster/PostPaidOrder.js";
import Invocie from "./components/Invoice/Invocie.js";
import SellerPinCodeMappingReport from "./components/Reports/SellerPinCodeMappingReport.js";
import PriceUpload from "./components/Reports/PriceUpload.js";
import OrderCancellationAnalysis from "./components/Reports/OrderCancellationAnalysis.js";
import SellerPerformanceReports from "./components/Reports/SellerPerformanceReports.js";
import OffenderReport from "./components/Reports/OffenderReport.js";
import ProfitabilityReportSellerWise from "./components/Reports/ProfitabilityReportSellerWise.js";
import CODPostpaidOrder from "./components/Reports/CODPostpaidOrder.js";
import SalesRegister from "./components/Reports/SalesRegister.js";
import OrderRegister from "./components/Reports/OrderRegister.js";
import DailyPaymentRegister from "./components/Reports/DailyPaymentRegister.js";
import ProductMasterUpload from "./components/Reports/ProductMasterUpload.js";
import SellerUpload from "./components/Reports/SellerUpload.js";
import ConsumerFeedbackReport from "./components/Reports/ConsumerFeedbackReport.js";
import InventoryUploadReport from "./components/Reports/InventoryUploadReport.js";
import ExceptionalAlertReport from "./components/Reports/ExceptionalAlertReport.js";
import OrderFillRateReport from "./components/Reports/OrderFillRateReport.js";
import SellerWiseBelowReOrderLevel from "./components/Reports/SellerWiseBelowReOrderLevel.js";
import OrderFillTimeReport from "./components/Reports/OrderFillTimeReport.js";
import HomeMasterList from "./components/HomeMaster/HomeMasterList.js";
import HomeAddTab from "./components/HomeMaster/HomeAddTab.js";
import CouponUsageReport from "./components/Reports/CouponUsageReport.js";
import CouponList from "./components/CouponMaster/CouponList.js";
import CouponAddTab from "./components/CouponMaster/CouponAddTab.js";
import HoAdminList from "./components/UserMaster/HOAdmin/HoAdminList.js";
import HoAdminAddTab from "./components/UserMaster/HOAdmin/HoAdminAddTab.js";
import ZonalList from "./components/UserMaster/ZonalAdmin/ZonalList.js";
import ZonalAddTab from "./components/UserMaster/ZonalAdmin/ZonalAddTab.js";
import UserSellerList from "./components/UserMaster/Seller/UserSellerList.js";
import UserSellerAddTab from "./components/UserMaster/Seller/UserSellerAddTab.js";
import CustomerReport from "./components/Reports/CustomerReports.js";
import DeliveryBoyReport from "./components/Reports/DeliveryBoyReport.js";
import DeliveryBoyManage from "./components/DeliveryMaster/DeliveryBoyManage.js";
import DeliveryBoyList from "./components/DeliveryMaster/DeliveryBoyList.js";
import DeliveryBoyAddTab from "./components/DeliveryMaster/DeliveryBoyAddTab.js";
import SellerProductCatalogueList from "./components/SellerProductCatelog/SellerProductCatalogueList.js";
import SellerProductCatalogueAddTab from "./components/SellerProductCatelog/SellerProductCatalogueAddTab.js";
import CustomerNotification from "./components/Notification/CustomerNotification.js";
import SellerNotification from "./components/Notification/SellerNotifcation.js";
import SuperAdminNotification from "./components/Notification/SuperAdminNotification.js";
import LowInventoryReport from "./components/Reports/LowInventoryReport.js";
import CancellationRefund from "./components/Reports/CancellationRefund.js";
import AboutUsDetails from "./components/AboutUs/AboutUsDetails.js";
class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router baseName={"/"}>
        {this.props.loginData.user.role !== "admin" ? (
          <>
            {this.props.loginData.user.role === "seller" ? (
              <Home>
                <Route exact path={"/"} component={Dashboard} />
                <Route exact path={"/products"} component={ProductList} />
                <Route
                  exact
                  path={"/products/add/:product_id?"}
                  component={ProductAddTab}
                />
                <Route exact path={"/orders"} component={OrderList} />
                <Route
                  exact
                  path={"/orders-completed"}
                  component={OrderCompleted}
                />
                <Route
                  exact
                  path={"/orders-pending"}
                  component={OrderPending}
                />
                <Route
                  exact
                  path={"/orders-cancelled"}
                  component={OrderCancelled}
                />
                <Route
                  exact
                  path={"/seller-product-catalogue"}
                  component={SellerProductCatalogueList}
                />
                <Route
                  exact
                  path={"/seller-product-catalogue/add/:catalogue_id?"}
                  component={SellerProductCatalogueAddTab}
                />

                <Route exact path={"/inventory"} component={InventryUpdate} />
                <Route
                  exact
                  path={"/delivery-delayed"}
                  component={DelayedDelivery}
                />
                <Route
                  exact
                  path={"/delivery-completed"}
                  component={CompletedDelivery}
                />
                <Route
                  exact
                  path={"/delivery-inprocess"}
                  component={InProcessDelivery}
                />
                <Route
                  exact
                  path={"/prepaid-orders"}
                  component={PrepaidOrder}
                />
                <Route
                  exact
                  path={"/postpaid-orders"}
                  component={PostPaidOrder}
                />
                <Route exact path={"/invoice"} component={Invocie} />
                <Route
                  exact
                  path={"/delivery-boy-manage"}
                  component={DeliveryBoyManage}
                />
                <Route
                  exact
                  path={"/delivery-boy-list"}
                  component={DeliveryBoyList}
                />
                <Route
                  exact
                  path={"/delivery-boy/add:deliveryboy_id?"}
                  component={DeliveryBoyAddTab}
                />
                <Route exact path={"/price-upload"} component={PriceUpload} />
                <Route
                  exact
                  path={"/delivery-boy-report"}
                  component={DeliveryBoyReport}
                />
                <Route
                  exact
                  path={"/order-cancellation-analysis"}
                  component={OrderCancellationAnalysis}
                />

                <Route
                  exact
                  path={"/cod-prepaid-order"}
                  component={CODPostpaidOrder}
                />
                <Route
                  exact
                  path={"/cancellation-refund-report"}
                  component={CancellationRefund}
                />
                <Route
                  exact
                  path={"/low-inventory-report"}
                  component={LowInventoryReport}
                />
                <Route
                  exact
                  path={"/sales-register"}
                  component={SalesRegister}
                />
                <Route
                  exact
                  path={"/order-register"}
                  component={OrderRegister}
                />
                <Route
                  exact
                  path={"/daily-payment-register"}
                  component={DailyPaymentRegister}
                />
                <Route
                  exact
                  path={"/product-master-upload"}
                  component={ProductMasterUpload}
                />
                <Route
                  exact
                  path={"/consumer-feedback-report"}
                  component={ConsumerFeedbackReport}
                />
                <Route
                  exact
                  path={"/inventory-upload-report"}
                  component={InventoryUploadReport}
                />
                <Route exact path={"/importData"} component={ImportData} />
                <Route exact path={"/about"} component={AboutUsDetails} />
                <Route exact path={"/about/profile-edit/:profile_id?"} component={AboutUsAddTab} />
                {/* <Route exact path={"/contact-us"} component={ContactUsList} /> */}
              </Home>
            ) : (
              <Route exact path={"/"} component={Login} />
            )}
          </>
        ) : (
          <Home>
            <Route exact path={"/"} component={Dashboard} />
            <Route exact path={"/languages"} component={LanguageList} />
            <Route
              exact
              path={"/languages/add/:language_id?"}
              component={LanguageAdd}
            />
            <Route exact path={"/importData"} component={ImportData} />
            {/* <Route exact path={"/users"} component={UserList} /> */}
            <Route exact path={"/users-customer"} component={UserList} />
            <Route
              exact
              path={"/notification-customer"}
              component={CustomerNotification}
            />
            <Route
              exact
              path={"/notification-seller"}
              component={SellerNotification}
            />
            <Route
              exact
              path={"/notification-superadmin"}
              component={SuperAdminNotification}
            />
            <Route
              exact
              path={"/users-customer/add/:customer_id?"}
              component={UserAddTab}
            />
            <Route exact path={"/users-seller"} component={UserSellerList} />
            <Route
              exact
              path={"/users-seller/add/:seller_id?"}
              component={UserSellerAddTab}
            />
            <Route exact path={"/users-hoAdmin"} component={HoAdminList} />
            <Route
              exact
              path={"/users-hoAdmin/add/:hoAdmin_id?"}
              component={HoAdminAddTab}
            />
            <Route exact path={"/users-zonal"} component={ZonalList} />
            <Route
              exact
              path={"/users-zonal/add/:zonal_id?"}
              component={ZonalAddTab}
            />
            {/* <Route
              exact
              path={"/users/add/:customer_id?"}
              component={UserAddTab}
            /> */}
            {/* <Route
              exact
              path={"/users/:customer_id/address"}
              component={CustomerAddressList}
            /> */}
            {/* <Route exact path={"/users/article"} component={UserArticle} />
            <Route
              exact
              path={"/users/wishlist/:customer_id"}
              component={Wishlist}
            /> */}
            <Route exact path={"/category"} component={CategoryList} />
            <Route
              exact
              path={"/category/add/:category_id?"}
              component={CategoryAddTab}
            />
            <Route
              exact
              path={"/ordervalue&_prepaidorder_value"}
              component={OrderValuePrepaidAddTab}
            />
            <Route
              exact
              path={"/delivery_charges"}
              component={DeliveryChargesAddTab}
            />
            <Route exact path={"/cart_value"} component={CartValueAddTab} />
            <Route exact path={"/order_limit"} component={OrderLimitAddTab} />
            <Route exact path={"/payment"} component={PaymentList} />
            <Route exact path={"/home-master"} component={HomeMasterList} />
            <Route exact path={"/home-master/add"} component={HomeAddTab} />
            <Route
              exact
              path={"/payment/add/:payment_type_id?"}
              component={PaymentTabAdd}
            />
            <Route exact path={"/seller"} component={SellerList} />
            <Route
              exact
              path={"/seller/add/:seller_id?"}
              component={SellerAddTab}
            />
            <Route
              exact
              path={"/sellerpincode"}
              component={SellerpincodeList}
            />
            <Route
              exact
              path={"/sellerpincode/add/:seller_id?"}
              component={SellerPincodeAddTab}
            />
            <Route
              exact
              path={"/sellerproduct"}
              component={SellerProductList}
            />
            <Route
              exact
              path={"/sellerproduct/add/:seller_id?"}
              component={SellerProductAddTab}
            />
            <Route exact path={"/role"} component={RoleList} />
            <Route
              exact
              path={"/role/add/:role_id?"}
              component={RoleCreationTabAdd}
            />
            <Route exact path={"/blog"} component={BlogList} />
            <Route exact path={"/blog/add/:blog_id?"} component={BlogAddTab} />
            <Route exact path={"/blog-comments"} component={BlogComments} />
            <Route exact path={"/banner"} component={BannerList} />
            <Route
              exact
              path={"/banner/add/:banner_id?"}
              component={BannerAddTab}
            />
            <Route exact path={"/coupon-master"} component={CouponList} />
            <Route
              exact
              path={"/coupon-master/add/:coupon_id?"}
              component={CouponAddTab}
            />
            <Route exact path={"/products"} component={ProductList} />
            <Route
              exact
              path={"/products/add/:product_id?"}
              component={ProductAddTab}
            />
            <Route exact path={"/customized"} component={CustomizedList} />
            <Route
              exact
              path={"/customized/add/:customized_id?"}
              component={CustomizedAddTab}
            />
            <Route exact path={"/attributes"} component={AttributeList} />
            <Route
              exact
              path={"/attributes/add/:attribute_id?"}
              component={AttributeAddTab}
            />
            <Route
              exact
              path={"/attribute-values/:attribute_id"}
              component={AttributeValueList}
            />
            <Route
              exact
              path={"/attribute-values/:attribute_id/add/:attribute_value_id?"}
              component={AttributeValueAddTab}
            />
            <Route exact path={"/orders"} component={OrderList} />
            <Route
              exact
              path={"/orders/view/:order_id"}
              component={OrderView}
            />
            <Route exact path={"/country"} component={CountryList} />
            <Route
              exact
              path={"/country/add/:country_id?"}
              component={CountryAddTab}
            />
            <Route exact path={"/State"} component={StateList} />
            <Route
              exact
              path={"/State/add/:State_id?"}
              component={StateAddTab}
            />
            <Route exact path={"/area"} component={AreaList} />
            <Route exact path={"/area/add/:area_id?"} component={AreaAddTab} />
            <Route exact path={"/city"} component={CityList} />
            <Route exact path={"/city/add/:city_id?"} component={CityAddTab} />
            <Route
              exact
              path={"/seller-pin-code-mapping-report"}
              component={SellerPinCodeMappingReport}
            />
            <Route exact path={"/price-upload"} component={PriceUpload} />
            <Route
              exact
              path={"/coupon-usage-report"}
              component={CouponUsageReport}
            />
            <Route
              exact
              path={"/order-cancellation-analysis"}
              component={OrderCancellationAnalysis}
            />
            <Route
              exact
              path={"/seller-performance-reports"}
              component={SellerPerformanceReports}
            />
            <Route exact path={"/offender-report"} component={OffenderReport} />
            <Route
              exact
              path={"/profitability-report-seller-wise"}
              component={ProfitabilityReportSellerWise}
            />
            <Route
              exact
              path={"/cod-prepaid-order"}
              component={CODPostpaidOrder}
            />
            <Route exact path={"/sales-register"} component={SalesRegister} />
            <Route exact path={"/customer-report"} component={CustomerReport} />
            <Route exact path={"/order-register"} component={OrderRegister} />
            <Route
              exact
              path={"/daily-payment-register"}
              component={DailyPaymentRegister}
            />
            <Route
              exact
              path={"/product-master-upload"}
              component={ProductMasterUpload}
            />
            <Route exact path={"/seller-upload"} component={SellerUpload} />{" "}
            <Route
              exact
              path={"/consumer-feedback-report"}
              component={ConsumerFeedbackReport}
            />
            {/* <Route
              exact
              path={"/inventory-upload-report"}
              component={InventoryUploadReport}
            /> */}
            <Route
              exact
              path={"/exceptional-alert-report"}
              component={ExceptionalAlertReport}
            />
            <Route
              exact
              path={"/order-fill-rate-report"}
              component={OrderFillRateReport}
            />
            <Route
              exact
              path={"/seller-wise-below-re-order-level"}
              component={SellerWiseBelowReOrderLevel}
            />
            <Route
              exact
              path={"/order-fill-time-report"}
              component={OrderFillTimeReport}
            />
            <Route
              exact
              path={"/refund-policy"}
              component={RefundPolicyAddTab}
            />
            <Route
              exact
              path={"/privacy-policy"}
              component={PrivacyPolicyAddTab}
            />
            <Route
              exact
              path={"/cancellation-policy"}
              component={CancellationPolicyAddTab}
            />
            <Route exact path={"/terms"} component={TermsAddTab} />
            <Route exact path={"/about"} component={AboutUsAddTab} />
            <Route exact path={"/contact-us"} component={ContactUsList} />
            <Route
              exact
              path={"/contact-us/settings"}
              component={GeneralSettingAddTab}
            />
          </Home>
        )}
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginData: state.login,
  };
};
Routes.propTypes = {
  login: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(Routes);
