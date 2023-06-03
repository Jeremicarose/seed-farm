import React from "react";
import PropTypes from "prop-types";
import { utils } from "near-api-js";
import { Card, Button, Col, Badge, Stack } from "react-bootstrap";

const Product = ({ product, buy }) => {
  const { id, varieties, value, location, sold, expiration, quantity, price, farmer } =
    product;

  const triggerBuy = () => {
    buy(id, price);
  };

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            <span className="font-monospace text-secondary">{farmer}</span>
            <Badge bg="secondary" className="ms-auto">
              {sold} Sold
            </Badge>
          </Stack>
        </Card.Header>
        <div className=" ratio ratio-4x3">
          <img src= "https://images.unsplash.com/photo-1596119415004-be78a87f8d14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXZvY2Fkb3N8ZW58MHx8MHx8&w=1000&q=80" alt="avocado" style={{ objectFit: "cover" }} />
        </div>
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{varieties}</Card.Title>
          <Card.Text className="flex-grow-1 ">{value}</Card.Text>
          <Card.Text className="flex-grow-1 ">{quantity}</Card.Text>
          <Card.Text className="text-secondary">
            <span>{expiration}</span>
          </Card.Text>
          <Card.Text className="text-secondary">
            <span>{location}</span>
          </Card.Text>
          <Button
            variant="outline-dark"
            onClick={triggerBuy}
            className="w-100 py-3"
          >
            Buy for {utils.format.formatNearAmount(price)} NEAR
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

Product.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  buy: PropTypes.func.isRequired,
};

export default Product;