import { Table } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../redux/action/ProductsAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import EditProductModal from "../components/Product/EditProductModal";

export default function ProductList() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.ProductsReducer.productList);
  const loading = useSelector((state) => state.ProductsReducer.loading);
  const [modal, setModal] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [product, setProduct] = useState({});
  useEffect(() => {
    if (!modal) {
      setLoadingProduct(false);
      setProduct({});
    }
  }, [modal]);
  useEffect(() => {
    if (!loadingProduct) {
      dispatch(getProducts());
    }
  }, [loadingProduct]);
  if (loading)
    return (
      <div className="content">
        <div className="cover-spin" role="status" />
      </div>
    );
  return (
    <div className="content s-auto">
      {productList && productList.length ? (
        <Table className="tablesorter" responsive>
          <thead className="text-primary">
            <tr>
              <th>Product</th>
              <th className="text-center">Edit</th>
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
            {productList &&
              productList.map((item) => (
                <tr>
                  <td>{item.title}</td>
                  <td className="text-center">
                    {" "}
                    <FontAwesomeIcon
                      className="cursor-pointer"
                      onClick={() => {
                        setProduct(item);
                        setModal(true);
                      }}
                      size="1x"
                      icon={faPen}
                    />
                  </td>
                  <td className="text-center">
                    {" "}
                    <FontAwesomeIcon
                      onClick={() => {
                        setLoadingProduct(true);
                        dispatch(
                          deleteProduct(
                            undefined,
                            item.id,
                            setLoadingProduct,
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
          <h3 className="d-inline">Create Product</h3>
          {"  "}(
          <span className="text-warning d-inline">No Products Created yet</span>)
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
      <EditProductModal
        {...{ modal, setModal, product, loadingProduct, setLoadingProduct }}
      />
    </div>
  );
}
