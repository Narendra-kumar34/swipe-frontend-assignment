import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch } from "react-redux";
import generateRandomId from "../utils/generateRandomId";
import { addProduct, editProduct } from "../redux/productSlice";
import { updateInvoice } from "../redux/invoicesSlice";
import { selectInvoiceList } from "../redux/invoicesSlice";
import { useSelector } from "react-redux";

export default function AddProductModal(props) {
  const [name, setName] = useState(props.isEdit ? props.product.name : "");
  const [description, setDescription] = useState(props.isEdit ? props.product.description : "");
  const [price, setPrice] = useState(props.isEdit ? props.product.price : 1);
  const [category, setCategory] = useState(props.isEdit ? props.product.category : "");
  const dispatch = useDispatch();
  const invoiceList = useSelector(selectInvoiceList);

  useEffect(() => {
    if (props.isEdit) {
      setName(props.product.name);
      setDescription(props.product.description);
      setPrice(props.product.price);
      setCategory(props.product.category);
    }
  }, [props.isEdit, props.product]);

  const handleUpdateExistingInvoices = (updatedProduct) => {
    const allInvoices = JSON.parse(JSON.stringify(invoiceList));
    allInvoices.forEach((invoice) => {
      let shouldUpdate = false;
      invoice.items.forEach((item) => {
        if(item.itemName == updatedProduct.name) {
          shouldUpdate = true;
          item.itemName = updatedProduct.name;
          item.itemPrice = updatedProduct.price;
          item.itemDescription = updatedProduct.description;
        }
      });
      if(shouldUpdate) {
        dispatch(updateInvoice({ id: invoice.id, updatedInvoice: updateInvoiceTotal(invoice) }));
      }
    })
  }

  const updateInvoiceTotal = (invoice) => {
    let subTotal = 0;
    invoice.items.forEach((item) => {
      subTotal +=
        parseFloat(item.itemPrice).toFixed(2) * parseInt(item.itemQuantity);
    });
    const taxAmount = parseFloat(
      subTotal * (invoice.taxRate / 100)
    ).toFixed(2);
    const discountAmount = parseFloat(
      subTotal * (invoice.discountRate / 100)
    ).toFixed(2);
    const total = (
      subTotal -
      parseFloat(discountAmount) +
      parseFloat(taxAmount)
    ).toFixed(2);
    return {
      ...invoice,
      subTotal: parseFloat(subTotal).toFixed(2),
      taxAmount,
      discountAmount,
      total,
    };
  }

  const handleAddEdit = () => {
    const productData = {
      name: name,
      price: price,
      description: description,
      category: category,
    };
    if (props.isEdit) {
      dispatch(editProduct({ id: props.product.id, updatedProduct: { id: props.product.id, ...productData } }));
      handleUpdateExistingInvoices({id: props.product.id, ...productData });
      alert("Product updated successfully 🥳");
    } else {
      dispatch(addProduct({ product: { id: generateRandomId(), ...productData } }));
      alert("Product added successfully 🥳");
    }
    props.closeModal();
    setName("");
    setDescription("");
    setPrice(1);
    setCategory("");
  };

  return (
    <div>
      <Modal show={props.showModal} onHide={props.closeModal} size="md" centered>
        <div className="d-flex flex-column justify-content-between align-items-start bg-light w-100 p-4">
          <h3 className="fw-bold pb-2 pb-md-4">{props.isEdit ? "Edit" : "Add"} Product</h3>
          <InputGroup className="my-1 flex-nowrap">
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup className="my-1 flex-nowrap">
            <Form.Control
              type="text"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </InputGroup>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <InputGroup className="my-1 flex-nowrap">
              <InputGroup.Text className="bg-light border-0 text-secondary">Price</InputGroup.Text>
              <Form.Control
                type="number"
                min={1}
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </InputGroup>
            <DropdownButton
              id="dropdown-basic-button"
              title={category || "Select Category"}
              onSelect={(eventKey) => setCategory(eventKey)}
            >
              <Dropdown.Item eventKey="MATERIAL">MATERIAL</Dropdown.Item>
              <Dropdown.Item eventKey="LABOUR">LABOUR</Dropdown.Item>
              <Dropdown.Item eventKey="REPAIR">REPAIR</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="d-flex w-100 justify-content-end pt-4">
            <Button onClick={handleAddEdit}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}