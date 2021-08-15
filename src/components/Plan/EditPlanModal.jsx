/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CreateProductSchema } from "../../validationScrema/product";
import EditPlan from "./EditPlan";

const EditPlanModal = (props) => {
  const {
    buttonLabel,
    className,
    modal,
    setModal,
    plan,
    loadingPlan,
    setLoadingPlan,
  } = props;

  const toggle = () => setModal((prev) => !prev);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          {`${plan.id ? "Edit" : "Create"}`} Plan
        </ModalHeader>
        <EditPlan
          isCreatePlan={!plan.id}
          plan={plan}
          setModal={setModal}
          setLoadingPlan={setLoadingPlan}
          loadingPlan={loadingPlan}
        />
      </Modal>
    </div>
  );
};

export default EditPlanModal;
