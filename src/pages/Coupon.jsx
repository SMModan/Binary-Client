import { Table } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompany, getCoupon, getProducts } from "../redux/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faPlus,
  faFileInvoiceDollar,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import EditPlanModal from "../components/Plan/EditPlanModal";
import { Button } from "reactstrap";
import Select from "react-select";

export default function Plan() {
  const dispatch = useDispatch();
  const couponList = useSelector((state) => state.CouponReducer.couponList);
  const loading = useSelector((state) => state.CouponReducer.loading);
  const companyList = useSelector((state) => state.CompanyReducer.companyList);
  const [modal, setModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [loadingPlan, setLoadingPlan] = useState(false);
  useEffect(() => {
    dispatch(getCompany());
  }, []);
  useEffect(() => {
    if (companyList.length) {
      dispatch(getCoupon(5||companyList[0].id));
      setSelectedCompany({
        label: companyList[0].Company_name,
        value: companyList[0].id,
      });
    }
  }, [companyList]);
  const refetchPlan = (selectedOption) => {
    setSelectedCompany(selectedOption);
    dispatch(getCoupon(selectedOption.value));
  };
  if (loading)
    return (
      <div className="container">
        <div className="cover-spin" role="status" />
      </div>
    );
  return (
    <div className="custom-plan container mt-72 s-auto">
      <div className="d-flex justify-content-end mb-4">
        Company &nbsp; : &nbsp;
        <Select
          className="w-25"
          value={selectedCompany}
          options={companyList.map(({ id: value, Company_name: label }) => ({
            label,
            value,
          }))}
          onChange={refetchPlan}
          placeholder="Select company"
        />
      </div>
      {couponList && couponList.length ? (
        <Table className="tablesorter" responsive>
          <thead className="text-primary">
            <tr>
              <th>Company Name</th>
              <th className="text-center">code</th>
              <th className="text-center">amount off</th>
              <th className="text-center">duration</th>
              <th className="text-center">duration in months</th>
              <th className="text-center">percent off</th>
              {/* <th className="text-center">Delete</th> */}
              <th className="text-center">
                <FontAwesomeIcon
                  className="cursor-pointer"
                  size="2x"
                  icon={faShare}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {couponList &&
              couponList.map((item) => (
                <tr>
                  <td>{item.CompanyName}</td>
                  <td className="text-center">{item.code}</td>
                  <td className="text-center">{item.amount_off}</td>
                  <td className="text-center">{item.duration}</td>
                  <td className="text-center">{item.duration_in_months}</td>
                  <td className="text-center">{item.percent_off}</td>
                  {/* <td className="text-center">
                  {" "}
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    onClick={() => {
                      setPlan(item);
                      setModal(true);
                    }}
                    size="1x"
                    icon={faPen}
                  />
                </td> */}
                  {/* <td className="text-center">
                    {" "}
                    <FontAwesomeIcon
                      onClick={() => {
                        setLoadingPlan(true);
                        dispatch(
                          deletePlan(undefined, item.id, setLoadingPlan, true)
                        );
                      }}
                      className="cursor-pointer"
                      size="1x"
                      icon={faTrash}
                    />
                  </td> */}
                  <td className="text-center">
                    <Button>Subscribe</Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <div>
          <h3 className="d-inline">No Coupons Found</h3>
        </div>
      )}
      {/* <EditPlanModal
        className="plan-modal"
        {...{ modal, setModal, plan, loadingPlan, setLoadingPlan }}
      /> */}
    </div>
  );
}
