import React from "react";
import "../styles/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";
import axios from 'axios';

function Subtotal() {
  const history = useHistory();
  const [{ basket,user }, dispatch] = useStateValue();
  const placeOrder =async() =>{
    const obj = { order: basket, user_id: user._id, total:getBasketTotal(basket),created:Date.now().toString().substr(0, 10)};
    const data = await axios.post('http://localhost:5000/api/order', obj).then(res =>{
      history.push('/orders')
    }).catch(error => alert(error.message))
    history.push('/orders')
  }

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button onClick={e => placeOrder()}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
