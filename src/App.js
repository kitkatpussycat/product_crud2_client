import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProduct from './AddProducts/AddProduct';

let baseURL = 'http://127.0.0.1:3000/products';

function App() {
  const [products, setProducts] = useState([]);
  const [addProduct, setAddProduct] = useState('');
  const [state, setState] = useState('add');
  const [editId, setEditId] = useState(0);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    axios
      .get(`${baseURL}`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const edit = (id, name, description, price, quantity) => {
    //console.log(e.target.parentElement.parentElement);
    setState('edit');
    setEditId(id);
    console.log(editId);
    setProductName(name);
    console.log(productName);
    setProductDescription(description);
    setPrice(price);
    setQuantity(quantity);
  };

  return (
    <div>
      <div>
        <AddProduct
          state={state}
          setState={setState}
          products={products}
          setProducts={setProducts}
          editId={editId}
          edit={edit}
          productName={productName}
          setProductName={setProductName}
          productDescription={productDescription}
          setProductDescription={setProductDescription}
          price={price}
          setPrice={setPrice}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Product_name</th>
              <th>Product_description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button
                    onClick={() =>
                      edit(
                        product.id,
                        product.name,
                        product.description,
                        product.price,
                        product.quantity
                      )
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
