import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog(props) {
  return props.open ? (
    <div>
      <Dialog
        open={props.open}
        onClose={props.func}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Download</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div className="card-body">

            <div className="row">
            <div className="col-md-6">
                <div className="form-group row">
                <label className="row row-form-label">
                      Download Format
                    </label>
                  <div className="row">
                  <select
                        name="donwOption"
                        className="form-control col-md-12"
                        style={{ width: "200px" }}
                        //   value={this.state.status}
                        //   onChange={this.handleChange}
                      >
                        <option value selected>--select format--</option>
                        <option value={true}>Download CSV</option>
                        <option value={false}>Download Pdf</option>
                        <option value={false}>Download Excel</option>
                      </select>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.func} color="primary">
            Cancel
          </Button>
          <Button onClick={props.func} color="primary" autoFocus>
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  ) : null;
}
