import React from 'react';
import { Link } from 'react-router-dom';
import {
  Col, Row
} from "reactstrap";
export default function CheckoutSuccess() {
  return (
    <div className="container mt-4">
    <div className="row m-4">
       <div className="col-md-6 mx-auto mt-4">
          <div className="payment mt-4">
             <div className="payment_header mt-4">
                <div className="check"><i className="fa fa-check" aria-hidden="true"></i></div>
             </div>
             <div className="content mt-4">
                <h1>Payment Success !</h1>
                <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. </p>
                <Link to="/home">Purchase New Plan</Link>
             </div>
             
          </div>
       </div>
    </div>
 </div>

  )
}
