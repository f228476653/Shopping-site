import React, { useState, useEffect } from 'react';
import '../styles/Orders.css'
import { useStateValue } from "./StateProvider";
import Order from './Order'
import axios from 'axios';

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log(user)
    if(user) {
        const fetchOrder =async () =>{
            const response = await axios.get(`http://localhost:5000/api/order/${user._id}`);
            setOrders([...response.data])
        }
        fetchOrder()
    } else {
        setOrders([])
    }

  }, [user])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders
