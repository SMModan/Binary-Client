import { Table } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompany, flushCompany,getSubscription } from "../redux/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import moment  from "moment";

export default (function Subscription() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.CouponReducer.loading);
  const companyList = useSelector((state) => state.CompanyReducer.companyList);
  const subscriptionList = useSelector((state) => state.SubscripionsReducer.subscriptionList);

  const [selectedCompany, setSelectedCompany] = useState({});

  useEffect(() => {
    dispatch(getCompany());
    return () => dispatch(flushCompany());
  }, []);
    
  useEffect(() => {
    if (companyList.length) {
      dispatch(getSubscription(companyList[0].id));
      setSelectedCompany({
        label: companyList[0].Company_name,
        value: companyList[0].id,
      });
    }
  }, [companyList]);

    
  useEffect(() => {
    if (companyList.length) {
      dispatch(getSubscription(companyList[0].id));
      setSelectedCompany({
        label: companyList[0].Company_name,
        value: companyList[0].id,
      });
    }

  }, [subscriptionList]);

  const refetchPlan = (selectedOption) => {
    setSelectedCompany(selectedOption);
    dispatch(getSubscription(selectedOption.value));
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
{subscriptionList && subscriptionList.length  ? (
        <Table className="tablesorter" responsive>
          <thead className="text-primary">
            <tr>
              <th>Company Name</th>
              <th className="text-center">Customer Name</th>
              <th className="text-center">Plan Name</th>
              <th className="text-center">Status</th>
              <th className="text-center">Start</th>
              <th className="text-center">End</th>
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
            {subscriptionList &&
              subscriptionList.map((item) => (
                <tr>
                  <td>{item.company.name}</td>
                  <td className="text-center">{item.customer.name}</td>
                  <td className="text-center">{item.plan.name}</td>
                  <td className="text-center">{item.status}</td>
                  <td className="text-center">{moment.unix(item.subscription_start).format('DD/MM/YYYY')}</td>
                  <td className="text-center">{moment.unix(item.subscription_end).format("DD/MM/YYYY")}</td>
                 
                  <td className="text-center">
                    <CopyToClipboard
                      text={item.id}
                      onCopy={() => {
                        toast.success("copied to clipboard");
                      }}
                    >
                      <Button
                      >
                        Copy To ClipBoard
                      </Button>
                    </CopyToClipboard>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <div>
          <h3 className="d-inline">No Subscription Found</h3>
        </div>
      )}
    </div>
  );
});
