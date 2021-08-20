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
import { EDIT_PROFILE } from "../../service/apiEndpoints";
import { updateUserProfileForm } from "../../redux/action";
import { useFormik } from "formik";
import { apiCall, METHOD } from "../../service";
import { toast } from "react-toastify";
import { getData } from "country-list";
import SelectContainer from "../SelectContainer";

export default function UserProfileEdit({ isCompleteProfile }) {
  const [industryOptions, setIndustryOptions] = useState([]);
  const user = useSelector((state) => state.userDataReducer.user);
  const countryList = getData().map(({ code: value, name: label }) => ({
    label,
    value,
  }));
  const formik = useFormik({
    initialValues: {
      email: user.Email,
      first_name: user.first_name,
      last_name: user.last_name,
      Job_role: user.Job_role,
      Country_code: user.Country_code,
      Phone_no: user.Phone_no,
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      handleSubmitApiCall({ ...values, Phone_no: values.Phone_no.toString() });
      //   dispatch(register(values));
    },
    enableReinitialize: true,
  });
  const handleSubmitApiCall = (values) => {
    apiCall(
      EDIT_PROFILE,
      values,
      (res) => toast.success(res.data.message),
      (err) => console.log(err),
      METHOD.POST,
      {
        addAuthrize: true,
      }
    );
  };
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
                <label>First Name</label>
                <Input
                  name="first_name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  placeholder="First Name"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <label>Last Name</label>
                <Input
                  name="last_name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  placeholder="Last Name"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <label>Job Role</label>
                <Input
                  name="Job_role"
                  value={formik.values.Job_role}
                  onChange={formik.handleChange}
                  placeholder="Job Role"
                  type="text"
                />
              </FormGroup>
            </Col>

            <Col md="4">
              <FormGroup>
                <label>Country</label>
                <div>
                  <SelectContainer
                    placeholder="country"
                    value={countryList.find(
                      (item) => item.value === formik.values.Country_code
                    )}
                    onBlur={formik.handleBlur}
                    onChange={(selectedOption) => {
                      formik.setFieldValue(
                        "Country_code",
                        selectedOption.value
                      );
                    }}
                    options={countryList}
                    name="country"
                  />
                </div>
              </FormGroup>
            </Col>

            <Col md="4">
              <FormGroup>
                <label>Phone</label>
                <div>
                  <Input
                    name="Phone_no"
                    value={formik.values.Phone_no}
                    onChange={formik.handleChange}
                    placeholder="Phone number"
                    type="number"
                  />
                </div>
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
