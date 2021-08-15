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

export default function UserProfileEdit({ isCompleteProfile }) {
  const [industryOptions, setIndustryOptions] = useState([]);
  const user = useSelector((state) => state.userDataReducer.user);
  const formik = useFormik({
    initialValues: {
      Company_name: user.Company_name,
      Industry_ID: user.Industry_ID,
      email: user.Email,
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      handleSubmitApiCall(values);
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
  //   const handleStoreChange = (name, value) =>
  //     dispatch(updateUserProfileForm({ [name]: value }));
  //   const handleChange = (e) => handleStoreChange(e.target.name, e.target.value);
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
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <label>Industry</label>
                <div>
                  <Select
                    placeholder="Industry"
                    styles={{
                      container: (base) => ({
                        ...base,
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: "16px",
                        margin: "5px",
                        width: "85%",
                        transition: "all 0.5s ease-in-out",
                        borderRadius: "5px 5px 5px 5px",
                      }),
                      control: (base) => ({
                        ...base,
                        borderRadius: 5,
                        border: "none",
                        backgroundColor: "hsl(0deg 0% 96%)",
                      }),
                      placeholder: (base) => ({
                        ...base,
                        padding: "15px 25px",
                      }),
                      singleValue: (base) => ({
                        ...base,
                        padding: "15px 25px",
                      }),
                    }}
                    value={industryOptions.find(
                      (item) => item.value === formik.values.Industry_ID
                    )}
                    onBlur={formik.handleBlur}
                    onChange={(selectedOption) => {
                      formik.setFieldValue("Industry_ID", selectedOption.value);
                    }}
                    options={industryOptions}
                    name="Industry_ID"
                  />
                </div>
              </FormGroup>
            </Col>

            {/* <Col className="px-md-1" md="3">
              <FormGroup>
                <label>Username</label>
                <Input
                  defaultValue="michael23"
                  placeholder="Username"
                  type="text"
                />
              </FormGroup>
            </Col> */}
          </Row>

          {/* <Row>
            <Col className="pr-md-1" md="6">
              <FormGroup>
                <label>First Name</label>
                <Input defaultValue="Mike" placeholder="Company" type="text" />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="6">
              <FormGroup>
                <label>Last Name</label>
                <Input
                  defaultValue="Andrew"
                  placeholder="Last Name"
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row> */}

          {/* address */}

          {/* <Row>
            <Col md="12">
              <FormGroup>
                <label>Address</label>
                <Input
                  defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                  placeholder="Home Address"
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
       
          <Row>
            <Col className="pr-md-1" md="4">
              <FormGroup>
                <label>City</label>
                <Input defaultValue="Mike" placeholder="City" type="text" />
              </FormGroup>
            </Col>
            <Col className="px-md-1" md="4">
              <FormGroup>
                <label>Country</label>
                <Input
                  defaultValue="Andrew"
                  placeholder="Country"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Postal Code</label>
                <Input placeholder="ZIP Code" type="number" />
              </FormGroup>
            </Col>
          </Row> */}

          {/* <Row>
            <Col md="8">
              <FormGroup>
                <label>About Me</label>
                <Input
                  cols="80"
                  defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                            that two seat Lambo."
                  placeholder="Here can be your description"
                  rows="4"
                  type="textarea"
                />
              </FormGroup>
            </Col>
          </Row> */}
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
