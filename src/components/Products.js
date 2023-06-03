import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddProduct from "./Addova";
import Product from "./Product";
import Loader from "../util/Loder";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../util/Notification";
import {
  getovas,
  buy_ova ,
  addova, 

} from "../utils/marketplace";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      setProducts(await getovas());
      console.log(getovas());
    } catch (error) {
      console.log(error);
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const addProduct = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      addova(data).then((resp) => {
        //console.log(data);
        toast(<NotificationSuccess text="Product added successfully." />);
        getProducts();
      });
     
     
    } catch (error) {
      //console.log(error);
      toast(<NotificationError text="Failed to create a product." />);
    } finally {
      setLoading(false);
    }
  };

  const buy = async (id, price) => {
    try {
      //console.log(id);
      await buy_ova({
        id,
        price,
      }).then((resp) => getProducts());
      toast(<NotificationSuccess text="Product bought successfully" />);
    } catch (error) {
      console.log(error)
      toast(<NotificationError text="Failed to purchase product." />);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getProducts();
    console.log(getProducts())   
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4"
         
          >
            
          <img
            src="https://coloringhome.com/coloring/niE/yxj/niEyxjbKT.png"
            alt=""  style={{ maxWidth: "320px" }}
          />
            <AddProduct save={addProduct} />
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {products.map((_product) => (
              <Product
                product={{
                  ..._product,
                }}
                buy={buy}
              />
            ))}
          </Row>
        </> 
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Products;