import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { CreateProductSchema } from "../../validationScrema/product";
import { createProduct, getProducts } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

export default function EditProduct({
  product = {},
  setModal,
  isCreateProdct,
  loadingProduct,
  setLoadingProduct,
}) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: product.title,
    },
    validationSchema: CreateProductSchema,
    onSubmit: (values) => {
      // console.log(values);
      setLoadingProduct(true);
      dispatch(createProduct(values, product.id || 0, setModal));
      // formik.resetForm();
    },
    enableReinitialize: true,
  });
  return (
    <React.Fragment>
      <ModalBody>
        <Form className="custom-input">
          <FormGroup>
            <label>Product Title</label>
            <Input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="Title"
              type="text"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        {loadingProduct ? (
          <Button color="primary">Loading..</Button>
        ) : (
          <Button color="primary" onClick={formik.handleSubmit}>
            {isCreateProdct ? "Create" : "Save"}
          </Button>
        )}
      </ModalFooter>
    </React.Fragment>
  );
}
