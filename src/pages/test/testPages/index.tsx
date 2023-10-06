import React, { useState, useEffect } from "react";

import Axios from "axios";
function App() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const { data } = await Axios.get(
      "https://localhost:5001/api/User/GetAll"
    );
    const products = data;
    setProducts(products);
    console.log(products);

    for( let i =0; i<= products.payload.length; i++)
  {
    console.log( "AllUsers " + products.payload[i]);
  }

  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
     ola
    </div>
  );
}
export default App;
