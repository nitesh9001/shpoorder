import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactToPdf from "react-to-pdf";
// import {  Tooltip ,Button} from "@material-ui/core";
const ref = React.createRef();
class Invocie extends Component {
  state = {
    open: false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    orders_list: {
      id: 1,
      "invoice ID": "In-GSTV-i1",
      "seller Id": "s-id-1",
      "seller Address": "24/5 B, Abc apartment,Ashram road, Ahmedabad",
      "gst Details": "14-SGtInch sjf ",
      "customer Name": "Nitesh",
      "customer Address": "24/5 B, Abc apartment,Ashram road, Ahmedabad ",
      "customer Contact Details": "795xxxxxx0",
      "order List": "--",
      "order Price": "1000 INR",
      "total Price": "1500",
      igst: "IGST234PNR",
      csgt: "CGST2347HNFG",
    },
  };

  render() {
    const options = {
      orientation: "protrait",
      // // unit: 'in',
      // format: [2880,1880]
    };
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Generate Invoice</h4>
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
                      <li className="breadcrumb-item active">
                        Generate Invoice
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="page-body">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card" ref={ref}>
                    <div className="card-block">
                      {Object.entries(this.state.orders_list).map(([k, v]) => {
                        return (
                          <div
                            className="row justify-content-center"
                            key={k.id}
                          >
                            <div className="col-md-8">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-uppercase">
                                  {k}
                                </label>
                                <span>:</span>
                                <div className="col-sm-6">
                                  <label className="text-capitalize">{v}</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <ReactToPdf
                        targetRef={ref}
                        filename="invoice.pdf"
                        options={options}
                        scale={1}
                      >
                        {({ toPdf }) => (
                          <button
                            onClick={toPdf}
                            className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                            data-modal="modal-13"
                          >
                            <i className="icofont icofont-download m-r-5"></i>{" "}
                            Download{" "}
                          </button>
                        )}
                      </ReactToPdf>
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

export default Invocie;
