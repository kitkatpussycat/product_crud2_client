import React, { useState } from 'react';
import axios from 'axios';

let baseURL = 'http://127.0.0.1:3000/products';

const AddProduct = ({
  setState,
  state,
  editId,
  products,
  setProducts,
  edit,
  productName,
  setProductName,
  productDescription,
  setProductDescription,
  price,
  setPrice,
  quantity,
  setQuantity,
}) => {
  // const [getProducts, setGetProducts] = useState([]);

  const add = (e) => {
    e.preventDefault();
    console.log(productName, productDescription, price, quantity);
    if (state == 'add') {
      axios
        .post(`${baseURL}`, {
          product: {
            name: productName,
            description: productDescription,
            price: price,
            quantity: quantity,
          },
        })
        .then((res) => {
          console.log(res);
          setProducts([...products, res.data]);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      axios
        .put(`${baseURL}/${editId}`, {
          product: {
            name: productName,
            description: productDescription,
            price: price,
            quantity: quantity,
          },
        })
        .then((res) => {
          console.log(res);
          setProducts(
            products.map((product) => {
              if (product.id === editId) {
                return res.data;
              }
              return product;
            })
          );
        })
        .catch((err) => {
          console.log(err.respomse);
        });
    }
    setState('add');
    setProductName('');
    setProductDescription('');
    setPrice(0);
    setQuantity(0);
  };

  return (
    <div>
      <form>
        <input
          type='text'
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder='product name'
        />
        <input
          type='text'
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder='description'
        />
        <input
          type='text'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type='text'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button type='submit' onClick={(e) => add(e)}>
          {state}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
