import React from "react";
import { Link } from "react-router-dom";
import Constant from "../../Constant";
import SellerAdd from "./SellerAdd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class SellerAddTab extends React.Component {
  state = {};

  componentDidMount() {
    if (
      this.props.match.params.seller_id !== undefined &&
      this.props.match.params.seller_id !== null &&
      this.props.match.params.seller_id !== 0 &&
      this.props.match.params.seller_id !== ""
    ) {
      this.setState({ seller_id: this.props.match.params.seller_id });
    }
    // this.getLanguageList()
  }
  // getLanguageList = () => {
  //   var language_data = Constant.getLanguageList();
  //   this.setState({ language_data: language_data, language_id: language_data[0].id, isLoading: false });
  // }
  handleLanguage = (language_id) => {
    this.setState({ language_id: language_id });
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
                    <h4>
                      {this.props.match.params.seller_id ? "Edit" : "Add"}{" "}
                      Seller
                    </h4>
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
                      <Link to="/seller">Seller</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      {this.props.match.params.seller_id ? "Edit" : "Add"}{" "}
                      Seller
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="page-body">
            <div className="row">
              <div className="col-sm-12">
                <div className="card card-border-default">
                  <div className="card-block">
                    <ul className="nav nav-tabs  tabs" role="tablist">
                      {this.state.language_data !== undefined &&
                      this.state.language_data !== []
                        ? this.state.language_data.map((language) => (
                            <li
                              className="nav-item"
                              key={language.id}
                              onClick={this.handleLanguage.bind(
                                this,
                                language.id
                              )}
                            >
                              <a
                                className={
                                  this.state.language_id === language.id
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                                id={"language_" + language.id}
                                data-toggle="tab"
                                href={"#tyre_category_" + language.id}
                                role="tab"
                                aria-controls={"tyre_category_" + language.id}
                                aria-selected="true"
                              >
                                {language.name}{" "}
                              </a>
                            </li>
                          ))
                        : ""}
                    </ul>

                    <div className="tab-content tabs">
                      <div
                        className="tab-pane  active"
                        id={"tyre_category_" + this.state.language_id}
                        role="tabpanel"
                        aria-labelledby=""
                      >
                        {this.state.seller_id !== undefined &&
                        this.state.seller_id !== null &&
                        this.state.seller_id !== 0 &&
                        this.state.seller_id !== "" ? (
                          <SellerAdd
                            language_id={this.state.language_id}
                            goBack={this.props.history.goBack}
                            seller_id={this.state.seller_id}
                          />
                        ) : (
                          <SellerAdd
                            language_id={this.state.language_id}
                            goBack={this.props.history.goBack}
                          />
                        )}
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
const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    isAuthUser: state.isAuthUser,
    error:state.error
  };
};

SellerAddTab.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {  })(SellerAddTab);

