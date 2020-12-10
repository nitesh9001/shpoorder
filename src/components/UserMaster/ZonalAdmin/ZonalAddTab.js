import React from "react";
import { Link } from "react-router-dom";
import ZonalAdd from "./ZonalAdd";
import Constant from "../../../Constant.js";

class ZonalAddTab extends React.Component {
  state = {};
  getLanguages = () => {
    var that = this;
    var data = new URLSearchParams();
    fetch(Constant.getAPI() + "/language/get", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      if (json.status === true) {
        that.setState({ language_data: json.result, language_id: json.result[0].id });
      } else {
        console.log("languages not found");
      }
    })
  }
  componentDidMount() {
    this.getLanguages();
    if (this.props.match.params.zonal_id !== undefined && this.props.match.params.zonal_id !== null && this.props.match.params.zonal_id !== 0 && this.props.match.params.zonal_id !== '') {
      this.setState({ zonal_id: this.props.match.params.zonal_id })
      console.log(this.props.match.params.zonal_id)
    }
    if (localStorage.getItem('superadminad_role') === "Zonal Admin") {
      this.setState({ zonal_id: localStorage.getItem('superadminad_uid') })
      console.log(this.props.match.params.zonal_id)
    }
  }
  handleLanguage = (language_id) => {
    this.setState({ language_id: language_id })
  }
  render() {
    return (
      <div className="main-body">
        <div className="page-wrapper">
          <div className="page-header">
            <div className="row align-items-end">
              <div className="col-lg-8">
                <div className="page-header-title">
                  <div className="d-inline">
                    {
                      localStorage.getItem('superadminad_role') === "Zonal Admin"
                        ?
                        <h4>Edit Profile</h4>
                        :
                        <h4>{this.props.match.params.zonal_id ? "Edit" : "Add"}{" "} Zonal Admin</h4>
                    }
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="page-header-breadcrumb">
                  {
                    localStorage.getItem('superadminad_role') === "Zonal Admin"
                      ?
                      <ul className="breadcrumb-title">
                        <li className="breadcrumb-item">
                          <Link to="/">
                            <i className="feather icon-home"></i> </Link>
                        </li>
                        <li className="breadcrumb-item active">Edit Profile</li>
                      </ul>
                      :
                      <ul className="breadcrumb-title">
                        <li className="breadcrumb-item">
                          <Link to="/">
                            <i className="feather icon-home"></i> </Link>
                        </li>
                        <li className="breadcrumb-item">
                          <Link to="/users-zonal">
                            Zonal Admin</Link>
                        </li>
                        <li className="breadcrumb-item active">
                          {this.props.match.params.zonal_id ? "Edit" : "Add"}{" "} Zonal Admin
                    </li>
                      </ul>
                  }
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
                      {
                        this.state.language_data !== undefined && this.state.language_data !== [] ? this.state.language_data.map(language =>
                          <li className="nav-item" key={language.id} onClick={this.handleLanguage.bind(this, language.id)}>
                            <a className={this.state.language_id === language.id ? "nav-link active" : "nav-link"} id={'language_' + language.id}
                              data-toggle="tab"
                              href={"#add_dealer_" + language.id}
                              role="tab"
                              aria-controls={"add_dealer_" + language.id} aria-selected="true">{language.name} </a>
                          </li>
                        ) : ""}
                    </ul>
                    <div className="tab-content tabs">
                      <div className="tab-pane  active"
                        id={"add_dealer_" + this.state.language_id} role="tabpanel" aria-labelledby="">
                        {
                          this.state.zonal_id !== undefined &&
                            this.state.zonal_id !== null &&
                            this.state.zonal_id !== 0 &&
                            this.state.zonal_id !== ''
                            ?
                            <ZonalAdd language_id={this.state.language_id}
                              goBack={this.props.history.goBack}
                              zonal_id={this.state.zonal_id} />
                            :
                            <ZonalAdd
                              language_id={this.state.language_id}
                              goBack={this.props.history.goBack} />
                        }

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    );

  }
}

export default ZonalAddTab;
