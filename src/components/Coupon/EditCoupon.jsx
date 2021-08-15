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
import { CreateCouponSchema } from "../../validationScrema/coupon";
import { createCoupon, getCoupon } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function EditCoupon({
  coupon = {},
  setModal,
  isCreateCoupon,
  loadingCoupon,
  setLoadingCoupon,
}) {
  const durationDropdown = [
    {
      label: "Forever",
      value: "forever",
    },
    {
      label: "Once",
      value: "once",
    },
    {
      label: "Multiple months",
      value: "repeating",
    },
  ];
  const addMonths = (d, months) => {
    return d.setMonth(d.getMonth() + months);
  };
  const [apiFetch, setApiFetch] = useState(false);
  const [apiError, setApiError] = useState("");
  const dispatch = useDispatch();
  const [offType, setOffType] = useState(
    coupon.percent_off ? "percentage" : "amount"
  );
  const formik = useFormik({
    initialValues: {
      name: coupon.name,
      code: coupon.code,
      duration: (coupon.duration &&
        durationDropdown.find((item) => item.value === coupon.duration)) || {
        label: "Once",
        value: "once",
      },
      amount_off: coupon.amount_off || coupon.percent_off,
      duration_in_months: coupon.duration_in_months,
      expireDate: coupon.expireDate,
    },
    validationSchema: CreateCouponSchema,
    onSubmit: (values) => {
      const keyOff = offType === "amount" ? "amount_off" : "percent_off";
      let payload = { ...values };
      delete payload.amount_off;
      payload = {
        ...payload,
        [keyOff]: values.amount_off,
        duration: values.duration.value,
      };
      // console.log(payload);
      setApiFetch(true);
      setLoadingCoupon(true);
      dispatch(
        createCoupon(payload, coupon.id || 0, setModal, false, setApiError)
      );
      // formik.resetForm();
    },
    enableReinitialize: true,
  });
  useEffect(() => {
    setApiFetch(false);
  }, [apiError]);
  useEffect(() => {
    if (apiError) {
      setApiError("");
    }
  }, [formik.values]);
  const { errors, touched } = formik;
  return (
    <React.Fragment>
      <ModalBody>
        <Form className="custom-input">
          <Row>
            <Col md="12">
              <FormGroup>
                <label>Coupon name</label>
                <Input
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder="Coupon name"
                  type="text"
                  onBlur={formik.handleBlur}
                />
              </FormGroup>
              {errors.name && touched.name && (
                <React.Fragment>
                  <div
                    className="text-danger float-left ml-4"
                    // style={{ marginLeft: "40px" }}
                  >
                    {errors.name}
                  </div>
                  <br />
                </React.Fragment>
              )}
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup>
                <label>Coupon code</label>
                <Input
                  name="code"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  placeholder="Coupon code"
                  type="text"
                  onBlur={formik.handleBlur}
                />
              </FormGroup>
              {errors.code && touched.code && (
                <React.Fragment>
                  <div
                    className="text-danger float-left ml-4"
                    // style={{ marginLeft: "40px" }}
                  >
                    {errors.code}
                  </div>
                  <br />
                </React.Fragment>
              )}
            </Col>
            <Col md="6">
              <FormGroup>
                <label>Coupon duration</label>
                <Select
                  options={durationDropdown}
                  name="duration"
                  value={formik.values.duration}
                  onChange={(selectedValue) =>
                    formik.setFieldValue("duration", selectedValue)
                  }
                  placeholder="add duration"
                  onBlur={formik.handleBlur}
                />
              </FormGroup>
              {errors.duration && touched.duration && (
                <React.Fragment>
                  <div
                    className="text-danger float-left ml-4"
                    // style={{ marginLeft: "40px" }}
                  >
                    {errors.duration}
                  </div>
                  <br />
                </React.Fragment>
              )}
            </Col>
          </Row>
          {formik.values.duration.value === "repeating" && (
            <Row>
              <Col md="12">
                <FormGroup>
                  <label>Coupon duration in months</label>
                  <Input
                    name="duration_in_months"
                    value={formik.values.duration_in_months}
                    onChange={formik.handleChange}
                    placeholder="Coupon duration in months"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
          )}
          <Row>
            <Col md="12">
              <FormGroup>
                <label>Discount</label>
                <div className="custom-plan-input">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="plan_interval"
                      id="inlineRadio1"
                      value="amount"
                      checked={offType === "amount"}
                      onChange={() => setOffType("amount")}
                    />
                    <label className="form-check-label" for="inlineRadio1">
                      amount
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="plan_interval"
                      id="inlineRadio2"
                      value="percentage"
                      checked={offType === "percentage"}
                      onChange={() => setOffType("percentage")}
                    />
                    <label className="form-check-label" for="inlineRadio2">
                      percentage
                    </label>
                  </div>
                </div>
                <Input
                  name="amount_off"
                  value={formik.values.amount_off}
                  onChange={formik.handleChange}
                  placeholder={`Coupon off ${offType} `}
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {errors.amount_off && touched.amount_off && (
                  <React.Fragment>
                    <div
                      className="text-danger float-left ml-4"
                      // style={{ marginLeft: "40px" }}
                    >
                      {errors.amount_off}
                    </div>
                    <br />
                  </React.Fragment>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <FormGroup>
                <label>Expiry Date</label>
                <br />
                <DatePicker
                  placeholderText="Coupon ExpireDate"
                  name="expireDate"
                  selected={formik.values.expireDate}
                  // onChange={(date) => formik.setFieldValue("expireDate", date)}
                  minDate={new Date()}
                  maxDate={addMonths(new Date(), 12)}
                  showDisabledMonthNavigation
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
        {apiError && (
          <React.Fragment>
            <div
              className="text-danger float-left ml-4"
              // style={{ marginLeft: "40px" }}
            >
              {apiError}
            </div>
            <br />
          </React.Fragment>
        )}
      </ModalBody>
      <ModalFooter>
        {apiFetch ? (
          <Button color="primary">Loading..</Button>
        ) : (
          <Button color="primary" onClick={formik.handleSubmit}>
            {isCreateCoupon ? "Create" : "Save"}
          </Button>
        )}
      </ModalFooter>
    </React.Fragment>
  );
}
