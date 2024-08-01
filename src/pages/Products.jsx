import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { BiTrash, BiSolidPencil } from "react-icons/bi";
import AddProductModal from "../components/AddProductModal";
import { useSelector } from "react-redux";
import { selectProductList } from "../redux/productSlice";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/productSlice";

export default function Products() {
  const productList = useSelector(selectProductList);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [editProduct, setEditProduct] = useState({});

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAddProduct = () => {
    setEdit(false);
    openModal();
  }

  return (
    <div>
      <div className="d-flex align-items-center">
        <BiArrowBack size={18} />
        <div className="fw-bold mt-1 mx-2 cursor-pointer">
          <Link to="/create">
            <h5>Go Back</h5>
          </Link>
        </div>
      </div>
      <Row>
        <Col className="mx-auto" xs={12} md={8} lg={9}>
          <Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">
            <div className="d-flex flex-column">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <h3 className="fw-bold pb-2 pb-md-4">Product List</h3>
                <Button variant="primary mb-2 mb-md-4" onClick={handleAddProduct}>
                  Add Product
                </Button>
              </div>
            </div>
            <AddProductModal showModal={isOpen} closeModal={closeModal} isEdit={isEdit} product={editProduct} />
            <Table responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => (
                  <ProductRow product={product} setEdit={setEdit} setEditProduct={setEditProduct} openModal={openModal} />
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

const ProductRow = ({ setEdit, product, setEditProduct, openModal }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    setEdit(true);
    setEditProduct(product);
    openModal();
  }
  const handleDelete = () => {
    dispatch(deleteProduct({id: product.id}));
    alert("Product deleted successfully 🥳")
  }
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.description}</td>
      <td>{product.category}</td>
      <td style={{ width: "5%" }}>
        <Button variant="outline-primary" onClick={handleEdit}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiSolidPencil />
          </div>
        </Button>
      </td>
      <td style={{ width: "5%" }}>
        <Button variant="danger" onClick={handleDelete}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiTrash />
          </div>
        </Button>
      </td>
    </tr>
  );
};
