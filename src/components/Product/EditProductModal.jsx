/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CreateProductSchema } from "../../validationScrema/product";
import EditProduct from "./EditProduct";

const EditProductModal = (props) => {
  const {
    buttonLabel,
    className,
    modal,
    setModal,
    product,
    loadingProduct,
    setLoadingProduct,
  } = props;

  const toggle = () => setModal((prev) => !prev);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          {`${product.id ? "Edit" : "Create"}`} Product
        </ModalHeader>
        <EditProduct
          isCreateProdct={!product.id}
          product={product}
          setModal={setModal}
          setLoadingProduct={setLoadingProduct}
          loadingProduct={loadingProduct}
        />
      </Modal>
    </div>
  );
};

export default EditProductModal;
