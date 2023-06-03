import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
const AddProduct = ({ save }) => {
    const [varieties  , setVarieties] = useState("");
    const [value, setValue] = useState("");
    const [location, setLocation] = useState("");
    const [expiration, setExperation] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const isFormFilled = () => varieties && value  && location && expiration && quantity && price ;
  
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    return (
        <>
           <h2>Showcase your product</h2> 
          <Button
            onClick={handleShow}
            variant="dark"
            className="rounded-pill px-0"
            style={{ width: "38px" }}
          >
            <i class="bi bi-plus"></i>
          </Button>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Create a product</Modal.Title>
            </Modal.Header>
            <Form>
              <Modal.Body>
                <FloatingLabel
                  controlId="inputType"
                  label="Type of avocado"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setVarieties(e.target.value);
                    }}
                    placeholder="Enter the type of Avocado"
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="inputValue"
                  label="Value"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter the value addition "
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="inputLocation"
                  label="Location"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter Location of production"
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="inputexpiration"
                  label="expiration"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter expiration date"
                    onChange={(e) => {
                      setExperation(e.target.value);
                    }}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="inputQuantity"
                  label="Quantity"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="Enter the Quantity"
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="inputPrice"
                  label="Price"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="Enter the Price "
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </FloatingLabel>
              </Modal.Body>
            </Form>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="dark"
                disabled={!isFormFilled()}
                onClick={() => {
                  save({
                    varieties,
                    value,
                    location,
                    expiration,
                    quantity,
                    price,
                  });
                  handleClose();
                }}
              >
                Save product
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    };
    
    AddProduct.propTypes = {
      save: PropTypes.func.isRequired,
    };
    
    
    export default AddProduct;
