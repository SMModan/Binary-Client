import { Table } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoupon, getCoupon } from "../redux/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import EditCouponModal from "../components/Coupon/EditCouponModal";

export default function Coupon() {
  const dispatch = useDispatch();
  const couponList = useSelector((state) => state.CouponReducer.couponList);
  const loading = useSelector((state) => state.CouponReducer.loading);
  const [modal, setModal] = useState(false);
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [coupon, setCoupon] = useState({});
  useEffect(() => {
    if (!modal) {
      setLoadingCoupon(false);
      setCoupon({});
    }
  }, [modal]);
  useEffect(() => {
    if (!loadingCoupon) {
      dispatch(getCoupon());
    }
  }, [loadingCoupon]);
  if (loading)
    return (
      <div className="content">
        <div className="cover-spin" role="status" />
      </div>
    );
  return (
    <div className="content s-auto">
      {couponList && couponList.length ? (
        <Table className="tablesorter" responsive>
          <thead className="text-primary">
            <tr>
              <th>Coupon</th>
              {/* <th className="text-center">Edit</th> */}
              <th className="text-center">Delete</th>
              <th className="text-center">
                <FontAwesomeIcon
                  className="cursor-pointer"
                  size="2x"
                  onClick={() => {
                    setModal(true);
                  }}
                  icon={faPlus}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {couponList &&
              couponList.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  {/* <td className="text-center">
                  {" "}
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    onClick={() => {
                      setCoupon(item);
                      setModal(true);
                    }}
                    size="1x"
                    icon={faPen}
                  />
                </td> */}
                  <td className="text-center">
                    {" "}
                    <FontAwesomeIcon
                      onClick={() => {
                        setLoadingCoupon(true);
                        dispatch(
                          deleteCoupon(
                            undefined,
                            item.id,
                            setLoadingCoupon,
                            true
                          )
                        );
                      }}
                      className="cursor-pointer"
                      size="1x"
                      icon={faTrash}
                    />
                  </td>
                  <td></td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <div>
          <h3 className="d-inline">Create Coupon</h3>
          {"  "}(
          <span className="text-warning d-inline">No Coupons Created yet</span>)
          <br />
          <br />
          <br />
          <FontAwesomeIcon
            className="cursor-pointer"
            size="3x"
            onClick={() => {
              setModal(true);
            }}
            icon={faPlus}
          />
        </div>
      )}
      <EditCouponModal
        className="coupon-modal"
        {...{ modal, setModal, coupon, loadingCoupon, setLoadingCoupon }}
      />
    </div>
  );
}
