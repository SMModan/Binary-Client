import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
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
} from "reactstrap";
import { getIndustries } from "../../service/APIcalls";
import { COMPLETE_PROFILE } from "../../service/apiEndpoints";
import { updateUserProfileForm } from "../../redux/action";
import { useFormik } from "formik";
import { apiCall, METHOD } from "../../service";
import { toast } from "react-toastify";
import SelectContainer from "../SelectContainer";
import { getData } from "country-list";
import CurrencyList from "currency-list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFileUpload,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function CompleteProfile() {
  // routing_number 110000000
  const countryList = getData().map(({ code: value, name: label }) => ({
    label,
    value,
  }));
  const currencyList = Object.entries(CurrencyList.getAll("en_US")).map(
    ([label, value]) => ({
      label,
      value,
    })
  );
  const fileRef = React.useRef(null);
  const [industryOptions, setIndustryOptions] = useState([]);
  const [fileData, setFileData] = useState({ name: "" });
  const user = useSelector((state) => state.userDataReducer.user);
  const formik = useFormik({
    initialValues: {
      Company_name: user.Company_name,
      Industry_ID: user.Industry_ID,
      email: user.Email,
      country: "",
      currency: "",
      account_number: "",
      account_holder_name: "",
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      const payload = {
        email: values.email,
        country: values.country,
        currency: values.currency,
        account_number: '000123456789',//values.account_number,
        account_holder_name: values.account_holder_name,
        routing_number: "110000000",
        files:'file_1JLi7yCdW5yUWZjjlpNLCijS'
      };
      console.log(payload);
      handleFileUpload(payload);
    },
    enableReinitialize: true,
  });
  const handleFileUpload = (values) => {
    if (!fileData.name) {
      handleSubmitApiCall(values);
    } else {
      let formData = new FormData();
      const filePayload = {
        purpose: "additional_verification",
        file: fileData,
      };
      Object.entries(filePayload).forEach(([key, value]) =>
        formData.append(key, value)
      );
      axios
        .post("https://files.stripe.com/v1/files", formData, {
          headers: {
            Authorization:
              "Basic c2tfdGVzdF9nYlFxRk1kWVpwdE1acHhrc2RtNFVFanMwMGJrRFhEakxsOg==",
          },
        })
        .then((res) => {
          console.log(res.data.id);
          handleSubmitApiCall({ ...values, files: res.data.id });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleSubmitApiCall = (values) => {
    apiCall(
      COMPLETE_PROFILE,
      values,
      (res) => toast.success(res.data.message),
      (err) => console.log(err),
      METHOD.POST,
      {
        addAuthrize: true,
      }
    );
  };
  const saveFile = (e) => setFileData(e.target.files[0]);
  useEffect(() => {
    getIndustries(setIndustryOptions);
  }, []);
  return (
    <Card>
      <CardHeader>
        <h5 className="title">Edit Profile</h5>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label htmlFor="exampleInputEmail1">
                  Email address (disabled)
                </label>
                <Input disabled placeholder={user.Email} type="email" />
              </FormGroup>
            </Col>
            <Col className="pr-md-1" md="4">
              <FormGroup>
                <label>Company</label>
                <Input
                  name="Company_name"
                  value={formik.values.Company_name}
                  onChange={formik.handleChange}
                  placeholder="Company"
                  type="text"
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <label>Industry</label>
                <div>
                  <SelectContainer
                    placeholder="Industry"
                    value={industryOptions.find(
                      (item) => item.value === formik.values.Industry_ID
                    )}
                    onBlur={formik.handleBlur}
                    onChange={(selectedOption) => {
                      formik.setFieldValue("Industry_ID", selectedOption.value);
                    }}
                    options={industryOptions}
                    name="Industry_ID"
                    isDisabled
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <label>Country</label>
                <div>
                  <SelectContainer
                    placeholder="country"
                    value={countryList.find(
                      (item) => item.value === formik.values.country
                    )}
                    onBlur={formik.handleBlur}
                    onChange={(selectedOption) => {
                      formik.setFieldValue("country", selectedOption.value);
                    }}
                    options={countryList}
                    name="country"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <label>Currency</label>
                <div>
                  <SelectContainer
                    placeholder="Currency"
                    value={currencyList.find(
                      (item) => item.value.code === formik.values.currency
                    )}
                    onBlur={formik.handleBlur}
                    onChange={(selectedOption) => {
                      formik.setFieldValue(
                        "currency",
                        selectedOption.value.code
                      );
                    }}
                    options={currencyList}
                    name="currency"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col className="pr-md-1" md="4">
              <FormGroup>
                <label>Account number</label>
                <Input
                  name="account_number"
                  value={formik.values.account_number}
                  onChange={formik.handleChange}
                  placeholder="Account number"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pr-md-1" md="4">
              <FormGroup>
                <label>Account holder name</label>
                <Input
                  name="account_holder_name"
                  value={formik.values.account_holder_name}
                  onChange={formik.handleChange}
                  placeholder="Account holder name"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pr-md-1" md="4">
              <FormGroup>
                <label>Upload company logo</label>
                <input
                  ref={fileRef}
                  hidden
                  placeholder="Account holder name"
                  type="file"
                  accept="application/pdf, image/jpeg, image/png"
                  onChange={saveFile}
                />
                <br />
                <FontAwesomeIcon
                  className="cursor-pointer"
                  size="3x"
                  icon={faFileUpload}
                  onClick={() => fileRef.current.click()}
                />
                <br />
                {fileData.name}
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
      <CardFooter>
        <Button
          className="btn-fill"
          color="primary"
          type="button"
          onClick={formik.handleSubmit}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
