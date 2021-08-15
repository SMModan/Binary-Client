import { Table } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompany, getPlan, getProducts } from "../redux/action";
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
  const planList = useSelector((state) => state.PlanReducer.planList);
  const companyList = useSelector((state) => state.CompanyReducer.companyList);
  const loading = useSelector((state) => state.PlanReducer.loading);
  const [modal, setModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [loadingPlan, setLoadingPlan] = useState(false);
  useEffect(() => {
    dispatch(getCompany());
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
      {planList && planList.length ? (
        <Table className="tablesorter" responsive>
          <thead className="text-primary">
            <tr>
              <th>Plan</th>
              <th className="text-center">description</th>
              <th className="text-center">currency</th>
              <th className="text-center">amount</th>
              <th className="text-center">interval</th>
              <th className="text-center">interval count</th>
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
            {planList &&
              planList.map((item) => (
                <tr>
                  <td>{item.title}</td>
                  <td className="text-center">{item.description}</td>
                  <td className="text-center">{item.currency}</td>
                  <td className="text-center">{item.amount}</td>
                  <td className="text-center">{item.plan_interval}</td>
                  <td className="text-center">{item.interval_count}</td>
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
          <h3 className="d-inline">No Plans Found</h3>
        </div>
      )}
      {/* <EditPlanModal
        className="plan-modal"
        {...{ modal, setModal, plan, loadingPlan, setLoadingPlan }}
      /> */}
    </div>
  );
}
