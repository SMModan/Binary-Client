/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CreateProductSchema } from "../../validationScrema/product";
import EditCoupon from "./EditCoupon";

const EditCouponModal = (props) => {
  const {
    buttonLabel,
    className,
    modal,
    setModal,
    coupon,
    loadingCoupon,
    setLoadingCoupon,
  } = props;

  const toggle = () => setModal((prev) => !prev);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          {`${coupon.id ? "Edit" : "Create"}`} Coupon
        </ModalHeader>
        <EditCoupon
          isCreateCoupon={!coupon.id}
          coupon={coupon}
          setModal={setModal}
          setLoadingCoupon={setLoadingCoupon}
          loadingCoupon={loadingCoupon}
        />
      </Modal>
    </div>
  );
};

export default EditCouponModal;
