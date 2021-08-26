import { Table } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  flushCompany,
  getCompany,
  getPlan,
  getProducts,
  logout,
  checkout,
} from "../redux/action";
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
import { useHistory } from "react-router";

export default function Plan() {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const isLoggedin = useSelector((state) => state.userDataReducer.isLoggedin);
  const planList = useSelector((state) => state.PlanReducer.planList);
  const companyList = useSelector((state) => state.CompanyReducer.companyList);
  const loading = useSelector((state) => state.PlanReducer.loading);
  const [modal, setModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [loadingPlan, setLoadingPlan] = useState(false);
  useEffect(() => {
    dispatch(getCompany());
    return () => dispatch(flushCompany());
  }, []);
  useEffect(() => {
    if (companyList.length) {
      dispatch(getPlan(1 || companyList[0].id));
      setSelectedCompany({
        label: companyList[0].Company_name,
        value: companyList[0].id,
      });
    }
  }, [companyList]);
  const refetchPlan = (selectedOption) => {
    setSelectedCompany(selectedOption);
    dispatch(getPlan(selectedOption.value));
  };
  if (loading)
    return (
      <div className="container">
        <div className="cover-spin" role="status" />
      </div>
    );
  return (
    <div className="custom-plan container mt-72 s-auto">
      <div className="d-flex justify-content-end mb-4 align-items-center">
        <span className="font-weight-bold h4 text-light m-0">Company :</span>
        &nbsp; &nbsp;
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
      <div class="content mt-5 mb-3 pt-5">
        <div class="row">
          {planList && planList.length ? (
            <>
              {planList &&
                planList.map((item) => (
                  <div class="col-md-4 my-2">
                    <div class="card p-3 mb-2">
                      <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row align-items-center">
                          <div class="icon">
                            {" "}
                            <i class="bx bxl-mailchimp"></i>{" "}
                          </div>
                          <div class="ms-2 c-details">
                            <h6 class="mb-0">{item.amount}</h6>{" "}
                            <span>{item.currency}</span>
                          </div>
                        </div>
                        <div>
                          <div
                            class="badge cursor-pointer"
                            // onClick={() => {
                            //   setProduct(item);
                            //   setModal(true);
                            // }}
                          >
                            {" "}
                            {item.interval_count}
                          </div>
                          <div class="badge cursor-pointer">
                            {" "}
                            {item.plan_interval}
                          </div>
                        </div>
                      </div>
                      <div class="mt-5">
                        <h3 class="heading">{item.title}</h3>
                        <div class="mt-3">
                          <Button
                            onClick={() => {
                              isLoggedin
                                ? dispatch(
                                    checkout({ priceId: item.unique_id }, push)
                                  )
                                : dispatch(logout(push));
                            }}
                          >
                            Subscribe
                          </Button>
                          <div class="mt-3">
                            {/* <span class="text1">
                          32 Applied <span class="text2">of 50 capacity</span>
                        </span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <div>
              <h3 className="d-inline">No Plans Found</h3>
            </div>
          )}
        </div>
      </div>
      {/* <EditPlanModal
        className="plan-modal"
        {...{ modal, setModal, plan, loadingPlan, setLoadingPlan }}
      /> */}
    </div>
  );
}
