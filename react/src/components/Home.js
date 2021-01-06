import React, {useState, useEffect} from "react";
import "../styles/Home.css";
import Product from "./Product";
import axios from 'axios';

function Home() {
  const [products, setProducts ] = useState();
  useEffect(() => {
    const fetchProduct =async () =>{
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts([...response.data])
    }
    fetchProduct()
  }, []); // 

  
  if (products) {
    return (
      <div className="home">
        <div className="home__container">
          <img
            className="home__image"
            src="./assets/banner.jpeg"
            alt=""
          />
        <div className="home__row">
            <Product
              key={products[0].id}
              id={products[0].id}
              name={products[0].name}
              price={products[0].price}
              rating={products[0].rating}
              image={products[0].image}
            />
            <Product
              key={products[1].id}
              id={products[1].id}
              name={products[1].name}
              price={products[1].price}
              rating={products[1].rating}
              image={products[1].image}
            />
            <Product
              key={products[2].id}
              id={products[2].id}
              name={products[2].name}
              price={products[2].price}
              rating={products[2].rating}
              image={products[2].image}
            />
          </div>

          <div className="home__row">
          <Product
              key={products[3].id}
              id={products[3].id}
              name={products[3].name}
              price={products[3].price}
              rating={products[3].rating}
              image={products[3].image}
            />
            <Product
              key={products[4].id}
              id={products[4].id}
              name={products[4].name}
              price={products[4].price}
              rating={products[4].rating}
              image={products[4].image}
            />
            <Product
              key={products[5].id}
              id={products[5].id}
              name={products[5].name}
              price={products[5].price}
              rating={products[5].rating}
              image={products[5].image}
            />
          </div>

          <div className="home__row">
            <Product
              key={products[6].id}
              id={products[6].id}
              name={products[6].name}
              price={products[6].price}
              rating={products[6].rating}
              image={products[6].image}
            />
            <Product
              key={products[7].id}
              id={products[7].id}
              name={products[7].name}
              price={products[7].price}
              rating={products[7].rating}
              image={products[7].image}
            />
          </div>
        </div>
      </div>
    );
  }
  return <div>{products}</div>;
}

export default Home;
