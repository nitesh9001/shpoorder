import React from "react";
import { Link } from "react-router-dom";
import RefundPolicyAdd from "./CancellationPolicyAdd";

class CancellationPolicyAddTab extends React.Component {
  state = {
    language_id: "en",
    language_data: [
      {
        language_id: "en",
        language_name: "English",
        language_code: "EN",
      },
      {
        language_id: "ar",
        language_name: "Arabic",
        language_code: "AR",
      },
    ],
  };

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
                    <h4>Cancellation Policy</h4>
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
                    <li className="breadcrumb-item active">Cancellation Policy</li>
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
                   
                    <br/>
                    <div className="tab-content tabs">
                      <div
                        className="tab-pane  active"
                        id={"refund_policy_" + this.state.language_id}
                        role="tabpanel"
                        aria-labelledby=""
                      >
                        {this.state.service_id !== undefined &&
                        this.state.service_id !== null &&
                        this.state.service_id !== 0 &&
                        this.state.service_id !== "" ? (
                          <RefundPolicyAdd
                            language_id={this.state.language_id}
                            goBack={this.props.history.goBack}
                            service_id={this.state.service_id}
                          />
                        ) : (
                          <RefundPolicyAdd
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

export default CancellationPolicyAddTab;
