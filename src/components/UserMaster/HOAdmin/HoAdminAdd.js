import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../../Constant.js";
import $ from "jquery";
import ReactQuill from "react-quill";

class HOAdminAdd extends React.Component {
//   state = {
//     status: "open",
//     description: "",
//     refundPolicy: "",
//     selected_category: []
//   };
//   onHandleRefundPolicyChange = value => {
//     this.setState({ refundPolicy: value });
//   };
//   onHandleDescriptionChange = value => {
//     this.setState({ description: value });
//   };
//   componentDidUpdate(prevProps) {
//     if (prevProps.shop_id !== this.props.shop_id) {
//       this.setState({ shop_id: this.props.shop_id });
//       this.getShopDetails();
//     }
//     if (prevProps.language_id !== this.props.language_id) {
//       // if (prevProps.shop_id !== this.props.shop_id) {
//       //   this.setState({ shop_id: this.props.shop_id });
//       // }
//       this.getShopDetails();
//       this.getCategoryList();
//     }
//   }
//   handleChange = event => {
//     this.setState({ [event.target.name]: event.target.value });
//   };
//   getShopDetails = () => {
//     var that = this;
//     var data = new URLSearchParams();
//     // this.setState({ isSaving: true });
//     data.append("ShopId", that.props.shop_id);
//     data.append("LanguageId", that.props.language_id);
//     fetch(Constant.getAPI() + "/shop/get", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//         // "Authorization": localStorage.getItem('superadmin_auth')
//       },
//       body: data
//     }).then(function (response) {
//       return response.json();
//     }).then(function (json) {
//       if (json.status === true) {
//         for (var i = 0; i < json.result.length; i++) {
//           if (json.result[i].id === that.props.shop_id) {
//             var categories = []
//             for (var j = 0; j < json.result[i].Categories.length; j++) {
//               $("#shop_category_" + json.result[i].Categories[j].id).prop("checked", true);
//               categories.push(json.result[i].Categories[j].id);
//             }
//             if (json.result[i].Medium !== null) {
//               that.setState({
//                 image: json.result[i].Medium.url
//               });
//             }
//             that.setState({
//               users_data: json.result[i],
//               name: json.result[i].name,
//               email: json.result[i].email,
//               deliveryCharges: json.result[i].deliveryCharges,
//               approxDeliveryTime: json.result[i].approxDeliveryTime,
//               openTime: json.result[i].openTime,
//               closeTime: json.result[i].closeTime,
//               address: json.result[i].address,
//               description: json.result[i].description,
//               address: json.result[i].address,
//               refundPolicy: json.result[i].refundPolicy,
//               selected_category: categories,
//               // mobile: json.result[i].mobileNumber,
//               media_id: json.result[i].MediaId
//             });
//           }
//         }
//       } else {
//         that.setState({ users_data: {} });
//         // Swal.fire({
//         //   title: "Something went wrong. Try again after some Time.!",
//         //   icon: 'error',
//         //   text: "",
//         //   confirmButtonColor: "#3085d6",
//         //   cancelButtonColor: "#d33",
//         //   confirmButtonText: "Ok"
//         // })
//       }
//     })
//   }
//   getCategoryList = () => {
//     var that = this;
//     var data = new URLSearchParams();
//     data.append("LanguageId", that.props.language_id);
//     fetch(Constant.getAPI() + "/category/get", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: data
//     }).then(function (response) {
//       return response.json();
//     }).then(function (json) {
//       if (json.status === true) {
//         var category = []
//         for (var i = 0; i < json.result.length; i++) {
//           category.push(json.result[i]);
//           // if (json.result[i].child !== null && json.result[i].child !== [] && json.result[i].child.length > 0) {
//           //   for (var j = 0; j < json.result[i].child.length; j++) {
//           //     category.push(json.result[i].child[j]);
//           //   }
//           // }
//         }
//         that.setState({ category_list: category });
//       } else {
//         that.setState({ category_list: [] });
//         // Swal.fire({
//         //   title: "Something went wrong. Try again after some Time.!",
//         //   icon: 'error',
//         //   text: "",
//         //   confirmButtonColor: "#3085d6",
//         //   cancelButtonColor: "#d33",
//         //   confirmButtonText: "Ok"
//         // })
//       }
//     });
//   }
//   addShop = (media_id) => {
//     var that = this;
//     var data = new URLSearchParams();
//     this.setState({ isSaving: true });
//     if (media_id === undefined || media_id === null || media_id === "") {
//       that.setState({ isSaving: false });
//       Swal.fire("Add Shop Logo First.!");
//       return false;
//     }
//     if (that.state.email === undefined || that.state.email === null || that.state.email === "") {
//       that.setState({ isSaving: false });
//       Swal.fire("Enter Email Id");
//       return false;
//     }
//     if (that.state.password === undefined || that.state.password === null || that.state.password === "") {
//       that.setState({ isSaving: false });
//       Swal.fire("Enter Password");
//       return false;
//     }
//     if (that.state.name === undefined || that.state.name === null || that.state.name === "") {
//       that.setState({ isSaving: false });
//       Swal.fire("Enter Shop Name");
//       return false;
//     }
//     // if (that.state.mobile === undefined || that.state.mobile === null || that.state.mobile === "") {
//     //   that.setState({ isSaving: false });
//     //   Swal.fire("Enter Mobile Number");
//     //   return false;
//     // }
//     data.append("email", that.state.email);
//     data.append("password", that.state.password);
//     data.append("name", that.state.name);
//     data.append("refundPolicy", that.state.refundPolicy);
//     // data.append("deliveryCharges", that.state.deliveryCharges);
//     // data.append("approxDeliveryTime", that.state.approxDeliveryTime);
//     data.append("status", that.state.status);
//     data.append("openTime", that.state.openTime);
//     data.append("closeTime", that.state.closeTime);
//     data.append("description", that.state.description);
//     data.append("address", that.state.address);
//     data.append("MediaId", media_id);
//     data.append("LanguageId", that.props.language_id);
//     data.append("CategoryId", that.state.selected_category);
//     fetch(Constant.getAPI() + "/shop/register", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: data
//     }).then(function (response) {
//       return response.json();
//     }).then(function (json) {
//       if (json.status === true) {
//         Swal.fire("Added !", "Dealer has been Added", "success");
//         window.location.href = "#/shops"
//         that.setState({ isSaving: false });
//       } else {
//         that.setState({ isSaving: false });
//         Swal.fire({
//           title: "Something went wrong. Try again after some Time.!",
//           icon: 'error',
//           text: "",
//           confirmButtonColor: "#3085d6",
//           cancelButtonColor: "#d33",
//           confirmButtonText: "Ok"
//         })
//       }
//     })
//   };
//   updateShopDetails = (media_id) => {
//     var that = this;
//     var data = new URLSearchParams();
//     this.setState({ isSaving: true });
//     // if (media_id === undefined || media_id === null || media_id === "") {
//     //       that.setState({ isSaving: false });
//     //       Swal.fire("Add Shop Logo First.!");
//     //       return false;
//     //     }
//     // data.append("email", that.state.email);
//     data.append("email", that.state.email);
//     data.append("name", that.state.name);
//     if (that.state.refundPolicy !== undefined && that.state.refundPolicy !== null) {
//       data.append("refundPolicy", that.state.refundPolicy);
//     } else {
//       data.append("refundPolicy", "");
//     }
//     // data.append("deliveryCharges", that.state.deliveryCharges);
//     // data.append("approxDeliveryTime", that.state.approxDeliveryTime);
//     data.append("status", that.state.status);
//     data.append("openTime", that.state.openTime);
//     data.append("closeTime", that.state.closeTime);
//     if (that.state.description !== undefined && that.state.description !== null) {
//       data.append("description", that.state.description);
//     } else {
//       data.append("description", that.state.description);
//     }
//     data.append("address", that.state.address);
//     if (media_id !== undefined && media_id !== null) {
//       data.append("MediaId", media_id);
//       // } else {
//       //   data.append("MediaId", "");
//     }
//     data.append("LanguageId", that.props.language_id);
//     data.append("ShopId", that.props.shop_id);
//     data.append("CategoryId", that.state.selected_category);
//     fetch(Constant.getAPI() + "/shop/update", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": localStorage.getItem('superadmin_auth')
//       },
//       body: data
//     }).then(function (response) {
//       return response.json();
//     }).then(function (json) {
//       if (json.status === true) {
//         Swal.fire("Updated !", "Dealer has been Updated", "success");
//         if (localStorage.getItem('superadminad_role') === "shop") {
//           window.location.href = "#/"
//         } else {
//           window.location.href = "#/shops"
//         }
//         that.setState({ isSaving: false });
//       } else {
//         that.setState({ isSaving: false });
//         Swal.fire({
//           title: "Something went wrong. Try again after some Time.!",
//           icon: 'error',
//           text: "",
//           confirmButtonColor: "#3085d6",
//           cancelButtonColor: "#d33",
//           confirmButtonText: "Ok"
//         })
//       }
//     })
//   };
//   componentDidMount() {
//     this.getCategoryList();
//   }

//   handleImageUpload = (event) => {
//     document.getElementById('id_image_section_lable').innerHTML = "";
//     let element = $("#user_Image").get(0);
//     $("#id_image_section").empty();
//     this.setState({ accepted: element });
//     var proof_img = [];
//     let obj = {};
//     console.log(element.files);
//     this.setState({ user_Image: element.files });
//     for (var i = 0; i < element.files.length; i++) {
//       var file1 = element.files[i];
//       var img = document.createElement("img");
//       img.className = "img-100";
//       var filePath = URL.createObjectURL(file1);
//       img.src = filePath;
//       $("#id_image_section_lable").append(img);
//     }
//   }
//   uploadMedia = () => {
//     var that = this;
//     var form = $('#userImage')[0];
//     var data = new FormData(form);
//     // data.append('upload_for', 'user');
//     fetch(Constant.getAPI() + "/media/add", {
//       method: "post",
//       body: data
//     }).then(function (response) {
//       return response.json();
//     }).then(function (json) {
//       if (json.status === true) {
//         if (that.props.shop_id !== undefined) {
//           that.updateShopDetails(json.result[0].id);
//         } else {
//           that.addShop(json.result[0].id);
//         }
//       } else {
//         // that.setState({ category_data: [] });
//         console.log(json.error);
//       }
//     });
//   }
//   onSaveData = () => {
//     var that = this;
//     that.setState({ isSaving: true });
//     if (that.state.accepted) {
//       that.uploadMedia();
//     } else if (that.props.shop_id !== undefined) {
//       that.updateShopDetails(that.state.media_id);
//     } else {
//       that.addShop(that.state.media_id);
//     }

//   }
//   changeCategorySelection = (event) => {
//     var id = event.target.value;
//     let arr = this.state.selected_category;
//     var index = -1;
//     arr.find(function (value, i) {
//       if ((parseInt(value, 10) === parseInt(id, 10))) {
//         index = i;
//       }
//     }.bind(this))
//     if (index !== -1) {
//       arr.splice(index, 1);
//       this.setState({ selected_category: arr });
//     } else {
//       // obj = id;
//       arr.push(id);
//       this.setState({ selected_category: arr });
//     }
//   }
//   render() {
//     return (
//       <div className="">
//         <div className="card-body">
//           <div className="row">

//             <div className="col-md-6">
//               <div className="form-group row">
//                 <label className="col-sm-3 col-form-label">Shop Name</label>
//                 <div className="col-sm-9">
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="name"
                    
//                     placeholder="Shop Name"
//                     onChange={this.handleChange}
//                     value={this.state.name}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="form-group row">
//                 <label className="col-sm-3 col-form-label">Email</label>
//                 <div className="col-sm-9">
//                   <input
//                     type="email"
//                     className="form-control"
//                     name="email"
//                     id="shop_email"
//                     placeholder="Email"
//                     onChange={this.handleChange}
//                     value={this.state.email}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="form-group row">
//                 <label className="col-sm-3 col-form-label">Password</label>
//                 <div className="col-sm-9">
//                   <input
//                     type="password"
//                     className="form-control"
//                     name="password"
//                     id="shop_password"
//                     placeholder="Password"
//                     onChange={this.handleChange}
//                     value={this.state.password}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="form-group row">
//                 <label className="col-sm-3 col-form-label">Address</label>
//                 <div className="col-sm-9">
//                   <textarea
//                     rows={3}
//                     // cols={}
//                     className="form-control"
//                     name="address"
//                     id="address"
//                     placeholder="Address"
//                     onChange={this.handleChange}
//                     value={this.state.address}
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* <div className="col-md-6">
//               <div className="form-group row">
//                 <label className="col-sm-3 col-form-label">Delivery Charges(in KWD)</label>
//                 <div className="col-sm-9">
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="deliveryCharges"
//                     id="deliveryCharges"
//                     placeholder="Delivery Charges (in KWD)"
//                     onChange={this.handleChange}
//                     value={this.state.deliveryCharges}
//                   />
//                 </div>
//               </div>
//             </div> */}
//             {/* <div className="col-md-6">
//               <div className="form-group row">
//                 <label className="col-sm-3 col-form-label">Approx Delivery Time</label>
//                 <div className="col-sm-9">
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="approxDeliveryTime"
//                     id="approxDeliveryTime"
//                     placeholder="Approx Delivery Time"
//                     onChange={this.handleChange}
//                     value={this.state.approxDeliveryTime}
//                   />
//                 </div>
//               </div>
//             </div> */}
//             <div className="col-md-6">
//               <div className="form-group row">
//                 <label className="col-sm-3 col-form-label">Shop Opening Time</label>
//                 <div className="col-sm-9">
//                   <input
//                     type="time"
//                     className="form-control"
//                     name="openTime"
//                     id="openTime"
//                     placeholder="Shop Opening Time"
//                     onChange={this.handleChange}
//                     value={this.state.openTime}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="form-group row">
//                 <label className="col-sm-3 col-form-label">Shop Closing Time</label>
//                 <div className="col-sm-9">
//                   <input
//                     type="time"
//                     className="form-control"
//                     name="closeTime"
//                     id="closeTime"
//                     placeholder="Shop Closing Time"
//                     onChange={this.handleChange}
//                     value={this.state.closeTime}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="row">
//                 <div className="col-sm-3">
//                   User Image
//                 </div>
//                 <div className="col-sm-9">
//                   <form id="userImage" name="userImage" encType="multipart/form-data" className="text-capitalize">

//                     <div className="form-group">

//                       {/* <input onChange={this.handleChange} id="shop_Image" type="text" className="form-control" name="image" /> */}
//                       <input accept="image/*" onChange={this.handleImageUpload} id="user_Image" type="file" className="form-control" autoComplete="off" name="media"
//                         data-toggle="tooltip" title="Click To Upload Photo"
//                       />
//                       <div id="id_image_section_lable" className="pt-2">
//                         {
//                           this.state.image
//                             ?
//                             this.state.image !== null || this.state.image !== undefined || this.state.image !== {}
//                               ?
//                               <img src={this.state.image} alt=""
//                                 className="img-100" onError={e => {
//                                   e.target.src = ""
//                                 }} />
//                               :
//                               ''
//                             :
//                             ''
//                         }
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="form-group row">
//                 <label className="col-sm-3 col-form-label">Status</label>
//                 <div className="col-sm-9">
//                   <select name="status" className="form-control" value={this.state.status} onChange={this.handleChange}>
//                     <option value="open" name="open">Open</option>
//                     <option value="close" name="close">Closed</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-12">
//               <div className="form-group row">
//                 <label className="col-sm-2 col-form-label">Shop Description</label>
//                 <div className="col-sm-10">
//                   <ReactQuill
//                     value={this.state.description}
//                     onChange={this.onHandleDescriptionChange}
//                     style={{ height: "200px", marginBottom: '5%' }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-md-12">
//               <div className="form-group row">
//                 <label className="col-sm-2 col-form-label">Refund Policy</label>
//                 <div className="col-sm-10">
//                   <ReactQuill
//                     value={this.state.refundPolicy}
//                     onChange={this.onHandleRefundPolicyChange}
//                     style={{ height: "200px", marginBottom: '5%' }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-md-12">
//               <div className="form-group row">
//                 <label className="col-sm-2 col-form-label">Category</label>
//                 <div className="col-sm-10">
//                   <div className="p-20 z-depth-right-1 waves-effect " data-toggle="tooltip" data-placement="top" title="" data-original-title="Service List">
//                     <div className="row">
//                       {
//                         this.state.category_list !== undefined &&
//                           this.state.category_list !== null &&
//                           this.state.category_list !== [] &&
//                           this.state.category_list.length > 0 ? (
//                             this.state.category_list.map(category =>
//                               <div className=" col-sm-4" key={category.id}>
//                                 <div className="checkbox-fade fade-in-primary">
//                                   <label>
//                                     <input type="checkbox" id={"shop_category_" + category.id} value={category.id} onChange={this.changeCategorySelection} />
//                                     <span className="cr">
//                                       <i className="cr-icon icofont icofont-ui-check txt-primary"></i>
//                                     </span>
//                                     <span>{category.name}</span>
//                                   </label>
//                                 </div>
//                               </div>
//                             )) : ""
//                       }
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="row float-right p-3">
//             {
//               this.state.isSaving
//                 ?
//                 <button className="btn btn-grd-disabled mr-2" disabled>Saving...!</button>
//                 :
//                 <button onClick={this.onSaveData} className="btn btn-grd-disabled mr-2"><i className="icofont icofont-save"></i> Save</button>
//             }
//             {
//               localStorage.getItem('superadminad_role') === "shop"
//                 ?
//                 <Link to={"/"} className="btn btn-outline-dark"> Cancel </Link>
//                 :
//                 <Link to={"/shops"} className="btn btn-outline-dark"> Cancel </Link>
//             }
//           </div>
//         </div>
//       </div >

//     );
//   }
// }
state = {
  status: "Active",
  Customer_list: [
    {
      CustomerID: 1,
      CustomerName: "Mustafa",
      last_name:"Baiwala",
      civil_id: "0145869265",
      post: "5",
      duration: "7 Day",
      status: "Active",
      email: "mustafa@design-master.com",
      PhoneNo: "85858585",
      WhatsAppNo: "7878747850",
      CustomersImage: "./assets/images/user.png"
    },
    {
      CustomerID: 2,
      CustomerName: "car user2 ",
      post: "4",
      civil_id: "0145869265",
      duration: "7 Day",
      status: "Active",
      email: "user@gmail.com",
      PhoneNo: "7878747850",
      WhatsAppNo: "7878747850",
      CustomersImage: "./assets/images/user.png"
    },
  ],
};

componentWillMount() {
  if (this.props.user_id !== undefined) {
    this.setState({ user_id: this.props.user_id });
    this.getdealerDetails();
  }
}
componentDidUpdate(prevProps) {

  if (prevProps.user_id !== this.props.user_id) {
    this.setState({ user_id: this.props.user_id });
    this.getdealerDetails();
  }
}
handleChange = event => {
  this.setState({ [event.target.name]: event.target.value });
};
getdealerDetails = () => {
  var a = this.state.Customer_list.find((element) => {
    return element.CustomerID === this.props.user_id;
  })
  console.log(a)
  this.setState({
    sellers_data: a,
    first_name: a.CustomerName,
    last_name:a.last_name,
    Email: a.email,
    Mobile: a.PhoneNo,
    WhatsAppNo: a.WhatsAppNo,
    image_url: a.CustomersImage,
    CivilId:a.civil_id 
  });
}
adddealer = () => {
  var that = this;
  var data = new FormData();
  that.setState({ isSaving: true })
  if (
    that.state.first_name === undefined ||
    that.state.first_name === null ||
    that.state.first_name === ""
  ) {
    document.getElementById("first_name").focus();
    that.setState({ isSaving: false })
    return false;
  }
  Swal.fire("Added !", "user has been Added", "success");
  window.location.href = "#/customers"
  that.setState({ isSaving: false })
};
componentWillMount() {
  this.loadScript(process.env.PUBLIC_URL + "/assets/pages/filer/jquery.fileuploads.init.js");
}
loadScript(src) {
  let script = document.createElement("script");
  script.src = src;
  script.type = "text/javascript";
  document.head.append(script);
}
handleImageUpload = (event) => {
  document.getElementById('id_image_section_lable').innerHTML = "";
  let element = $("#user_Image").get(0);
  $("#id_image_section").empty();
  this.setState({ accepted: element });
  var proof_img = [];
  let obj = {};
  console.log(element.files);
  this.setState({ user_Image: element.files });
  for (var i = 0; i < element.files.length; i++) {
    var file1 = element.files[i];
    var img = document.createElement("img");
    img.className = "img-100";
    var filePath = URL.createObjectURL(file1);
    img.src = filePath;
    $("#id_image_section_lable").append(img);
  }
}
// uploadMedia = () => {
//   var that = this;
//   var form = $('#userImage')[0];
//   var data = new FormData(form);
//   data.append('upload_for', 'user');
//   fetch(Constant.getAPI() + "/mediaUpload", {
//     method: "post",
//     body: data
//   }).then(function (response) {
//     return response.json();
//   }).then(function (json) {
//     if (json.error === "SFD") {
//       that.editUser(json.result.media_id);
//     } else {
//       that.setState({ category_data: [] });
//       console.log(json.error);
//     }
//   });
// }
onSaveData = () => {
  var that = this;
  that.setState({ isSaving: true });
  if (that.state.accepted) {
    that.uploadMedia();
  } else {
    that.editUser(that.state.media_id);
  }
}
render() {
  return (
    <div className="">
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">First Name</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  id="first_name"
                  placeholder="First Name"
                  onChange={this.handleChange}
                  value={this.state.first_name}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Last Name</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  id="last_name"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                  value={this.state.last_name}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-9">
                <input
                  type="Email"
                  className="form-control"
                  name="Email"
                  id="Email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={this.state.Email}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">User Name</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="Password"
                  id="Password"
                  placeholder="userName"
                  onChange={this.handleChange}
                  value={this.state.Password}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Mobile</label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control"
                  name="Mobile"
                  id="Mobile"
                  placeholder="Mobile"
                  onChange={this.handleChange}
                  value={this.state.Mobile}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Code</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="CivilId"
                  id="CivilId"
                  placeholder="Code"
                  onChange={this.handleChange}
                  value={this.state.CivilId}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
          <div className="formgroup row">
                <label className="col-sm-3 col-form-label">Groups</label>
                <div className="col-sm-9">
                  <select
                    name="groups"
                    className="form-control"
                    value={this.state.group}
                    onChange={this.handleChange}
                  >
                  
                  <option>
                     --Select Group--
                    </option>
                    <option>
                     Group 1
                    </option>
                    <option>
                    Group 2
                    </option>
                    <option>
                    Group 3
                    </option>
                    <option>
                    Group 4
                    </option>
                  </select>
                </div>
              </div>
              </div>
         
         {/* <div className="col-md-6">
            <div className="row">
              <div className="col-sm-3">
                User Image
              </div>
              <div className="col-sm-9">
                <form id="userImage" name="userImage" encType="multipart/form-data" className="text-capitalize">

                  <div className="form-group">

                    <input accept="image/*" onChange={this.handleImageUpload} id="user_Image" type="file" className="form-control" autoComplete="off" name="media[]"
                      data-toggle="tooltip" title="Click To Upload Photo"
                    />
                    <div id="id_image_section_lable" className="pt-2">
                      {
                        this.state.image_url
                          ?
                          this.state.image_url !== null || this.state.image_url !== undefined || this.state.image_url !== {}
                            ?
                            <img src={this.state.image_url} alt=""
                              className="img-100" onError={e => {
                                e.target.src = ""
                              }} />
                            :
                            ''
                          :
                          ''
                      }
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-addon" id="basic-addon4">Status</span>
              <select name="status" className="form-control" value={this.state.status} onChange={this.handleChange}>
                <option value="active" name="active">Active</option>
                <option value="inactive" name="inactive">Inactive</option>
              </select>
            </div>
          </div>
         */}
         <div className="col-md-6">
          <div className="formgroup row">
                <label className="col-sm-3 col-form-label">Role</label>
                <div className="col-sm-9">
                  <select
                    name="status"
                    className="form-control"
                    value={this.state.status}
                    onChange={this.handleChange}
                  >
                    <option>
                     -- Select Role --
                    </option>
                    <option>
                      Zonal Admin
                    </option>
                    <option>
                      HO Admin
                    </option>
                    <option>
                      Seller
                    </option>
                  </select>
                </div>
              </div>
              </div>
          
        </div>
        
        <div className="row float-right p-3">
          {
            this.state.isSaving
              ?
              <button className="btn btn-grd-disabled mr-2" disabled>Saving...!</button>
              :
              <button onClick={this.adddealer}  className="btn btn-grd-disabled mr-2"><i className="icofont icofont-save"></i> Save</button>
          }
          <Link to={"/users"} className="btn btn-outline-dark">
            Cancel
      </Link>
        </div>
      </div>
    </div >

  );
}
}
export default HOAdminAdd;
